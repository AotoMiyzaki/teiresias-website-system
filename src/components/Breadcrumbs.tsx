import { Link } from 'react-router-dom'

type BreadcrumbItem = {
  label: string
  to?: string
}

type BreadcrumbsProps =
  | { current: string; items?: undefined }
  | { items: BreadcrumbItem[]; current?: undefined }

export function Breadcrumbs(props: BreadcrumbsProps) {
  const items: BreadcrumbItem[] =
    'items' in props && props.items
      ? props.items
      : [{ label: 'トップ', to: '/' }, { label: props.current as string }]

  return (
    <nav className="breadcrumbs" aria-label="パンくず">
      <div className="container">
        <ol>
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={item.label} aria-current={isLast ? 'page' : undefined}>
                {!isLast && item.to ? (
                  <Link to={item.to}>{item.label}</Link>
                ) : (
                  item.label
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
