# TEIRESIAS Website

React / Vite / TypeScript。正式本番URL: **https://teiresias.jp/**。
本番はロリポップ！。WordPress・Node・Vercel Function・SMTPパスワードは本番実行に不要です。

## Build targets

Node.js 24で npm ci 後、次を実行します。

| コマンド | 用途 | フォーム送信先 | dist |
| --- | --- | --- | --- |
| npm run build | ロリポップ本番 | /api/contact.php | PHP・.htaccessを含む |
| npm run build:vercel | Vercel Preview | /api/contact | PHP・.htaccessを含まない |
| npm run dev -- --host 127.0.0.1 --port 5173 | ローカル開発 | /api/contact | 開発サーバー |

vercel.jsonはbuild:vercelを明示。出力先はどちらもdistなので、FTPへ渡す直前には
**npm run build && npm run verify:dist** を実行してください。
PHPはpublic配下に置かず、Lolipop buildだけでlolipop/から取り込みます。
vite previewはPHPを実行できません。ダウンロードを実行成功と誤認しないでください。

## Lolipop Contact

POST /api/contact.php → PHP標準mail() → サーバーのメール配送機能。
PHP 8.x・mbstring必須。ロリポップ管理画面でサポート中のPHP版を選んでください。
From / To / envelope senderはinfo@teiresias.jp固定、検証済み入力メールがReply-Toです。
件名はUTF-8 MIME、本文はUTF-8/base64。Composer・外部メールサービスは不要です。
mail()のtrueは配送処理の受理であり、受信箱への到達保証ではありません。
自動返信・独自DB保存はありません。

### Security

- POST、JSON Content-Type、宣言値・読み取り双方の24KiB制限。
- 必須・型・文字数（JSと同じUTF-16単位）・trim・メール・電話・カテゴリ・同意を検証。
- honeypot、ヘッダー注入・制御文字を拒否。From/sendmail引数は入力に依存しません。
- Originはhttps://teiresias.jpに完全一致必須。欠落/null/cross-siteは拒否。CORS許可なし。
- REMOTE_ADDRのハッシュで5回/10分。転送IPヘッダーは信頼しません。
- PHP一時領域の0600ファイルへハッシュ・回数・期限のみ保存。本文・生IPは保存しません。
  flock排他、最大1000キー、期限切れは次回アクセス時に掃除。保存不可は503。
  分散環境全体の厳密な制限ではなく、プロキシでIP共通になる環境は実機確認が必要です。
- 送信失敗502、利用不可503、過剰送信429。内部詳細・個人情報のレスポンス/ログ出力なし。
- サーバー自体のアクセスログは事業者の設定に従います。

## Vercel Preview only

Node/Nodemailer APIはPreview・ローカル用に維持。
必要ならPreview環境にSMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE,
CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL（任意）を設定します。
ロリポップの必要設定ではありません。値をGit・ログ・会話へ貼らないでください。
未設定Previewのフォームは503です。今回、環境変数設定・実送信は行いません。

## Validation

- npm run build
- npm run lint
- npm test（既存Nodeテスト。送信スタブ、実メールなし）
- npm run verify:dist（成果物allowlist、PHP/.htaccess一致、endpoint、本番URL、sitemap9件）
- git diff --check
- npm audit
- php -l lolipop/api/contact.php
- php -l dist/api/contact.php
- npm run test:php（29ケース。送信・レート保存をスタブ化、実メールなし）

末尾3コマンドはPHP CLI・mbstringがある環境で実行してください。

## SEO / publishing

index.html、PageMeta.tsx、robots.txt、sitemap.xmlはteiresias.jpを使用。
title・description・既存JSON-LD会社情報は維持。
SPAのページ固有metaはJS実行後に更新され、JS非実行クローラーにはHome metaが見えます。
不明ページはsoft 404（HTTP200 + React404/noindex）。欠損api/assetsは.htaccessでHTTP404。
SSR/prerender/専用og:imageは未追加です。

FTP・バックアップ・公開後確認は [公開手順](docs/lolipop-production.md) を参照。
公開前にPrivacyと実際のメール保管・削除運用を責任者が確認してください。

参考: [ロリポップPHP/SENDMAIL](https://lolipop.jp/manual/hp/cgi/)、
[PHP mail](https://www.php.net/manual/en/function.mail.php)。
