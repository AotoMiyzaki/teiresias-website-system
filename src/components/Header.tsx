import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navigationItems } from '../data/siteContent'

export function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 48)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  const darkHeader = isHome && !scrolled && !menuOpen

  return (
    <header className={`site-header${darkHeader ? ' site-header--dark' : ''}`}>
      <div className="site-header__inner">
        <Link className="wordmark" to="/" aria-label="TEIRESIAS トップページ">
          <span>TEIRESIAS</span>
          <small>SYSTEM DEVELOPMENT</small>
        </Link>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={`primary-nav${menuOpen ? ' primary-nav--open' : ''}`}
          aria-label="メインナビゲーション"
        >
          {navigationItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `${item.path === '/contact' ? 'nav-contact' : ''}${isActive ? ' is-active' : ''}`
              }
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
