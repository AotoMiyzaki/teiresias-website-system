import { Link } from 'react-router-dom'
import { CodeBackdrop } from '../components/CodeBackdrop'
import { PageMeta } from '../components/PageMeta'
import { SectionHeading } from '../components/SectionHeading'
import { ServiceCard } from '../components/ServiceCard'
import {
  approaches,
  businessFlow,
  gapItems,
  processSteps,
  services,
} from '../data/siteContent'

export function HomePage() {
  return (
    <>
      <PageMeta
        title="TEIRESIAS合同会社 | 会社ごとの業務に合わせたシステム開発"
        description="FAX、電話、Excelに分かれた業務をひとつにつなぐ。受発注、在庫、製造、販売、損益まで、会社固有の業務に合わせたシステムを設計・開発します。"
      />
      <main id="main-content" tabIndex={-1}>
      <section className="hero-section">
        <CodeBackdrop />
        <div className="hero-section__veil" aria-hidden="true" />
        <div className="container hero-section__content">
          <p className="eyebrow">CUSTOM BUSINESS SYSTEMS</p>
          <h1>会社を、システムに合わせない。</h1>
          <p className="hero-section__lead">
            FAX、電話、Excelに分かれた業務を、ひとつにつなぐ。
            <br />
            受発注、在庫、製造、販売、損益まで。
            <br />
            会社固有の業務に合わせたシステムを設計・開発します。
          </p>
          <div className="hero-section__actions">
            <Link className="button button--primary" to="/services">
              事業内容を見る
            </Link>
            <Link className="button button--outline" to="/contact">
              開発について相談する
            </Link>
          </div>
        </div>
        <a className="scroll-guide" href="#gap">
          <span>SCROLL</span>
          <i aria-hidden="true" />
        </a>
      </section>

      <section className="section section--paper" id="gap">
        <div className="container split-intro">
          <SectionHeading
            eyebrow="THE GAP"
            title={'大企業には、業務を支える専用システムがある。\n多くの中小企業には、FAXとExcelが残っている。'}
          />
          <div className="split-intro__body">
            <p>
              紙、FAX、電話、Excel。それぞれの方法が悪いのではなく、業務が分散し、同じ情報を何度も入力・確認することが問題です。
            </p>
            <p>
              TEIRESIASは、会社ごとに残っている独自の業務を整理し、ひとつのWebシステムへつなげます。
            </p>
            <ul className="gap-list">
              {gapItems.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section business-flow-section">
        <div className="container">
          <SectionHeading
            eyebrow="BUSINESS FLOW"
            title={'一つの業務だけでなく、\nその前後までつなぐ。'}
            description="一度入力した情報が次の業務へ渡る構造をつくり、転記や確認の重複を減らします。必要な領域から始め、会社の運用に合わせて接続範囲を広げます。"
          />
          <ol className="business-flow">
            {businessFlow.map((item) => (
              <li key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container">
          <SectionHeading
            eyebrow="OUR APPROACH"
            title={'フォーマットではなく、\nその会社の業務からつくる。'}
            description="既存システムの使い方を会社に合わせてもらうのではなく、現在の業務を理解し、その会社が実際に利用しやすい形を設計します。"
          />
          <div className="approach-grid">
            {approaches.map((approach) => (
              <article className="approach-item" key={approach.number}>
                <span>{approach.number}</span>
                <h3>{approach.title}</h3>
                <p>{approach.description}</p>
              </article>
            ))}
          </div>
          <Link className="text-link section-link" to="/approach">
            開発方針を見る
          </Link>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <SectionHeading
            eyebrow="SERVICES"
            title={'業務を、一つずつではなく、\nつながる仕組みとして設計する。'}
            description="代表的な開発領域です。業種を限定せず、現在の運用と課題から必要な範囲を組み立てます。"
          />
          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard key={service.number} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section case-section">
        <div className="container case-section__grid">
          <div className="case-section__number" aria-hidden="true">
            13
            <small>STORES</small>
          </div>
          <div className="case-section__content">
            <SectionHeading
              eyebrow="CASE STUDY"
              title={'13店舗のFAX発注を、\nひとつのWebシステムへ。'}
            />
            <p className="case-section__description">
              食品小売・惣菜販売企業で行われていたFAX中心の発注業務をWeb化。
              店舗からの発注、本部での確認、商品・店舗マスタ、帳票、販売管理を段階的に統合しています。
            </p>
            <dl className="case-facts">
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
              事例を見る
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container">
          <SectionHeading
            eyebrow="PROCESS"
            title="業務の確認から、導入後の改善まで。"
          />
          <ol className="process-list">
            {processSteps.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
          <Link className="text-link section-link" to="/process">
            開発の流れを見る
          </Link>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container company-section">
          <SectionHeading eyebrow="COMPANY" title="会社情報" />
          <dl className="company-facts">
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
          </dl>
          <Link className="text-link section-link" to="/company">
            会社情報を見る
          </Link>
        </div>
      </section>

      <section className="contact-cta">
        <div className="container contact-cta__inner">
          <p className="eyebrow">CONTACT</p>
          <h2>標準サービスでは対応できなかった業務について、ご相談ください。</h2>
          <p>
            紙、FAX、Excel、既存サービスに分散している業務を確認し、会社に合った形へ整理・設計します。
          </p>
          <Link className="button button--primary" to="/contact">
            開発について相談する
          </Link>
        </div>
      </section>
      </main>
    </>
  )
}
