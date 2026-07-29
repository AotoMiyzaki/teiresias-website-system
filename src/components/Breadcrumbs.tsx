import { Link } from 'react-router-dom'

type BreadcrumbsProps = {
  current: string
}

export function Breadcrumbs({ current }: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label="パンくず">
      <div className="container">
        <ol>
          <li>
            <Link to="/">トップ</Link>
          </li>
          <li aria-current="page">{current}</li>
        </ol>
      </div>
    </nav>
  )
}
