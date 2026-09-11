# Round 3 audit and verification

実施日: 2026-09-11。基準remote: `1328f81a1e830bc1061b06e0ff090196db2e5824`。
基準local: `3c462be4c7393b7aa44b31c2c6b7148cf8221f3e`。開始時clean。

## Independent audit before edits

コード・全10routeの1440 / 768 / 390px表示を監査。全30組合せで横はみ出し0、H1各1つ、Vite overlayなし。変更前ブラウザconsoleのerror / warnなし。

| Severity | Finding | Action |
| --- | --- | --- |
| Critical | 調査範囲で該当なし | — |
| High | Contactが準備中で問い合わせ導線が完結しない | フォーム、API、SMTP transport、エラー処理を実装 |
| High | Privacyが準備中 | 実際の取得情報・外部サービスに合わせて本文を実装 |
| Medium | モバイルmenuを開いたままPC幅にするとbodyのスクロール禁止が残る | media query変更でclose・cleanup |
| Medium | menuを閉じた直後、visibilityの180ms遅延中にTabがnavへ入る | visibilityを即時hiddenへ変更 |
| Medium | route変更時のmenuボタンへのfocus復帰が本文focusと競合 | nav遷移では復帰を抑止。Escape時は維持 |
| Medium | canonical / og:url / sitemap / robots / schemaと404 noindexがない | domain確認後に追加 |
| Medium | Servicesのdevelopment-scope指定がCase詳細へ漏れる | Servicesへscopeし、Case側へ必要なborderを明記 |
| Medium | 理論在庫の03→04接続が読順と一致しない | 2段目を折り返し配置し06→01の戻りを表示 |
| Low | 旧Homeの未使用CSS | TSX参照なしを確認し約500行削除 |
| Low | Contact見出しが「お聞か／せください」と折り返す | 意味の区切りで改行 |

Homeの10section、個別設計を優先するHero、AIの役割、業界例は維持。13店舗、約1,500万円、500万円はHome / Cases / Case詳細に限定した事例表現であり、新しい成果率等は追加していない。装飾コードにもstore:13があるがaria-hidden。
ProcessはHome3段階・詳細7工程を維持。Companyの未確認の資本金・人員数・認証等は追加していない。

## Verification

- API unit tests: 23件。実メール送信なし。正常処理、必須、型、長さ、メール、control characters、同意、honeypot、malformed JSON、unsupported method/type、cross-origin、parsed/streamed payload、rate limit、transport errorを確認。
- ブラウザ: 未入力でエラー概要へfocusし、項目ごとのエラーを表示。有効なテスト入力はAPIまで到達し、SMTP未設定で失敗表示。入力保持・送信ボタン再有効化を確認。
- SMTP情報はローカル環境に存在せず、実メールの受信確認は未実施。成功を捏造するmock endpointやdebug成功モードは本番コードにない。
- Keyboard: 全routeでTab/Shift+Tab、共通menuでSpace・Escape・循環Tab、skip linkでEnter→main focus。closed navへのTab移動なし。PC幅切替後はscroll lock解除。
- 最終matrix: 10route×3viewportで横はみ出し0、H1各1つ、見出し・button・formの画面外はみ出しなし、canonicalと404 noindexを確認。
- 内部リンクは既存9route、#main-content、#problemへ解決。メール導線は確認済みの問い合わせ窓口。
- Contrast: muted/ivory 4.83:1、bronze-dark/ivory 6.95:1、error/ivory 6.51:1、フォームborder/white 3.84:1。薄い装飾線は操作部品ではない。
- Reduced motion CSSを維持。CodeBackdropはaria-hidden、transform中心の既存animationを維持、mobileではstream数を抑制。
- 未使用hero画像は現treeに存在しない。画像の新規追加・削除なし。
- npm test / npm run build / npm run lint / git diff --check / npm auditを実行。TypeScriptはAPIも検査対象。

## Remaining deployment checks

- SMTP credentialの登録後にTESTメール1件の受信を確認。設定画面と変数名はREADME。
- Privacyの文面が実際のメール事業者・運用と一致することを公開責任者が確認。
- Rate limitはインスタンス単位の補助策。必要時はFirewallまたは共有storeを追加。
- SPAのroute metaはJavaScript依存、未知URLはHTTP 200。SSR/prerender移行は未実施。
- 専用og:imageなし。実端末Safari/Firefox等の網羅テスト、スクリーンリーダー実機、Lighthouse/Core Web Vitalsの本番測定は未実施。
- main更新・merge・意図的なproduction releaseはこのRoundでは行わない。
