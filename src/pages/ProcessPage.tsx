import { Breadcrumbs } from '../components/Breadcrumbs'
import { DetailPageHero } from '../components/DetailPageHero'
import { PageCta } from '../components/PageCta'
import { PageMeta } from '../components/PageMeta'
import '../styles/pages/detail-page.css'
import '../styles/pages/process.css'

const steps = [
  {
    number: '01',
    title: '相談',
    description:
      '現在の業務、困っていること、既存の管理方法、システム化したい範囲を確認します。',
  },
  {
    number: '02',
    title: '業務確認',
    description:
      '紙、FAX、Excel、既存サービス、担当者ごとの作業、例外処理を確認します。',
  },
  {
    number: '03',
    title: '設計・見積り',
    description:
      '優先度と必要性から最初の開発範囲を整理し、仕様と見積りを確認します。',
  },
  {
    number: '04',
    title: '開発',
    description:
      '利用者、権限、入力項目、確認方法を設計し、機能を段階的に開発します。',
  },
  {
    number: '05',
    title: '確認・修正',
    description:
      '画面や動作を確認してもらい、実際の運用に合わせて調整します。',
  },
  {
    number: '06',
    title: '本番導入',
    description:
      '必要に応じて一部の店舗や部署から利用を始め、確認後に利用範囲を広げます。',
  },
  {
    number: '07',
    title: '保守・改善',
    description:
      '実際の利用状況や業務変更に合わせて、機能を保守・改善します。',
  },
]

const reviewItems = [
  '現在使用している紙やFAX',
  'Excelやスプレッドシート',
  '既存サービスの画面',
  '店舗や部署ごとの作業',
  '承認や確認の順序',
  '例外的な処理',
  '現在作成している帳票',
  '最初に改善したい業務',
]

export function ProcessPage() {
  return (
    <>
      <PageMeta
        title="開発の流れ | TEIRESIAS合同会社"
        description="現在の業務確認から、開発、試験導入、本番導入、改善までの進め方を紹介します。"
      />
      <main id="main-content" className="detail-page process-page" tabIndex={-1}>
        <Breadcrumbs current="開発の流れ" />
        <DetailPageHero
          eyebrow="PROCESS"
          title={'業務の確認から、\n導入後の改善まで。'}
          description="作りたい機能だけを聞いて開発を始めるのではなく、現在の業務、利用者、確認方法、例外処理を整理してから開発範囲を決めます。"
          number="04"
        />

        <section className="detail-statement" aria-labelledby="process-statement">
          <div className="container">
            <p className="eyebrow">HOW WE WORK</p>
            <h2 id="process-statement">
              仕様を決める前に、現在の業務を理解する。
            </h2>
          </div>
        </section>

        <section className="detail-section" aria-labelledby="process-steps-title">
          <div className="container">
            <h2 className="visually-hidden" id="process-steps-title">
              7つの工程
            </h2>
            <ol className="process-steps">
              {steps.map((step) => (
                <li key={step.number}>
                  <p className="process-steps__index" aria-hidden="true">
                    {step.number}
                  </p>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="detail-section process-review"
          aria-labelledby="review-title"
        >
          <div className="container">
            <header className="detail-section__heading">
              <p className="eyebrow">WHAT WE REVIEW</p>
              <h2 id="review-title">
                現在使っているものが、
                <br />
                そのまま設計資料になります。
              </h2>
            </header>
            <ul className="process-review__list">
              {reviewItems.map((item, index) => (
                <li key={item}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="process-review__note">
              資料が整理されていなくても問題ありません。現在の業務を確認しながら、必要な情報を一緒に整理します。
            </p>
          </div>
        </section>

        <section className="process-stepwise" aria-labelledby="stepwise-title">
          <div className="container">
            <p className="eyebrow">STEP BY STEP</p>
            <h2 id="stepwise-title">
              最初から、
              <br />
              全業務を変更する必要はありません。
            </h2>
            <p>
              業務全体を一度に置き換えると、現場の負担や確認範囲が大きくなります。最初に効果と必要性が高い部分を導入し、利用状況を確認してから対象範囲を広げます。
            </p>
          </div>
        </section>

        <PageCta />
      </main>
    </>
  )
}
