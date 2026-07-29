import { Breadcrumbs } from '../components/Breadcrumbs'
import { DetailPageHero } from '../components/DetailPageHero'
import { NumberedFeature } from '../components/NumberedFeature'
import { PageCta } from '../components/PageCta'
import { PageMeta } from '../components/PageMeta'
import '../styles/pages/detail-page.css'
import '../styles/pages/services.css'

type ServiceDetail = {
  number: string
  title: string
  description: string
  capabilities: string[]
  note?: string
}

const serviceDetails: ServiceDetail[] = [
  {
    number: '01',
    title: '発注・受注管理',
    description:
      '店舗や担当者からの依頼、内容確認、承認、差し戻し、発注状況を一つのシステムで管理します。紙やFAXで分散していた情報を、店舗と本部の双方から確認できる状態にします。',
    capabilities: [
      '店舗・担当者からの発注入力',
      '内容確認と承認',
      '差し戻しとコメント',
      '発注履歴の保存',
      '店舗別・商品別の一覧',
      'CSV・帳票出力',
    ],
  },
  {
    number: '02',
    title: '在庫・商品管理',
    description:
      '商品情報、在庫、入出庫、棚卸などの情報を一元管理します。会社独自の商品分類、単位、販売方法にも合わせて設計します。',
    capabilities: [
      '商品マスタ',
      '在庫数の記録',
      '入庫・出庫管理',
      '棚卸入力',
      '店舗別在庫',
      '在庫差異の確認',
    ],
  },
  {
    number: '03',
    title: '多店舗管理',
    description:
      '複数店舗の発注、売上、在庫、廃棄、報告状況などを、本部から横断的に確認できるようにします。店舗ごとの差異を残しながら、全体を比較できる形へ整理します。',
    capabilities: [
      '全店舗の一覧',
      '店舗別の詳細画面',
      '店舗間比較',
      '報告状況の確認',
      '店舗ごとの権限設定',
      '本部向け集計画面',
    ],
  },
  {
    number: '04',
    title: '販売・売上管理',
    description:
      '販売実績や売上報告を記録し、店舗別、期間別、商品別に確認できるようにします。手作業で行われていた集計や転記を減らします。',
    capabilities: [
      '日次売上報告',
      '店舗別売上',
      '商品別売上',
      '期間別集計',
      'CSV出力',
      '売上データの比較',
    ],
    note:
      '外部のPOS、レジ、会計サービスとの連携は、各サービスのAPIや出力仕様を確認したうえで対応範囲を決定します。',
  },
  {
    number: '05',
    title: '申請・承認管理',
    description:
      '申請、確認、承認、差し戻しなど、紙、メール、口頭で行われている社内手続きをシステム化します。会社独自の承認順序や権限にも対応します。',
    capabilities: [
      '申請フォーム',
      '承認者の設定',
      '複数段階の承認',
      '差し戻し',
      'コメント',
      '申請履歴',
    ],
  },
  {
    number: '06',
    title: '独自業務システム',
    description:
      '既存サービスでは対応できない会社独自の業務フローを確認し、必要な画面、権限、計算、帳票を個別に設計します。',
    capabilities: [
      '独自の計算処理',
      '会社専用の入力画面',
      '独自帳票',
      '部署・店舗別の権限',
      '既存データの取り込み',
      '段階的な機能追加',
    ],
  },
]

const commonCapabilities = [
  'アカウント管理',
  '店舗・部署・担当者ごとの権限',
  '商品・店舗・取引先などのマスタ管理',
  '検索・絞り込み',
  'CSV入出力',
  'PDF・帳票出力',
  '操作履歴',
  'コメント・差し戻し',
  'パソコン・タブレット・スマートフォン対応',
  '保守・機能追加',
]

const developmentSteps = [
  {
    number: '01',
    title: '現在の業務を確認',
    description: '紙、Excel、既存サービス、担当者の作業を確認します。',
  },
  {
    number: '02',
    title: '優先する業務を決定',
    description:
      '負担や損失が大きい部分から、最初の開発範囲を決めます。',
  },
  {
    number: '03',
    title: '運用しながら拡張',
    description:
      '実際の利用状況を確認し、必要な機能を追加します。',
  },
]

export function ServicesPage() {
  return (
    <>
      <PageMeta
        title="事業内容 | TEIRESIAS合同会社"
        description="発注、在庫、多店舗管理、販売、承認など、会社ごとの業務に合わせたWebシステムを設計・開発します。"
      />
      <main id="main-content" className="detail-page services-page" tabIndex={-1}>
        <Breadcrumbs current="事業内容" />
        <DetailPageHero
          eyebrow="SERVICES"
          title={'会社ごとの業務を、\n必要な機能からシステムへ。'}
          description="紙、FAX、Excel、複数のサービスに分散している業務を整理し、会社の運用に合わせたWebシステムを設計・開発します。既存のフォーマットをそのまま導入するのではなく、現在の業務と利用者を確認したうえで、必要な機能を組み立てます。"
          number="01"
        />

        <section className="detail-statement" aria-labelledby="services-statement">
          <div className="container">
            <p className="eyebrow">FROM OPERATIONS</p>
            <h2 id="services-statement">
              機能から選ぶのではなく、
              <br />
              業務から必要な機能を決める。
            </h2>
          </div>
        </section>

        <div className="service-details">
          {serviceDetails.map((service) => (
            <section
              className="service-detail"
              aria-labelledby={`service-${service.number}`}
              key={service.number}
            >
              <div className="container service-detail__grid">
                <div className="service-detail__summary">
                  <p className="service-detail__label">
                    SERVICES {service.number}
                  </p>
                  <h2 id={`service-${service.number}`}>{service.title}</h2>
                  <p>{service.description}</p>
                  {service.note && (
                    <p className="service-detail__note">{service.note}</p>
                  )}
                </div>
                <div className="service-detail__capabilities">
                  <h3>できること</h3>
                  <ul>
                    {service.capabilities.map((capability, index) => (
                      <li key={capability}>
                        <span aria-hidden="true">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section
          className="detail-section common-capabilities"
          aria-labelledby="common-capabilities-title"
        >
          <div className="container">
            <header className="detail-section__heading">
              <p className="eyebrow">COMMON FUNCTIONS</p>
              <h2 id="common-capabilities-title">
                業務に合わせて、共通機能も組み合わせます。
              </h2>
            </header>
            <ol className="common-capabilities__grid">
              {commonCapabilities.map((capability, index) => (
                <li key={capability}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {capability}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="detail-section development-scope"
          aria-labelledby="development-scope-title"
        >
          <div className="container">
            <header className="detail-section__heading">
              <p className="eyebrow">SCOPE</p>
              <h2 id="development-scope-title">
                最初から、すべてを作る必要はありません。
              </h2>
              <p>
                業務全体を一度に置き換えるのではなく、現在の負担が大きい部分、情報が把握できていない部分、転記や確認に時間がかかっている部分から開発範囲を決めます。最初の導入後も、利用状況に合わせて機能を追加できます。
              </p>
            </header>
            <div className="numbered-feature-list numbered-feature-list--three">
              {developmentSteps.map((step) => (
                <NumberedFeature key={step.number} {...step} />
              ))}
            </div>
          </div>
        </section>

        <PageCta
          title="現在の業務から、必要なシステムを整理します。"
          description="作りたい機能がまだ明確でなくても、現在の運用と課題から開発範囲を整理できます。"
        />
      </main>
    </>
  )
}
