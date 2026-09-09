import { Breadcrumbs } from '../components/Breadcrumbs'
import { DetailPageHero } from '../components/DetailPageHero'
import { NumberedFeature } from '../components/NumberedFeature'
import { PageCta } from '../components/PageCta'
import { PageMeta } from '../components/PageMeta'
import '../styles/pages/detail-page.css'
import '../styles/pages/approach.css'

const operationalDifferences = [
  '店舗ごとに異なる運用',
  '独自の承認順序',
  '特殊な計算や帳票',
  '紙とExcelに残る例外処理',
]

const developmentPrinciples = [
  {
    number: '01',
    title: '現在の業務から設計する',
    description:
      '既存システムの機能から提案を始めるのではなく、誰が、いつ、何を確認し、どのように処理しているかを確認します。',
  },
  {
    number: '02',
    title: '利用者ごとに画面を分ける',
    description:
      '店舗、本部、管理者など、利用者によって必要な情報と操作は異なります。それぞれが迷わず使える画面を設計します。',
  },
  {
    number: '03',
    title: '例外を切り捨てない',
    description:
      '店舗ごとの差異、独自帳票、特殊な計算、複雑な承認も、現在の業務に必要であれば開発対象として整理します。',
  },
  {
    number: '04',
    title: '必要な部分から導入する',
    description:
      'すべての業務を一度に変更せず、負担や損失が大きい部分から導入します。',
  },
  {
    number: '05',
    title: '導入後も改善する',
    description:
      '本番導入を完成ではなく、実際の利用が始まる地点と考えます。利用状況や業務変更に合わせて改善します。',
  },
]

const standardServicePoints = [
  '共通する業務へ短期間で導入しやすい',
  '料金や機能が分かりやすい',
  '多くの会社で使われる標準仕様',
  '独自業務には合わせにくい場合がある',
]

const teiresiasPoints = [
  '会社固有の業務から設計する',
  '例外処理や独自帳票も整理する',
  '必要な機能から段階的に開発する',
  '導入後の業務変更にも対応する',
]

const suitableOperations = [
  '紙、FAX、Excelでしか管理できていない',
  '複数店舗や部署の情報を本部で把握できない',
  'SaaSを導入しても別のExcel作業が残っている',
  '会社独自の承認や計算がある',
  '複数のサービスに情報が分散している',
  '大規模なシステム開発は費用が合わない',
  '必要な業務から段階的にシステム化したい',
]

export function ApproachPage() {
  return (
    <>
      <PageMeta
        title="開発方針 | TEIRESIAS合同会社"
        description="会社をシステムに合わせるのではなく、会社ごとの業務、例外処理、承認方法に合わせてWebシステムを設計します。"
      />
      <main id="main-content" className="detail-page approach-page" tabIndex={-1}>
        <Breadcrumbs current="開発方針" />
        <DetailPageHero
          eyebrow="OUR APPROACH"
          title={'会社を、\nシステムに合わせない。'}
          description="一般的なシステムは、多くの会社が利用できる共通仕様によって成り立っています。TEIRESIASは、その共通仕様から外れる会社固有の業務を理解し、利用者が実際に使える形へ整理してシステムを設計します。"
          number="02"
        />

        <section className="detail-statement" aria-labelledby="approach-statement">
          <div className="container">
            <p className="eyebrow">OUR POSITION</p>
            <h2 id="approach-statement">
              標準化からこぼれる業務を、
              <br />
              面倒な例外として切り捨てない。
            </h2>
          </div>
        </section>

        <section
          className="detail-section operational-gap"
          aria-labelledby="operational-gap-title"
        >
          <div className="container operational-gap__grid">
            <header className="detail-section__heading">
              <p className="eyebrow">THE DIFFERENCE</p>
              <h2 id="operational-gap-title">
                会社ごとの違いは、なくならない。
              </h2>
              <p>
                同じ業種でも、商品、店舗数、担当者、承認方法、取引先、帳票、計算方法は会社ごとに異なります。共通フォーマットへ合わせることで効率化できる業務がある一方、現場の重要な運用まで無理に変更すると、入力の二重化や別のExcel管理が残ることがあります。
              </p>
            </header>
            <ul className="operational-gap__list">
              {operationalDifferences.map((difference, index) => (
                <li key={difference}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {difference}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="detail-section principles-section"
          aria-labelledby="principles-title"
        >
          <div className="container">
            <header className="detail-section__heading">
              <p className="eyebrow">FIVE PRINCIPLES</p>
              <h2 id="principles-title">TEIRESIASの5つの開発方針</h2>
            </header>
            <div className="numbered-feature-list principles-list">
              {developmentPrinciples.map((principle) => (
                <NumberedFeature key={principle.number} {...principle} />
              ))}
            </div>
          </div>
        </section>

        <section
          className="detail-section comparison-section"
          aria-labelledby="comparison-title"
        >
          <div className="container">
            <header className="detail-section__heading">
              <p className="eyebrow">COMPARISON</p>
              <h2 id="comparison-title">
                標準サービスと、個別開発にはそれぞれ役割があります。
              </h2>
            </header>
            <div className="comparison-grid">
              <article>
                <p className="comparison-grid__label">STANDARD SERVICE</p>
                <h3>標準的なSaaS・パッケージ</h3>
                <ul>
                  {standardServicePoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
              <article className="comparison-grid__teiresias">
                <p className="comparison-grid__label">TEIRESIAS</p>
                <h3>会社ごとの個別開発</h3>
                <ul>
                  {teiresiasPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            </div>
            <p className="comparison-section__note">
              すべての業務に個別開発が必要なわけではありません。既存サービスで十分に解決できる業務には、既存サービスを利用する方が合理的です。TEIRESIASは、既存サービスだけでは解決しにくい部分を開発対象とします。
            </p>
          </div>
        </section>

        <section
          className="detail-section suitable-section"
          aria-labelledby="suitable-title"
        >
          <div className="container">
            <header className="detail-section__heading">
              <p className="eyebrow">SUITABLE OPERATIONS</p>
              <h2 id="suitable-title">
                このような業務について、ご相談ください。
              </h2>
            </header>
            <ul className="suitable-section__list">
              {suitableOperations.map((operation, index) => (
                <li key={operation}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {operation}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="detail-section system-decision"
          aria-labelledby="system-decision-title"
        >
          <div className="container system-decision__inner">
            <p className="eyebrow">THE DECISION</p>
            <h2 id="system-decision-title">
              システムを作ること自体を、目的にしない。
            </h2>
            <p>
              現在の運用を確認した結果、既存サービスで解決できる場合や、業務を変更した方が合理的な場合もあります。開発することを前提にせず、どの部分をシステム化するべきかを整理します。
            </p>
          </div>
        </section>

        <PageCta />
      </main>
    </>
  )
}
