# Lolipop production handoff

本番URL: https://teiresias.jp/。既存PR #1 / codex/website-v2-round-1を継続。
開始時remote: 42ef171cc210e0a1b676ed37c48e16e7772cb35e。
Round 3のデザイン・構成を維持した環境適応です。
FTP操作・WordPress削除・main merge・本番公開・実メール送信はCodexでは行いません。

## 公開成果物

npm run build && npm run verify:dist で生成した**distの中身**を、
teiresias.jpの公開フォルダと確認したteiresias/直下へアップロードします。
teiresias/dist/にはしません。公開フォルダ自体は削除しません。

アップロード対象:

- .htaccess
- index.html
- favicon.svg
- robots.txt
- sitemap.xml
- assets/（index-<hash>.js、index-<hash>.css）
- api/contact.php

src/tests/docs/node_modules/.git/package.json/TypeScript/Vercelソースは不要。
PHPはサーバー実行に必要なファイルです。成果物に資格情報は含みません。

## WordPress置換前

1. 管理画面で公開フォルダ、SSL、サポート中PHP 8.x・mbstring、info@teiresias.jp利用可を確認。
2. 旧サイト全体（隠しファイル・uploads・wp-config.phpを含む）とWordPress DBをバックアップ。
   秘密情報を含むバックアップは非公開で保管し、公開フォルダ内に置かない。
3. 切替時間・復旧手順を決める。除去後から転送完了まで停止・不完全表示が発生し得る。
4. 下記は対象フォルダに実在し、旧WordPressのものと確認した場合だけ除去する。

削除候補（FTP実物は未確認）:

- wp-admin/、wp-content/、wp-includes/
- index.php
- wp-activate.php、wp-blog-header.php、wp-comments-post.php
- wp-config.php、wp-config-sample.php、wp-cron.php、wp-links-opml.php
- wp-load.php、wp-login.php、wp-mail.php、wp-settings.php
- wp-signup.php、wp-trackback.php、xmlrpc.php
- WordPressのreadme.html、license.txt
- 旧.htaccess（バックアップ後、今回の.htaccessに置換）

無差別なwp-*削除・フォルダ全消去はしないでください。
.well-known/、.user.ini、サーバー設定、ドメイン認証ファイル、独自設置物は用途確認まで保持。
WordPress DB削除・メールアカウント削除は切替に不要です。

## FTP手順

1. FTPクライアントで隠しファイルを表示。接続先・公開フォルダを再確認。
2. バックアップ後、確認済みの旧WordPress項目だけ除去。
3. assets/、api/、favicon.svg、robots.txt、sitemap.xmlを転送。
4. index.htmlと新しい.htaccessを転送。WordPress rewriteを混ぜない。
5. 全8ファイルの転送完了を確認。権限はロリポップの環境別案内に従い、777等にはしない。
6. ブラウザキャッシュを無効にし、下記URLを直接入力・再読込して確認。

.htaccessはDirectoryIndex index.html、Indexes/MultiViews無効、
実ファイル/実ディレクトリ除外、欠損api/assetsは404、それ以外をSPAへrewrite。
Apache互換設定は実機確認が必要。500発生時はエラーログと許可ディレクティブを確認。

## 公開後URL

- https://teiresias.jp/
- https://teiresias.jp/services
- https://teiresias.jp/approach
- https://teiresias.jp/cases
- https://teiresias.jp/cases/order-management
- https://teiresias.jp/process
- https://teiresias.jp/company
- https://teiresias.jp/contact
- https://teiresias.jp/privacy
- https://teiresias.jp/robots.txt
- https://teiresias.jp/sitemap.xml
- https://teiresias.jp/favicon.svg
- https://teiresias.jp/api/contact.php （GETは405 JSON。PHPソース表示/ダウンロードは不具合）
- https://teiresias.jp/api/not-found （HTTP404。SPA HTMLではない）
- https://teiresias.jp/not-found （React404/noindex。HTTP200の制約あり）

PC/タブレット/スマートフォンで表示・メニュー・遷移を確認。
canonical/og:url/JSON-LD/sitemapが本番URLを参照することも確認。

## 実メールテスト（ユーザーが公開後に実施）

1. HTTPSの/contactで会社名・本文に「公開確認TEST」、自分で受信できるメールを入力。
2. 必須項目・同意を満たして1回だけ送信。
3. NetworkでPOST /api/contact.php、200 JSON { "ok": true }、UI完了を確認。
4. info@teiresias.jpの受信箱・迷惑メールで到達、日本語件名/本文、JST日時、各項目を確認。
5. Fromがinfo@teiresias.jp、Reply-Toが入力メールになっていることを確認。
6. 失敗時は入力保持を確認。502はメール、503はPHP/mbstring/一時領域、403はOrigin/HTTPS、
   429は10分待機。WAF起因なら管理画面ログを確認し、WAF全体を無効化しない。
7. 200だけで受信確認済みとせず、配送・メール認証をロリポップ側で確認。

## 価格表記の訂正

HomePage.tsxとOrderManagementCasePage.tsxに「既存ベンダー見積」「約1,500万円」
「TEIRESIAS提案」「500万円」を掲載。Cases一覧には価格比較自体を掲載していません。
「約1,500商品」「約500商品」はproduction codeに存在せず、前回Final Reportの誤記でした。
価格コードは変更していません。Round 3 audit文書のHome / Cases / Case詳細は事例全体の総称で、
価格掲載場所としてはHome / Case詳細の2箇所が正確です。

## 検証範囲

ローカルbuild/lint、既存Nodeテスト、成果物検査、Vercel用build分離を確認。
この環境にPHP CLI・Apache実行環境がないため、php -l・PHPテスト・実rewriteは未実行。
PHP 8.x/mbstring環境のnpm run test:phpは29ケースを実送信なしで検証します。
ロリポップ実機、実配送、DNS/SSL/WAF/一時領域は未確認。公開承認は別途必要です。
