import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navigationItems } from '../data/siteContent'

export function Header() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const navigationRef = useRef<HTMLElement>(null)
  const menuWasOpen = useRef(false)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 901px)')
    const closeOnDesktop = () => {
      if (desktop.matches) {
        menuWasOpen.current = false
        setMenuOpen(false)
      }
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

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

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const focusable = [
        menuButtonRef.current,
        ...Array.from(
          navigationRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [],
        ),
      ].filter(
        (element): element is HTMLAnchorElement | HTMLButtonElement =>
          element !== null,
      )

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('keydown', trapFocus)
    navigationRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    menuWasOpen.current = true

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('keydown', trapFocus)
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen && menuWasOpen.current) {
      menuButtonRef.current?.focus()
      menuWasOpen.current = false
    }
  }, [menuOpen])

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className="site-header__inner">
        <Link className="wordmark" to="/" aria-label="TEIRESIAS トップページ">
          <span>TEIRESIAS</span>
          <small>SYSTEM DEVELOPMENT</small>
        </Link>

        <button
          ref={menuButtonRef}
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
          ref={navigationRef}
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
              onClick={() => { menuWasOpen.current = item.path === pathname; setMenuOpen(false) }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
