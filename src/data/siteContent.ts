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

export type BusinessFlowItem = {
  number: string
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

export const businessFlow: BusinessFlowItem[] = [
  {
    number: '01',
    title: '注文',
    description:
      'FAX、電話、メール、手書きなどに分散した注文情報を、一つのシステムへ集約する。',
  },
  {
    number: '02',
    title: '調達',
    description:
      '在庫や販売計画から必要量を算出し、次の仕入れへつなげる。',
  },
  {
    number: '03',
    title: '入荷',
    description:
      '発注内容と実際の納品を照合し、在庫へ反映する。',
  },
  {
    number: '04',
    title: '在庫',
    description:
      '納品、製造、販売、廃棄などの変化を反映し、理論在庫を更新する。',
  },
  {
    number: '05',
    title: '製造',
    description:
      '販売計画と在庫から必要な製造量や作業を決める。',
  },
  {
    number: '06',
    title: '販売',
    description:
      '販売情報を在庫・製造・損益へつなぎ、二重入力を減らす。',
  },
  {
    number: '07',
    title: '損益',
    description:
      '売上、原価、廃棄、人件費などをつなぎ、収益を把握する。',
  },
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
    title: '受発注・注文管理',
    description:
      '社内外に分散した注文、確認、承認、対応履歴を一つにつなげます。',
  },
  {
    number: '02',
    title: '在庫・製造管理',
    description:
      '原材料から完成品までの在庫変動と、製造計画・実績を管理します。',
  },
  {
    number: '03',
    title: '仕入・納品管理',
    description:
      '必要量の算出から仕入先への発注、検品、請求照合までを整理します。',
  },
  {
    number: '04',
    title: '販売・損益管理',
    description:
      '販売情報を在庫や原価へつなぎ、店舗別・商品別の収益を把握します。',
  },
  {
    number: '05',
    title: '多店舗・人員管理',
    description:
      '店舗ごとの状況と、販売・製造計画に応じた人員配置を横断して管理します。',
  },
  {
    number: '06',
    title: '独自業務システム',
    description:
      '独自の承認、計算、単位、帳票を含む業務フローを個別に設計します。',
  },
]

export const processSteps = [
  '相談',
  '業務確認',
  '設計・見積り',
  '開発',
  '確認・修正',
  '本番導入',
  '保守・改善',
]

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
