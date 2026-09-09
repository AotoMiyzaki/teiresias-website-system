import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { DetailPageHero } from '../components/DetailPageHero'
import { NumberedFeature } from '../components/NumberedFeature'
import { PageCta } from '../components/PageCta'
import { PageMeta } from '../components/PageMeta'
import '../styles/pages/detail-page.css'
import '../styles/pages/company.css'

const policies = [
  {
    number: '01',
    title: '会社をシステムに合わせない',
    description:
      '既存の型を押し付けず、現在の業務と利用者から設計します。',
  },
  {
    number: '02',
    title: '作ること自体を目的にしない',
    description:
      '既存サービスで解決できる場合や、業務を変更した方が合理的な場合も含めて整理します。',
  },
  {
    number: '03',
    title: '導入後も改善する',
    description:
      '実際の利用状況と業務変更に合わせて、必要な機能を追加・改善します。',
  },
]

const buildTargets = [
  '受発注・注文管理',
  '在庫・商品・資材管理',
  '製造・生産・作業管理',
  '仕入・入荷・検品管理',
  '販売・売上・損益管理',
  '多店舗・人員・承認管理',
  '会社独自の業務システム',
]

export function CompanyPage() {
  return (
    <>
      <PageMeta
        title="会社情報 | TEIRESIAS合同会社"
        description="TEIRESIAS合同会社の会社情報と、業務システム開発に対する考え方を紹介します。"
      />
      <main id="main-content" className="detail-page company-page" tabIndex={-1}>
        <Breadcrumbs current="会社情報" />
        <DetailPageHero
          eyebrow="COMPANY"
          title={'業務を理解し、\n会社ごとの仕組みをつくる。'}
          description="TEIRESIAS合同会社は、会社ごとに異なる業務を確認し、日々の運用に合ったWebシステムを設計・開発しています。"
          number="05"
        />

        <section className="detail-statement" aria-labelledby="company-statement">
          <div className="container">
            <p className="eyebrow">OUR PURPOSE</p>
            <h2 id="company-statement">
              システムを導入することではなく、実際に利用できる状態をつくる。
            </h2>
          </div>
        </section>

        <section
          className="detail-section company-philosophy"
          aria-labelledby="philosophy-title"
        >
          <div className="container">
            <header className="detail-section__heading">
              <p className="eyebrow">PHILOSOPHY</p>
              <h2 id="philosophy-title">
                標準化できない部分にも、
                <br />
                会社の業務があります。
              </h2>
            </header>
            <div className="company-philosophy__prose">
              <p>
                共通仕様によって効率化できる業務がある一方、会社独自の商品、承認、店舗運営、帳票、例外処理もあります。
              </p>
              <p>
                TEIRESIASは、その違いを不要なものとして切り捨てず、現在の業務に必要な理由を確認したうえで、システムとして整理します。
              </p>
            </div>
          </div>
        </section>

        <section
          className="detail-section company-profile"
          aria-labelledby="profile-title"
        >
          <div className="container">
            <header className="detail-section__heading">
              <p className="eyebrow">PROFILE</p>
              <h2 id="profile-title">会社概要</h2>
            </header>
            <dl>
              <div>
                <dt>会社名</dt>
                <dd>TEIRESIAS合同会社</dd>
              </div>
              <div>
                <dt>所在地</dt>
                <dd>神奈川県横浜市</dd>
              </div>
              <div>
                <dt>事業内容</dt>
                <dd>システム開発・業務システムの設計および運用支援</dd>
              </div>
              <div>
                <dt>対応内容</dt>
                <dd>
                  業務確認、要件整理、画面設計、Webシステム開発、導入支援、保守・改善
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          className="detail-section"
          aria-labelledby="policy-title"
        >
          <div className="container">
            <header className="detail-section__heading">
              <p className="eyebrow">POLICY</p>
              <h2 id="policy-title">3つの方針</h2>
            </header>
            <div className="numbered-feature-list numbered-feature-list--three">
              {policies.map((policy) => (
                <NumberedFeature key={policy.number} {...policy} />
              ))}
            </div>
          </div>
        </section>

        <section
          className="detail-section company-build"
          aria-labelledby="build-title"
        >
          <div className="container">
            <header className="detail-section__heading">
              <p className="eyebrow">WHAT WE BUILD</p>
              <h2 id="build-title">
                紙、FAX、Excelに残る業務から、
                <br />
                会社専用の管理システムまで。
              </h2>
            </header>
            <ul className="company-build__list">
              {buildTargets.map((target, index) => (
                <li key={target}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {target}
                </li>
              ))}
            </ul>
            <Link className="text-link section-link" to="/services">
              事業内容を見る
            </Link>
          </div>
        </section>

        <PageCta />
      </main>
    </>
  )
}
