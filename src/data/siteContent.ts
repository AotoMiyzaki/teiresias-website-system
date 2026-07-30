export type NavigationItem = {
  label: string
  path: string
}

export type Service = {
  number: string
  title: string
  description: string
}

export type Approach = {
  number: string
  title: string
  description: string
}

export type PlaceholderContent = {
  eyebrow: string
  title: string
  description: string
}

export const navigationItems: NavigationItem[] = [
  { label: '事業内容', path: '/services' },
  { label: '開発方針', path: '/approach' },
  { label: '開発事例', path: '/cases' },
  { label: '開発の流れ', path: '/process' },
  { label: '会社情報', path: '/company' },
  { label: 'お問い合わせ', path: '/contact' },
]

export const gapItems = [
  '紙・FAXで残る発注や申請',
  '担当者ごとに分かれたExcel',
  '会社独自の承認・計算ルール',
  '店舗や部署ごとに異なる運用',
]

export const approaches: Approach[] = [
  {
    number: '01',
    title: '現在の業務から設計する',
    description:
      '担当者、店舗、承認方法、日々の作業を確認し、実際の運用を基準に画面と機能を設計します。',
  },
  {
    number: '02',
    title: '例外を切り捨てない',
    description:
      '店舗ごとの差異、独自の帳票、特殊な計算など、標準仕様から外れる業務も整理して開発対象にします。',
  },
  {
    number: '03',
    title: '段階的に導入する',
    description:
      'すべてを一度に置き換えず、負担の大きな業務から導入し、実際の利用状況に合わせて拡張します。',
  },
]

export const services: Service[] = [
  {
    number: '01',
    title: '発注・受注管理',
    description:
      '店舗や担当者からの依頼、確認、承認、発注状況を一つの画面で管理します。',
  },
  {
    number: '02',
    title: '在庫・商品管理',
    description: '商品情報、在庫、入出庫、棚卸などの情報を一元管理します。',
  },
  {
    number: '03',
    title: '多店舗管理',
    description:
      '複数店舗の発注、売上、在庫、報告状況を本部から確認できるようにします。',
  },
  {
    number: '04',
    title: '販売・売上管理',
    description:
      '販売実績、売上報告、集計、CSV出力など、日々の管理業務を効率化します。',
  },
  {
    number: '05',
    title: '申請・承認管理',
    description:
      '申請、確認、承認、差し戻しなど、紙やメールで行われている手続きをシステム化します。',
  },
  {
    number: '06',
    title: '独自業務システム',
    description:
      '既存サービスでは対応できない会社独自の業務フローを、必要な機能から設計します。',
  },
]

export const processSteps = [
  '相談',
  '業務の確認',
  '設計・見積り',
  '開発',
  '確認・修正',
  '本番導入',
  '保守・改善',
]

export const placeholderPages: Record<string, PlaceholderContent> = {
  '/contact': {
    eyebrow: 'CONTACT',
    title: 'お問い合わせ',
    description:
      '標準サービスでは対応しにくかった業務や、現在の運用についてお聞かせください。',
  },
  '/privacy': {
    eyebrow: 'PRIVACY POLICY',
    title: 'プライバシーポリシー',
    description:
      'TEIRESIAS合同会社における個人情報の取り扱いについてご案内します。',
  },
}

export const codeColumns = [
  ['type Approval = "pending" | "approved";', 'const branch = workflow.current;', 'return validate(request);'],
  ['SELECT store_id, status', 'FROM purchase_orders', 'WHERE approved_at IS NULL;'],
  ['{ "store": 13,', '  "permission": "manager",', '  "status": "review" }'],
  ['function reconcile(stock: Stock) {', '  return stock.actual - stock.expected;', '}'],
  ['interface DailyReport {', '  storeId: string;', '  submittedAt: Date;', '}'],
  ['const routes = departments.map(', '  (unit) => plan(unit.rules)', ');'],
  ['UPDATE requests', "SET state = 'approved'", 'WHERE reviewer_id = $1;'],
  ['export const ledger = {', '  closingDay: 25,', '  format: "monthly"', '};'],
]
