import { Link } from 'react-router-dom'

export function PageCta() {
  return (
    <section className="detail-cta" aria-labelledby="detail-cta-title">
      <div className="container detail-cta__inner">
        <p className="eyebrow">CONTACT</p>
        <h2 id="detail-cta-title">
          標準サービスでは対応できなかった業務について、ご相談ください。
        </h2>
        <p>
          紙、FAX、Excel、既存サービスに分散している業務を確認し、会社に合った形へ整理・設計します。
        </p>
        <Link className="button button--primary" to="/contact">
          開発について相談する
        </Link>
      </div>
    </section>
  )
}
