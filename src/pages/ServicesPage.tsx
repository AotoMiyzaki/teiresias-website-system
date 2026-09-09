import { Breadcrumbs } from '../components/Breadcrumbs'
import { DetailPageHero } from '../components/DetailPageHero'
import { NumberedFeature } from '../components/NumberedFeature'
import { PageCta } from '../components/PageCta'
import { PageMeta } from '../components/PageMeta'
import '../styles/pages/detail-page.css'
import '../styles/pages/services.css'

const coreAreas = [
  { number: '01', title: '受発注・注文管理', description: 'FAX、電話、メール、紙に分かれた注文を集約し、受付から確認、承認、対応履歴までを同じ情報で管理します。' },
  { number: '02', title: '在庫・商品・資材管理', description: '商品、原材料、半製品、完成品の入出庫を記録し、店舗や拠点ごとの理論在庫を把握できる形へ整理します。' },
  { number: '03', title: '製造・生産・作業管理', description: '販売計画と在庫をもとに製造量や作業を組み立て、指示、実績、歩留まりを次の計画へつなげます。' },
  { number: '04', title: '仕入・入荷・検品管理', description: '必要量の算出、仕入先への発注、納品、検品、請求照合をつなぎ、数量や金額の差異を確認します。' },
  { number: '05', title: '販売・売上・損益管理', description: '販売実績を在庫、原価、廃棄、人件費などと結び、店舗別・商品別・期間別に収益を確認します。' },
  { number: '06', title: '多店舗・人員・承認管理', description: '店舗や部署ごとの状況、権限、承認、報告、人員配置を、本部から横断して確認できる構造にします。' },
  { number: '07', title: '独自業務システム', description: '会社固有の計算、単位、帳票、例外処理を確認し、既存の型では扱いにくい業務を個別に設計します。' },
  { number: '08', title: '外部システム・既存データ連携', description: 'POS、会計、既存サービス、CSVなどの仕様を確認し、可能な範囲でデータの取り込みと受け渡しを設計します。' },
]

const mainFlow = [
  { area: '注文', system: '社内受発注、外部注文取込', description: '社内外に分散しているFAX、電話、メール、手書き注文などを一つのシステムに集約し、注文内容と対応履歴を可視化する。' },
  { area: '調達', system: '発注提案、仕入先発注', description: '現在庫、販売計画、製造予定、納品日を基に必要な仕入量を計算し、過剰発注と欠品を抑える。' },
  { area: '入荷', system: '検品、納品、請求照合', description: '発注内容、実際の納品数量、納品書、請求書を連動させ、数量や金額の差異を確認する。' },
  { area: '在庫', system: '原材料・半製品・完成品の理論在庫', description: '納品、製造、販売、廃棄、移動による在庫変動を反映し、店舗や製造拠点に何がどれだけあるかを理論値で把握する。' },
  { area: '製造', system: '製造計画、作業指示、製造実績', description: '販売計画と在庫から必要な製造量、回転数、開始時刻を算出し、現場を計画どおりに動かす。' },
  { area: '配分', system: '店舗配分、店舗間移動', description: '各店舗の販売見込みと在庫状況から商品を適切に配分し、余剰在庫を不足店舗へ移動させる。' },
  { area: '鮮度', system: '消費期限、ロット、売り切り管理', description: '数量だけでなく製造日、消費期限、ロットを管理し、期限切れや廃棄を防ぐための販売・移動判断を支援する。' },
  { area: '販売', system: 'POS連携、予約、外部受注', description: '店頭販売、予約、外部からの注文を一つの販売データとしてまとめ、在庫や製造計画へ反映する。' },
  { area: '経営', system: '損益、需要予測、人件費', description: '売上、原価、廃棄、決済手数料、人件費を統合し、店舗別・商品別に利益と今後の販売見込みを把握する。' },
]

const supportLayer = [
  { area: '人員', system: '必要人数、配置、作業割当', description: '販売予測と製造計画から必要な人数を算出し、時間帯や業務内容に応じて人員を配置する。' },
  { area: '基盤', system: 'レシピ・規格・単位・歩留まり管理', description: '会社固有のレシピ、使用量、製造単位、発注単位、歩留まりを一元管理し、在庫・原価・製造計算の基準を統一する。' },
  { area: '統制', system: '承認、例外対応、履歴、権限', description: '承認が必要な業務や異常発生時の対応を担当者へ回し、誰がいつ何を判断したかを履歴として残す。' },
]

const developmentSteps = [
  { number: '01', title: '現在の業務を確認', description: '紙、Excel、既存サービス、担当者の作業を確認します。' },
  { number: '02', title: '優先する業務を決定', description: '負担や損失が大きい部分から、最初の開発範囲を決めます。' },
  { number: '03', title: '運用しながら拡張', description: '実際の利用状況を確認し、必要な機能を追加します。' },
]

export function ServicesPage() {
  return (
    <>
      <PageMeta
        title="事業内容 | TEIRESIAS合同会社"
        description="受発注、在庫、製造、仕入、販売、損益、多店舗管理など、会社固有の業務がつながるWebシステムを設計・開発します。"
      />
      <main id="main-content" className="detail-page services-page" tabIndex={-1}>
        <Breadcrumbs current="事業内容" />
        <DetailPageHero
          eyebrow="SERVICES"
          title={'業務を、一つずつではなく、\nつながる仕組みとして設計する。'}
          description="受発注だけ、在庫だけ、売上だけを別々に管理するのではなく、一度入力されたデータが次の業務へつながるシステムを設計します。必要な部分から導入し、会社の運用に合わせて段階的に拡張できます。"
          number="01"
        />

        <section className="detail-statement" aria-labelledby="services-statement">
          <div className="container">
            <p className="eyebrow">CONNECTED OPERATIONS</p>
            <h2 id="services-statement">機能を並べるのではなく、<br />情報が次の業務へ渡る構造をつくる。</h2>
          </div>
        </section>

        <section className="detail-section core-development" aria-labelledby="core-title">
          <div className="container">
            <header className="detail-section__heading">
              <p className="eyebrow">CORE DEVELOPMENT AREAS</p>
              <h2 id="core-title">会社ごとの課題から選ぶ、主要な開発領域。</h2>
              <p>業種を限定した製品一覧ではありません。現在の業務を確認し、必要な領域とそのつながりを会社ごとに設計します。</p>
            </header>
            <div className="core-areas">
              {coreAreas.map((area) => (
                <article className="core-area" key={area.number}>
                  <p>{area.number}</p>
                  <div><h3>{area.title}</h3><p>{area.description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="detail-section connected-operations" aria-labelledby="flow-title">
          <div className="container">
            <header className="detail-section__heading">
              <p className="eyebrow">CONNECTED OPERATION EXAMPLE</p>
              <h2 id="flow-title">業務がつながる開発例。</h2>
              <p>食品小売・多店舗企業などを想定した設計例です。完成済みの製品ではなく、各社の運用に合わせて必要な範囲を組み立てます。</p>
            </header>
            <ol className="connected-flow">
              {mainFlow.map((item, index) => (
                <li key={item.area}>
                  <p className="connected-flow__index">{String(index + 1).padStart(2, '0')}</p>
                  <p className="connected-flow__area">{item.area}</p>
                  <div><h3>{item.system}</h3><p>{item.description}</p></div>
                </li>
              ))}
            </ol>

            <div className="support-layer">
              <header><p className="eyebrow">SUPPORT LAYER</p><h3>業務全体を支える共通基盤</h3></header>
              <div>
                {supportLayer.map((item) => (
                  <article key={item.area}>
                    <p className="support-layer__area">{item.area}</p>
                    <h4>{item.system}</h4>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="inventory-example" aria-labelledby="inventory-example-title">
              <div>
                <p className="eyebrow">FOOD / MULTI-STORE EXAMPLE</p>
                <h3 id="inventory-example-title">理論在庫を、次の判断へつなげる。</h3>
                <p>販売、完成品、半製品、原材料、発注、次回製造までの変化を一つの流れとして捉える、開発可能な構成例です。</p>
              </div>
              <p className="inventory-example__flow">販売 <span>完成品在庫</span> <span>半製品</span> <span>原材料</span> <span>発注</span> <span>次回製造</span></p>
            </aside>
          </div>
        </section>

        <section className="detail-section development-scope" aria-labelledby="development-scope-title">
          <div className="container">
            <header className="detail-section__heading">
              <p className="eyebrow">SCOPE</p>
              <h2 id="development-scope-title">最初から、すべてを作る必要はありません。</h2>
              <p>負担が大きい部分、情報が把握できていない部分、転記や確認に時間がかかる部分から開発範囲を決めます。導入後も利用状況に合わせて接続する業務を広げられます。</p>
            </header>
            <div className="numbered-feature-list numbered-feature-list--three">
              {developmentSteps.map((step) => <NumberedFeature key={step.number} {...step} />)}
            </div>
          </div>
        </section>

        <PageCta />
      </main>
    </>
  )
}
