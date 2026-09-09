import { Breadcrumbs } from '../components/Breadcrumbs'
import { DetailPageHero } from '../components/DetailPageHero'
import { PageMeta } from '../components/PageMeta'
import '../styles/pages/detail-page.css'
import '../styles/pages/content-pages.css'

const consultationTopics = [
  '紙、FAX、電話、Excelに分散している業務',
  '受発注、在庫、製造、販売、損益のつながり',
  '店舗や部署ごとに異なる運用',
  '独自の承認、計算、単位、帳票',
  '既存サービスでは扱いにくい例外処理',
  '既存データや外部システムとの連携',
]

const consultationSteps = [
  ['01', '相談', '現在の業務と、改善したいことを確認します。'],
  ['02', '業務確認', '利用者、情報の流れ、例外処理を整理します。'],
  ['03', '設計・見積り', '必要性と優先度から最初の開発範囲を決めます。'],
  ['04', '開発・導入', '確認と修正を重ね、必要な範囲から導入します。'],
]

const privacyTopics = [
  '取得する情報と取得方法',
  '利用目的',
  '第三者提供の取り扱い',
  '安全管理に関する方針',
  '開示・訂正等の手続き',
  'お問い合わせ窓口',
]

export function ContactPage() {
  return (
    <>
      <PageMeta
        title="お問い合わせ | TEIRESIAS合同会社"
        description="会社固有の業務システム開発について、相談できる内容と開発までの流れをご案内します。お問い合わせ窓口は現在準備中です。"
      />
      <main id="main-content" className="detail-page content-page" tabIndex={-1}>
        <Breadcrumbs current="お問い合わせ" />
        <DetailPageHero
          eyebrow="CONTACT"
          title={'会社固有の業務について、\nお聞かせください。'}
          description="作りたい機能が決まっていない段階でも、現在の運用、利用者、分散している情報から、システム化する範囲を整理できます。"
          number="06"
        />

        <section className="contact-status" aria-labelledby="contact-status-title">
          <div className="container contact-status__inner">
            <p className="eyebrow">CURRENT STATUS</p>
            <h2 id="contact-status-title">お問い合わせ窓口を準備しています。</h2>
            <p>
              現在、Webサイトから利用できる正式な問い合わせ窓口を準備しています。送信先が確認できない状態で動作しないフォームを設置せず、窓口の準備が整い次第このページでご案内します。
            </p>
          </div>
        </section>

        <section className="detail-section consultation-topics" aria-labelledby="topics-title">
          <div className="container content-split">
            <header className="detail-section__heading">
              <p className="eyebrow">WHAT TO DISCUSS</p>
              <h2 id="topics-title">相談できる内容</h2>
              <p>共通業務には標準サービスを活用し、会社固有の部分に個別設計が必要かどうかも含めて整理します。</p>
            </header>
            <ul className="content-list">
              {consultationTopics.map((topic, index) => (
                <li key={topic}><span>{String(index + 1).padStart(2, '0')}</span>{topic}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="detail-section consultation-process" aria-labelledby="consultation-process-title">
          <div className="container">
            <header className="detail-section__heading">
              <p className="eyebrow">FROM CONSULTATION</p>
              <h2 id="consultation-process-title">相談から開発まで</h2>
            </header>
            <ol className="consultation-steps">
              {consultationSteps.map(([number, title, description]) => (
                <li key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></li>
              ))}
            </ol>
          </div>
        </section>
      </main>
    </>
  )
}

export function PrivacyPage() {
  return (
    <>
      <PageMeta
        title="プライバシーポリシー | TEIRESIAS合同会社"
        description="TEIRESIAS合同会社のプライバシーポリシー準備状況をご案内します。正式な内容は現在準備中です。"
      />
      <main id="main-content" className="detail-page content-page" tabIndex={-1}>
        <Breadcrumbs current="プライバシーポリシー" />
        <DetailPageHero
          eyebrow="PRIVACY POLICY"
          title={'情報の取り扱いを、\n明確にするために。'}
          description="TEIRESIAS合同会社における個人情報の取り扱いについて、正式な方針の公開準備を進めています。"
          number="07"
        />

        <section className="privacy-status" aria-labelledby="privacy-status-title">
          <div className="container privacy-status__inner">
            <p className="eyebrow">CURRENT STATUS</p>
            <h2 id="privacy-status-title">正式なプライバシーポリシーは現在準備中です。</h2>
            <p>
              取り扱う情報、利用目的、管理方法、問い合わせ窓口を確認し、内容が確定した段階でこのページに掲載します。確定していない法的事項を推測で掲載することはしていません。
            </p>
          </div>
        </section>

        <section className="detail-section privacy-preparation" aria-labelledby="privacy-preparation-title">
          <div className="container content-split">
            <header className="detail-section__heading">
              <p className="eyebrow">IN PREPARATION</p>
              <h2 id="privacy-preparation-title">公開に向けて確認する項目</h2>
              <p>以下はポリシー本文ではなく、正式な公開に向けて確認・整備する項目です。</p>
            </header>
            <ul className="content-list">
              {privacyTopics.map((topic, index) => (
                <li key={topic}><span>{String(index + 1).padStart(2, '0')}</span>{topic}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  )
}
