import { Breadcrumbs } from '../components/Breadcrumbs'
import { DetailPageHero } from '../components/DetailPageHero'
import { NumberedFeature } from '../components/NumberedFeature'
import { PageCta } from '../components/PageCta'
import { PageMeta } from '../components/PageMeta'
import '../styles/pages/detail-page.css'
import '../styles/pages/case-detail.css'

const developmentPhases = [
  {
    number: '01',
    title: '発注業務のWeb化',
    description: '店舗からの発注入力、本部での確認、状態管理を整備します。',
  },
  {
    number: '02',
    title: 'マスタ管理',
    description: '店舗、商品など、発注に必要な基本情報を一元管理します。',
  },
  {
    number: '03',
    title: '検索・帳票・履歴',
    description:
      '店舗別の検索、CSV、帳票、操作履歴など、本部の管理機能を追加します。',
  },
  {
    number: '04',
    title: '販売管理への拡張',
    description: '発注だけでなく、販売情報や店舗管理へ対象範囲を広げます。',
  },
]

const designPolicies = [
  {
    number: '01',
    title: '店舗の入力負担を増やさない',
    description:
      '現場で利用する人が迷わず入力できる画面と操作を優先します。',
  },
  {
    number: '02',
    title: '本部から全体を確認できる',
    description:
      '店舗ごとの情報を残しながら、本部で横断的に確認できる構造にします。',
  },
  {
    number: '03',
    title: '一度にすべてを置き換えない',
    description:
      '最初に必要な範囲から導入し、利用状況に応じて機能を追加します。',
  },
]

const storeSideItems = [
  '店舗ごとのログイン',
  '発注内容の入力',
  '送信した内容の確認',
  '状態の確認',
  '過去の発注履歴',
]

const headquartersSideItems = [
  '全店舗の発注一覧',
  '店舗別の内容確認',
  '承認・差し戻し',
  'コメント',
  '商品・店舗マスタ',
  '帳票・CSV',
  '履歴の確認',
]

export function OrderManagementCasePage() {
  return (
    <>
      <PageMeta
        title="13店舗の発注管理システム | 開発事例 | TEIRESIAS合同会社"
        description="13店舗で行われていたFAX中心の発注業務を、店舗と本部で利用できるWebシステムへ移行する開発事例です。"
      />
      <main
        id="main-content"
        className="detail-page case-detail-page"
        tabIndex={-1}
      >
        <Breadcrumbs
          items={[
            { label: 'トップ', to: '/' },
            { label: '開発事例', to: '/cases' },
            { label: '13店舗の発注管理' },
          ]}
        />
        <DetailPageHero
          eyebrow="CASE STUDY 01"
          title={'13店舗のFAX発注を、\nひとつのWebシステムへ。'}
          description="店舗ごとにFAXで送られていた発注情報を、店舗と本部が同じシステム上で確認できる形へ整理しています。単にFAXを入力フォームへ置き換えるのではなく、確認、承認、マスタ、帳票、販売管理まで段階的に統合する開発です。"
          number="01"
        />

        <section
          className="case-summary"
          aria-labelledby="case-summary-title"
        >
          <div className="container">
            <h2 className="visually-hidden" id="case-summary-title">
              事例概要
            </h2>
            <dl>
              <div>
                <dt>業種</dt>
                <dd>食品小売・惣菜販売</dd>
              </div>
              <div>
                <dt>対象</dt>
                <dd>13店舗・本部</dd>
              </div>
              <div>
                <dt>対象業務</dt>
                <dd>店舗から本部への発注業務</dd>
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
          </div>
        </section>

        <section className="detail-section" aria-labelledby="before-title">
          <div className="container">
            <header className="detail-section__heading">
              <p className="eyebrow">BEFORE</p>
              <h2 id="before-title">
                店舗ごとの発注が、
                <br />
                FAXと紙に分散していた。
              </h2>
            </header>
            <div className="case-detail__prose">
              <p>
                各店舗は不足している商品を確認し、発注内容を紙へ記入してFAXで本部へ送っていました。本部では複数店舗から届くFAXを確認し、店舗別の状況や過去の発注内容を紙の中から追う必要がありました。
              </p>
              <p>
                発注した店舗と確認する本部で情報が分かれているため、現在の状態、確認履歴、差し戻し内容を一つの場所で把握しにくい状態でした。
              </p>
            </div>
          </div>
        </section>

        <section
          className="detail-section"
          aria-labelledby="requirement-title"
        >
          <div className="container">
            <header className="detail-section__heading">
              <p className="eyebrow">THE REQUIREMENT</p>
              <h2 id="requirement-title">
                FAXをフォームに変えるだけでは、
                <br />
                業務全体はつながらない。
              </h2>
            </header>
            <div className="case-detail__prose">
              <p>
                発注入力だけをWeb化しても、商品情報、店舗情報、確認方法、帳票、販売管理が別の場所に残れば、本部の確認作業は分散したままです。
              </p>
              <p>
                そのため、最初の発注機能だけで完成とせず、関連するマスタや管理機能を段階的に統合する設計としています。
              </p>
            </div>
          </div>
        </section>

        <section
          className="detail-section system-structure"
          aria-labelledby="structure-title"
        >
          <div className="container">
            <header className="detail-section__heading">
              <p className="eyebrow">SYSTEM STRUCTURE</p>
              <h2 id="structure-title">
                店舗と本部で、
                <br />
                必要な情報と操作を分ける。
              </h2>
            </header>
            <div className="system-structure__grid">
              <article className="system-structure__column">
                <h3>店舗側</h3>
                <ul>
                  {storeSideItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="system-structure__column">
                <h3>本部側</h3>
                <ul>
                  {headquartersSideItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
            <p className="system-structure__note">
              上記には、現在開発中または段階的な追加を予定している機能を含みます。
            </p>
          </div>
        </section>

        <section
          className="detail-section"
          aria-labelledby="phases-title"
        >
          <div className="container">
            <header className="detail-section__heading">
              <p className="eyebrow">DEVELOPMENT PHASES</p>
              <h2 id="phases-title">
                必要な業務から、
                <br />
                段階的に統合する。
              </h2>
            </header>
            <div className="numbered-feature-list numbered-feature-list--four">
              {developmentPhases.map((phase) => (
                <NumberedFeature key={phase.number} {...phase} />
              ))}
            </div>
          </div>
        </section>

        <section
          className="detail-section development-scope"
          aria-labelledby="policy-title"
        >
          <div className="container">
            <header className="detail-section__heading">
              <p className="eyebrow">DESIGN POLICY</p>
              <h2 id="policy-title">
                現在の運用を理解してから、
                <br />
                変更する範囲を決める。
              </h2>
            </header>
            <div className="numbered-feature-list numbered-feature-list--three">
              {designPolicies.map((policy) => (
                <NumberedFeature key={policy.number} {...policy} />
              ))}
            </div>
          </div>
        </section>

        <section className="case-status" aria-labelledby="status-title">
          <div className="container">
            <p className="eyebrow">CURRENT STATUS</p>
            <h2 id="status-title">開発・導入を進めています。</h2>
            <p>
              現在は、発注業務のWeb化を起点として、関連する管理機能を段階的に開発・導入しています。実際の利用状況を確認しながら、画面や機能を調整します。
            </p>
          </div>
        </section>

        <PageCta />
      </main>
    </>
  )
}
