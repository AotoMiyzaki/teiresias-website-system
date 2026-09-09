import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { DetailPageHero } from '../components/DetailPageHero'
import { PageCta } from '../components/PageCta'
import { PageMeta } from '../components/PageMeta'
import '../styles/pages/detail-page.css'
import '../styles/pages/cases.css'

export function CasesPage() {
  return (
    <>
      <PageMeta
        title="開発事例 | TEIRESIAS合同会社"
        description="会社ごとの業務を整理し、Webシステムとして設計・開発している事例を紹介します。"
      />
      <main id="main-content" className="detail-page cases-page" tabIndex={-1}>
        <Breadcrumbs current="開発事例" />
        <DetailPageHero
          eyebrow="CASE STUDIES"
          title={'業務の中にある問題を、\n運用できる仕組みへ。'}
          description="TEIRESIASが設計・開発している業務システムの事例を紹介します。公開できる範囲に限り、背景、対象業務、設計方針、開発範囲を掲載します。"
          number="03"
        />

        <section className="detail-statement" aria-labelledby="cases-statement">
          <div className="container">
            <p className="eyebrow">OUR WORK</p>
            <h2 id="cases-statement">
              完成した画面ではなく、何をどう整理したかを伝える。
            </h2>
          </div>
        </section>

        <section
          className="detail-section cases-feature"
          aria-labelledby="cases-feature-title"
        >
          <div className="container cases-feature__grid">
            <p className="cases-feature__number" aria-hidden="true">
              01
            </p>
            <div className="cases-feature__content">
              <h2 id="cases-feature-title">
                13店舗のFAX発注を、
                <br />
                ひとつのWebシステムへ。
              </h2>
              <p>
                食品小売・惣菜販売企業で行われていたFAX中心の発注業務をWeb化。店舗からの発注、本部での確認、商品・店舗マスタ、帳票、販売管理を段階的に統合しています。
              </p>
              <dl className="cases-feature__facts">
                <div>
                  <dt>業種</dt>
                  <dd>食品小売・惣菜販売</dd>
                </div>
                <div>
                  <dt>対象</dt>
                  <dd>13店舗・本部</dd>
                </div>
                <div>
                  <dt>開発範囲</dt>
                  <dd>発注、承認、マスタ、帳票、販売管理</dd>
                </div>
                <div>
                  <dt>状態</dt>
                  <dd>開発・導入中</dd>
                </div>
              </dl>
              <Link className="text-link" to="/cases/order-management">
                事例の詳細を見る
              </Link>
            </div>
          </div>
        </section>

        <section
          className="detail-section cases-note"
          aria-labelledby="cases-note-title"
        >
          <div className="container">
            <h2 id="cases-note-title">公開できる事例から、順次掲載します。</h2>
            <p>
              業務内容や開発状況を公開できる事例に限り、背景と設計方針を紹介します。
            </p>
          </div>
        </section>

        <PageCta />
      </main>
    </>
  )
}
