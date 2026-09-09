import { Link } from 'react-router-dom'
import { PageMeta } from '../components/PageMeta'

export function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="ページが見つかりません | TEIRESIAS合同会社"
        description="お探しのページは見つかりませんでした。"
      />
      <main id="main-content" className="not-found" tabIndex={-1}>
        <div className="container not-found__inner">
          <p className="not-found__code">404</p>
          <p className="eyebrow">PAGE NOT FOUND</p>
          <h1>ページが見つかりません。</h1>
          <p>
            URLが変更されたか、ページが削除された可能性があります。
          </p>
          <Link className="button button--primary" to="/">
            トップページへ戻る
          </Link>
        </div>
      </main>
    </>
  )
}
