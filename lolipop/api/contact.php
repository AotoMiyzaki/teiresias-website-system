<?php
declare(strict_types=1);

namespace Teiresias\Contact;

// PHP 8.x + mbstring. No Composer, Node, SMTP password or external mail API.
const MAX_BYTES = 24576;
const FAILURE = '送信できませんでした。時間をおいて再度お試しください。';
const ADDRESS = 'info@teiresias.jp';

function response(int $status, array $body, array $headers = []): array
{
    return [$status, $body, $headers];
}

function validate(object $input): array
{
    $limits = ['company' => 120, 'name' => 80, 'email' => 254, 'phone' => 40,
        'category' => 40, 'message' => 5000, 'website' => 200];
    $data = [];
    $errors = [];
    foreach ($limits as $key => $limit) {
        $raw = $input->$key ?? '';
        $data[$key] = '';
        if (!is_string($raw) || (property_exists($input, $key) && $input->$key === null)) {
            $errors[$key] = '文字列で入力してください。';
            continue;
        }
        // Match JavaScript trim, but inspect the untrimmed value for injection.
        $data[$key] = preg_replace('/^[\s\x{FEFF}]+|[\s\x{FEFF}]+$/u', '', $raw);
        $controls = $key === 'message'
            ? '/[\x{0000}-\x{0008}\x{000B}\x{000C}\x{000E}-\x{001F}\x{007F}-\x{009F}]/u'
            : '/[\x{0000}-\x{001F}\x{007F}-\x{009F}\x{2028}\x{2029}]/u';
        // UTF-16 units keep server limits aligned with HTML maxlength / JS length.
        if (strlen(mb_convert_encoding($raw, 'UTF-16LE', 'UTF-8')) / 2 > $limit) {
            $errors[$key] = $limit . '文字以内で入力してください。';
        } elseif (preg_match($controls, $raw)) {
            $errors[$key] = '使用できない文字が含まれています。';
        }
    }
    foreach (['company', 'name', 'email', 'message'] as $key) {
        if ($data[$key] === '' && !isset($errors[$key])) $errors[$key] = '入力してください。';
    }
    if ($data['email'] !== '' && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = '有効なメールアドレスを入力してください。';
    }
    if ($data['phone'] !== '' && !preg_match('/^[0-9+()\-\s]+$/u', $data['phone'])) {
        $errors['phone'] = '電話番号を半角数字・記号で入力してください。';
    }
    if ($data['category'] !== '' && !in_array($data['category'],
        ['業務のシステム化', '既存システムの改善', '新規システム開発', 'その他'], true)) {
        $errors['category'] = '選択肢から選んでください。';
    }
    if (($input->consent ?? false) !== true) $errors['consent'] = '個人情報の取扱いへの同意が必要です。';
    return [$data, $errors];
}

// One bounded, locked state file outside the document root. No raw IP or form data.
// Protection is per hosting instance; it is not a distributed anti-abuse service.
function rateLimit(string $ip): bool
{
    $path = sys_get_temp_dir() . '/teiresias-contact-' . hash('sha256', __DIR__) . '.json';
    $file = @fopen($path, 'c+');
    if (!$file) throw new \RuntimeException('Rate storage unavailable');
    try {
        if (!@chmod($path, 0600) || !flock($file, LOCK_EX)) throw new \RuntimeException('Rate storage unavailable');
        $raw = stream_get_contents($file, 262145);
        if ($raw === false || strlen($raw) > 262144) throw new \RuntimeException('Rate storage invalid');
        $state = $raw === '' ? [] : json_decode($raw, true, 8, JSON_THROW_ON_ERROR);
        if (!is_array($state)) throw new \RuntimeException('Rate storage invalid');
        $now = time();
        foreach ($state as $key => $entry) {
            if (!is_array($entry) || ($entry['until'] ?? 0) <= $now) unset($state[$key]);
        }
        $key = hash('sha256', __DIR__ . '|' . $ip);
        $entry = $state[$key] ?? ['count' => 0, 'until' => $now + 600];
        if ($entry['count'] >= 5 || (!isset($state[$key]) && count($state) >= 1000)) return false;
        $entry['count']++;
        $state[$key] = $entry;
        $json = json_encode($state, JSON_THROW_ON_ERROR);
        if (!rewind($file) || !ftruncate($file, 0) || fwrite($file, $json) !== strlen($json) || !fflush($file)) {
            throw new \RuntimeException('Rate storage unavailable');
        }
        return true;
    } finally {
        flock($file, LOCK_UN);
        fclose($file);
    }
}

function send(array $data): bool
{
    $subject = '【TEIRESIAS Web問い合わせ】' . $data['company'] . ' / ' . $data['name'];
    $body = implode("\n", [
        '受付日時: ' . (new \DateTimeImmutable('now', new \DateTimeZone('Asia/Tokyo')))->format('Y-m-d H:i:s P') . ' (JST)',
        '会社名: ' . $data['company'], '氏名: ' . $data['name'],
        'メールアドレス: ' . $data['email'], '電話番号: ' . ($data['phone'] ?: '未入力'),
        '相談カテゴリ: ' . ($data['category'] ?: '未選択'),
        '個人情報の取扱いへの同意: 同意済み', '', '相談内容:', $data['message'],
    ]);
    // Explicit UTF-8 MIME preserves Japanese and supplementary characters.
    mb_internal_encoding('UTF-8');
    $encodedSubject = mb_encode_mimeheader($subject, 'UTF-8', 'B', "\r\n", 9);
    $headers = [
        'From: TEIRESIAS Web <' . ADDRESS . '>',
        'Reply-To: ' . $data['email'],
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
    ];
    // All sendmail command parameters are fixed, never derived from user input.
    // true means accepted by the local mail system, not confirmed inbox delivery.
    return @mail(ADDRESS, $encodedSubject, chunk_split(base64_encode($body), 76, "\r\n"),
        implode("\r\n", $headers), '-f' . ADDRESS);
}

function handle(array $server, string $raw, callable $sender, callable $limiter): array
{
    if (($server['REQUEST_METHOD'] ?? '') !== 'POST') {
        return response(405, ['error' => 'POSTで送信してください。'], ['Allow' => 'POST']);
    }
    if (strtolower(trim(explode(';', $server['CONTENT_TYPE'] ?? '')[0])) !== 'application/json') {
        return response(415, ['error' => 'JSON形式で送信してください。']);
    }
    // Exact production origin; never trust Host / X-Forwarded-Host for authorization.
    if (($server['HTTP_ORIGIN'] ?? '') !== 'https://teiresias.jp'
        || (isset($server['HTTP_SEC_FETCH_SITE']) && $server['HTTP_SEC_FETCH_SITE'] !== 'same-origin')) {
        return response(403, ['error' => FAILURE]);
    }
    if ((float) ($server['CONTENT_LENGTH'] ?? 0) > MAX_BYTES || strlen($raw) > MAX_BYTES) {
        return response(413, ['error' => '送信内容が大きすぎます。']);
    }
    try {
        $input = json_decode($raw, false, 16, JSON_THROW_ON_ERROR);
    } catch (\JsonException $error) {
        return response(400, ['error' => '送信内容を確認してください。']);
    }
    if (!is_object($input)) return response(422, ['error' => '入力内容を確認してください。']);
    if (!function_exists('mb_convert_encoding') || !function_exists('mb_encode_mimeheader')) {
        return response(503, ['error' => FAILURE]);
    }
    [$data, $errors] = validate($input);
    if ($data['website'] !== '') return response(400, ['error' => '送信内容を確認してください。']);
    if ($errors) return response(422, ['error' => '入力内容を確認してください。', 'errors' => $errors]);
    try {
        // REMOTE_ADDR only: clients cannot spoof the counter using forwarded headers.
        if (!$limiter($server['REMOTE_ADDR'] ?? 'unknown')) {
            return response(429, ['error' => '送信回数が多いため、時間をおいて再度お試しください。'], ['Retry-After' => '600']);
        }
    } catch (\Throwable $error) {
        return response(503, ['error' => FAILURE]);
    }
    try {
        if ($sender($data) !== true) return response(502, ['error' => FAILURE]);
        return response(200, ['ok' => true]);
    } catch (\Throwable $error) {
        return response(502, ['error' => FAILURE]);
    }
}

// Inclusion by CLI tests does not execute the endpoint or send mail.
if (realpath($_SERVER['SCRIPT_FILENAME'] ?? '') === __FILE__) {
    ini_set('display_errors', '0');
    // Do not log PHP warnings that could include addresses / provider details.
    ini_set('log_errors', '0');
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    try {
        $raw = file_get_contents('php://input', false, null, 0, MAX_BYTES + 1);
        if ($raw === false) throw new \RuntimeException('Input unavailable');
        [$status, $body, $headers] = handle($_SERVER, $raw, __NAMESPACE__ . '\\send', __NAMESPACE__ . '\\rateLimit');
    } catch (\Throwable $error) {
        [$status, $body, $headers] = response(500, ['error' => FAILURE]);
    }
    http_response_code($status);
    foreach ($headers as $name => $value) header($name . ': ' . $value);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
}
