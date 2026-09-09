import { Link } from 'react-router-dom'

export function PageCta() {
  return (
    <section className="detail-cta" aria-labelledby="detail-cta-title">
      <div className="container detail-cta__inner">
        <p className="eyebrow">CONTACT</p>
        <h2 id="detail-cta-title">
          この業務、システムにできる？ そこからご相談ください。
        </h2>
        <p>
          作りたいシステムが決まっていても、まだ課題しか見えていなくても構いません。現在の業務から、何をどうシステム化するべきかを整理します。
        </p>
        <Link className="button button--primary" to="/contact">
          業務のシステム化について相談する
        </Link>
      </div>
    </section>
  )
}
