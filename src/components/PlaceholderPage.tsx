import { Link } from 'react-router-dom'
import type { PlaceholderContent } from '../data/siteContent'
import { PageMeta } from './PageMeta'

type PlaceholderPageProps = {
  content: PlaceholderContent
}

export function PlaceholderPage({ content }: PlaceholderPageProps) {
  return (
    <>
      <PageMeta
        title={`${content.title} | TEIRESIAS合同会社`}
        description={content.description}
      />
      <main id="main-content" className="placeholder-main" tabIndex={-1}>
        <section className="placeholder-hero">
          <div className="container placeholder-hero__inner">
            <p className="eyebrow">{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p className="placeholder-hero__description">{content.description}</p>
          </div>
        </section>
        <section className="placeholder-content">
          <div className="container placeholder-content__inner">
            <p className="placeholder-content__status">
              現在、このページの詳細を準備しています。
            </p>
            <div className="placeholder-content__actions">
              <Link className="text-link" to="/">
                トップページへ戻る
              </Link>
              <Link className="button button--dark" to="/contact">
                開発について相談する
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
