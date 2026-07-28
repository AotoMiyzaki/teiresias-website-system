import { Link } from 'react-router-dom'
import { navigationItems } from '../data/siteContent'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <Link className="footer-wordmark" to="/">
            TEIRESIAS
          </Link>
          <p className="site-footer__company">TEIRESIAS合同会社</p>
          <p className="site-footer__statement">会社ごとの業務に合わせたシステム開発</p>
        </div>
        <nav className="footer-nav" aria-label="フッターナビゲーション">
          {navigationItems.map((item) => (
            <Link key={item.path} to={item.path}>
              {item.label}
            </Link>
          ))}
          <Link to="/privacy">プライバシーポリシー</Link>
        </nav>
      </div>
      <div className="container site-footer__bottom">
        <p>Copyright © TEIRESIAS LLC.</p>
      </div>
    </footer>
  )
}
