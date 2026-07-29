import { Link } from 'react-router-dom'

type PageCtaProps = {
  title: string
  description: string
}

export function PageCta({ title, description }: PageCtaProps) {
  return (
    <section className="detail-cta" aria-labelledby="detail-cta-title">
      <div className="container detail-cta__inner">
        <p className="eyebrow eyebrow--light">CONTACT</p>
        <h2 id="detail-cta-title">{title}</h2>
        <p>{description}</p>
        <Link className="button button--light" to="/contact">
          開発について相談する
        </Link>
      </div>
    </section>
  )
}
