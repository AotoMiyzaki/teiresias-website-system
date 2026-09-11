# TEIRESIAS Website

React / Vite / TypeScriptの公式サイト。Node.js 24で開発・検証。

## Local development

`npm ci`、`npm run dev -- --host 127.0.0.1 --port 5173`。
Viteの開発用middlewareが本番と同じContact handlerを呼び出します。
本番はVercelの `api/contact.ts` で実行します。
ローカル起動シェルにSMTP設定がなければ、有効な送信は503になります。

## Contact environment variables

Vercel Project → Settings → Environment Variablesで設定し、設定後に対象環境のdeploymentを作成してください。
Previewで先に検証し、Productionはユーザーの公開承認後に反映します。
値をコード・README・Git・ログに書かないでください。

- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASS
- SMTP_SECURE
- CONTACT_FROM_EMAIL
- CONTACT_TO_EMAIL（任意。未設定時は指定された問い合わせ窓口へ送信）

SMTP_SECUREはメール事業者の案内に従って設定します。暗黙TLSを使わない設定ではSTARTTLSを必須とし、TLSのない通信は拒否します。差出人はメール事業者で送信許可されたアドレスを登録してください。宛先の既定値はinfo@teiresias.jpです。Reply-Toのみ問い合わせ者になります。自動返信・DB保存は行いません。

本番の受信確認は、認証情報設定後にTESTと分かる問い合わせを1件送信し、受信箱・迷惑メールを確認してください。API成功はSMTPサーバーの受理を意味し、受信箱への最終配達を保証するものではありません。

## Request protection

POST /api/contactのみ。JSON、24KiB上限、必須・型・文字数・制御文字・メール形式・同意をサーバー側で検証します。honeypot、同一originチェック、cross-site拒否、インスタンスごとのIPハッシュによる5回/10分制限があります。

メモリ内の制限はVercelの複数インスタンスや再起動をまたぐ厳密な制限ではありません。攻撃対策が必要になった場合はVercel Firewall側の /api/contact に対する制限か、共有ストアによる制限を追加してください。現時点で有料サービスや共有DBは追加していません。フォーム本文や個人情報はログ出力しません。

## Validation

- `npm test` — transportを差し替えたAPI・validationテスト。実メールは送信しません。
- `npm run build` — frontendとAPIのTypeScript検査、Vite build。
- `npm run lint`
- `git diff --check`
- `npm audit`

## SEO / publishing

Vercelのproject domainで確認したURLをindex.html、PageMeta.tsx、public/robots.txt、public/sitemap.xmlで使用しています。独自ドメインへの切替時はこれらを一緒に更新してください。

React SPAのため、各routeのtitle・description・canonical・404のnoindexはJavaScript実行後に更新されます。JavaScriptを実行しないSNS crawler等にはHomeのHTML metaが見えます。未知URLもSPA fallbackによりHTTP 200となるsoft 404の制約があります。prerenderやframework migrationは今回行っていません。専用og:imageは未追加です。

公開前にPrivacy本文を運用責任者が確認し、SMTP事業者との契約・運用に合っていることを確認してください。

実装参考: [Vercel Vite Functions](https://vercel.com/docs/frameworks/frontend/vite)、[Nodemailer SMTP](https://nodemailer.com/smtp)。
