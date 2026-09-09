export type NavigationItem = {
  label: string
  path: string
}

export const navigationItems: NavigationItem[] = [
  { label: '事業内容', path: '/services' },
  { label: '開発方針', path: '/approach' },
  { label: '開発事例', path: '/cases' },
  { label: '開発の流れ', path: '/process' },
  { label: '会社情報', path: '/company' },
  { label: 'お問い合わせ', path: '/contact' },
]

export const codeColumns = [
  [
    'type Approval = "pending" | "approved";',
    'const branch = workflow.current;',
    'return validate(request);',
  ],
  [
    'SELECT store_id, status',
    'FROM purchase_orders',
    'WHERE approved_at IS NULL;',
  ],
  [
    '{ "store": 13,',
    '  "permission": "manager",',
    '  "status": "review" }',
  ],
  [
    'function reconcile(stock: Stock) {',
    '  return stock.actual - stock.expected;',
    '}',
  ],
  [
    'interface DailyReport {',
    '  storeId: string;',
    '  submittedAt: Date;',
    '}',
  ],
  [
    'const routes = departments.map(',
    '  (unit) => plan(unit.rules)',
    ');',
  ],
  [
    'UPDATE requests',
    "SET state = 'approved'",
    'WHERE reviewer_id = $1;',
  ],
  [
    'export const ledger = {',
    '  closingDay: 25,',
    '  format: "monthly"',
    '};',
  ],
]
