<?php
declare(strict_types=1);

// No network, no mail(): both transport and rate storage are replaced by stubs.
require __DIR__ . '/../lolipop/api/contact.php';
if (!extension_loaded('mbstring')) {
    fwrite(STDERR, "mbstring is required\n");
    exit(1);
}

$server = ['REQUEST_METHOD' => 'POST', 'CONTENT_TYPE' => 'application/json; charset=utf-8',
    'HTTP_ORIGIN' => 'https://teiresias.jp', 'HTTP_SEC_FETCH_SITE' => 'same-origin',
    'REMOTE_ADDR' => '127.0.0.1'];
$valid = ['company' => ' TEST株式会社 ', 'name' => ' テスト担当 ', 'email' => ' test@example.com ',
    'phone' => '03-1234-5678', 'category' => 'その他', 'message' => "相談内容\nテストです。",
    'consent' => true, 'website' => ''];
$count = 0;
function check(string $name, int $expected, array $result): void
{
    global $count;
    if ($result[0] !== $expected) throw new RuntimeException($name . ': unexpected status ' . $result[0]);
    if (($result[1]['ok'] ?? false) && $expected !== 200) throw new RuntimeException('False success');
    $count++;
    echo "PASS $name\n";
}
$success = function (array $data): bool {
    if ($data['company'] !== 'TEST株式会社' || $data['name'] !== 'テスト担当' || $data['email'] !== 'test@example.com') {
        throw new RuntimeException('Trim mismatch');
    }
    return true;
};
$request = function (array $data, array $overrides = [], ?callable $sender = null, ?callable $limiter = null) use ($server, $success): array {
    return \Teiresias\Contact\handle(array_replace($server, $overrides), json_encode($data, JSON_THROW_ON_ERROR),
        $sender ?? $success, $limiter ?? fn(string $ip): bool => true);
};
check('valid / trim / stub transport accepted', 200, $request($valid));
check('missing fields', 422, $request([]));
check('invalid email', 422, $request(array_replace($valid, ['email' => 'invalid'])));
check('honeypot', 400, $request(array_replace($valid, ['website' => 'bot'])));
check('method', 405, $request($valid, ['REQUEST_METHOD' => 'GET']));
check('content type', 415, $request($valid, ['CONTENT_TYPE' => 'application/json-fake']));
check('foreign origin', 403, $request($valid, ['HTTP_ORIGIN' => 'https://example.com']));
check('missing origin', 403, $request($valid, ['HTTP_ORIGIN' => '']));
check('null origin', 403, $request($valid, ['HTTP_ORIGIN' => 'null']));
check('cross site', 403, $request($valid, ['HTTP_SEC_FETCH_SITE' => 'cross-site']));
check('declared size', 413, $request($valid, ['CONTENT_LENGTH' => '24577']));
check('actual size', 413, \Teiresias\Contact\handle($server, str_repeat('x', 24577), $success, fn() => true));
check('malformed JSON', 400, \Teiresias\Contact\handle($server, '{', $success, fn() => true));
check('invalid UTF-8', 400, \Teiresias\Contact\handle($server, "{\"name\":\"\xFF\"}", $success, fn() => true));
check('array payload', 422, \Teiresias\Contact\handle($server, '[]', $success, fn() => true));
check('null payload', 422, \Teiresias\Contact\handle($server, 'null', $success, fn() => true));
check('header injection', 422, $request(array_replace($valid, ['email' => "test@example.com\r\nBcc: attacker@example.com"])));
check('subject injection', 422, $request(array_replace($valid, ['company' => "TEST\nBcc: attacker@example.com"])));
check('control character', 422, $request(array_replace($valid, ['message' => "bad\x00value"])));
check('length', 422, $request(array_replace($valid, ['name' => str_repeat('あ', 81)])));
check('UTF-16 length parity', 422, $request(array_replace($valid, ['name' => str_repeat('😀', 41)])));
check('consent type', 422, $request(array_replace($valid, ['consent' => 'true'])));
check('category allowlist', 422, $request(array_replace($valid, ['category' => 'invalid'])));
check('field type', 422, $request(array_replace($valid, ['company' => []])));
check('null optional field', 422, $request(array_replace($valid, ['phone' => null])));
check('limiter rejection', 429, $request($valid, [], null, fn() => false));
check('limiter unavailable', 503, $request($valid, [], null, function () { throw new RuntimeException('private storage detail'); }));
check('mail rejected', 502, $request($valid, [], fn() => false));
$failure = $request($valid, [], function () { throw new RuntimeException('private mail detail'); });
check('mail exception', 502, $failure);
if (str_contains(json_encode($failure), 'private')) throw new RuntimeException('Internal information exposed');
echo "$count tests passed; no mail sent.\n";
