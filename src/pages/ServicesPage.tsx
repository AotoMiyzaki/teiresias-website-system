import { Breadcrumbs } from '../components/Breadcrumbs'
import { DetailPageHero } from '../components/DetailPageHero'
import { PageCta } from '../components/PageCta'
import { PageMeta } from '../components/PageMeta'
import '../styles/pages/detail-page.css'
import '../styles/pages/services.css'

const coreAreas = [
  {
    number: '01',
    title: '受発注・注文',
    description: 'FAX、電話、メールなどの注文を一元化。',
  },
  {
    number: '02',
    title: '在庫・商品・資材',
    description: '原材料から完成品までの在庫を管理。',
  },
  {
    number: '03',
    title: '製造・作業',
    description: '販売計画から製造量・作業指示へ接続。',
  },
  {
    number: '04',
    title: '仕入・納品',
    description: '発注、検品、請求照合まで接続。',
  },
  {
    number: '05',
    title: '販売・損益',
    description: '販売実績を在庫、原価、利益へ接続。',
  },
  {
    number: '06',
    title: '多店舗・人員',
    description: '店舗状況、人員、権限を横断管理。',
  },
  {
    number: '07',
    title: '独自業務',
    description: '会社固有の計算、帳票、例外処理。',
  },
  {
    number: '08',
    title: '外部連携',
    description: 'POS、会計、CSV、既存システムと接続。',
  },
]

const mainFlow = [
  { code: 'ORDER', title: '注文', description: '分散した注文を集約' },
  { code: 'PROCUREMENT', title: '調達', description: '必要量を仕入れへ' },
  { code: 'INBOUND', title: '入荷', description: '納品と発注を照合' },
  { code: 'INVENTORY', title: '在庫', description: '入出庫を一元管理' },
  { code: 'PRODUCTION', title: '製造', description: '計画を作業指示へ' },
  { code: 'DISTRIBUTION', title: '配分', description: '拠点間の数量を調整' },
  { code: 'SALES', title: '販売', description: '実績を在庫へ反映' },
  { code: 'MANAGEMENT', title: '経営', description: '情報を次の判断へ' },
]

const supportLayer = [
  {
    code: 'PEOPLE',
    title: '人員',
    description: '配置、担当、作業割当',
  },
  {
    code: 'MASTER DATA',
    title: '基盤',
    description: '商品、取引先、規格、単位',
  },
  {
    code: 'CONTROL',
    title: '統制',
    description: '承認、権限、例外、履歴',
  },
]

const inventoryCycle = [
  '販売',
  '完成品在庫',
  '半製品',
  '原材料',
  '発注',
  '次回製造',
]

const inventoryChanges = ['納品', '製造', '販売', '廃棄', '移動']

const developmentSteps = [
  {
    number: '01',
    title: '現在の業務を確認',
    description: '紙、Excel、既存サービス、担当者の作業を確認します。',
  },
  {
    number: '02',
    title: '優先する業務を決定',
    description: '負担や効果の大きい部分から、最初の範囲を決めます。',
  },
  {
    number: '03',
    title: '運用しながら拡張',
    description: '利用状況を確認し、必要な機能と接続を追加します。',
  },
]

export function ServicesPage() {
  return (
    <>
      <PageMeta
        title="事業内容 | TEIRESIAS合同会社"
        description="受発注、在庫、製造、仕入、販売、損益、多店舗管理など、会社固有の業務がつながるWebシステムを設計・開発します。"
      />
      <main
        id="main-content"
        className="detail-page services-page"
        tabIndex={-1}
      >
        <Breadcrumbs current="事業内容" />
        <DetailPageHero
          eyebrow="SERVICES"
          title="業務を、一つずつではなく、つながる仕組みとして設計する。"
          description="受発注だけ、在庫だけ、売上だけを別々に管理するのではなく、一度入力されたデータが次の業務へつながるシステムを設計します。必要な部分から導入し、会社の運用に合わせて段階的に拡張できます。"
          number="01"
        />

        <section
          className="services-block core-development"
          aria-labelledby="core-title"
        >
          <div className="container">
            <header className="services-heading">
              <p className="eyebrow">WHAT WE BUILD</p>
              <h2 id="core-title">会社ごとの課題から選ぶ、開発領域。</h2>
              <p>
                製品一覧ではありません。現在の業務を確認し、必要な領域とそのつながりを会社ごとに設計します。
              </p>
            </header>
            <div className="core-areas">
              {coreAreas.map((area) => (
                <article className="core-area" key={area.number}>
                  <p>{area.number}</p>
                  <div>
                    <h3>{area.title}</h3>
                    <p>{area.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="services-block connected-operations"
          aria-labelledby="flow-title"
        >
          <div className="container">
            <header className="services-heading connected-operations__heading">
              <p className="eyebrow">CONNECTED OPERATIONS</p>
              <h2 id="flow-title">同じデータが、次の業務へ渡る。</h2>
              <p>
                TEIRESIASは複数のシステムを別々に並べるのではなく、一つの入力が次の判断までつながる構造を設計します。
              </p>
            </header>
            <ol className="connected-flow" aria-label="業務をつなぐメインフロー">
              {mainFlow.map((item, index) => (
                <li key={item.code}>
                  <span className="connected-flow__number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="connected-flow__code">{item.code}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </li>
              ))}
            </ol>

            <div className="support-layer">
              <div className="support-layer__label">
                <p className="eyebrow">SUPPORT LAYER</p>
                <p>メインフロー全体を横断して支える領域</p>
              </div>
              <div className="support-layer__items">
                {supportLayer.map((item) => (
                  <article key={item.code}>
                    <p className="support-layer__code">{item.code}</p>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="services-block inventory-example"
          aria-labelledby="inventory-example-title"
        >
          <div className="container inventory-example__grid">
            <header className="services-heading">
              <p className="eyebrow">DEVELOPMENT EXAMPLE</p>
              <h2 id="inventory-example-title">
                販売した情報が、次に必要な発注・製造までつながる。
              </h2>
              <p>
                食品・多店舗企業を想定した理論在庫の設計例です。完成済みの製品ではなく、会社ごとの運用に合わせて開発する構成例です。
              </p>
            </header>
            <div>
              <ol className="inventory-cycle" aria-label="理論在庫の循環">
                {inventoryCycle.map((item, index) => (
                  <li key={item}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {item}
                  </li>
                ))}
              </ol>
              <p className="inventory-cycle-return">次回製造から販売へ、同じ情報が循環する。</p>
              <div className="inventory-changes">
                <p>理論在庫を変化させる情報</p>
                <ul>
                  {inventoryChanges.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section
          className="services-block development-scope"
          aria-labelledby="development-scope-title"
        >
          <div className="container scope-grid">
            <header className="services-heading">
              <p className="eyebrow">SCOPE</p>
              <h2 id="development-scope-title">
                最初から、すべてを作る必要はありません。
              </h2>
              <p>
                負担や効果の大きい部分から始め、運用しながら接続する業務を広げます。
              </p>
            </header>
            <ol className="scope-steps">
              {developmentSteps.map((step) => (
                <li key={step.number}>
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <PageCta />
      </main>
    </>
  )
}
