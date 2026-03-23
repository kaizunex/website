import { useEffect, useState } from 'react'
import styles from '../styles/components/Navbar.module.css'

const HOME_NAV_LINKS = [
  { label: 'Nexus View', href: '#hero' },
  { label: 'Three Bridges', href: '#use-cases' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Vision', href: '#vision' },
]

const PRODUCTS_NAV_LINKS = [
  { label: 'Kaicards', href: '#kaicards' },
  { label: 'Kairef', href: '#kairef' },
  { label: 'Kaitree', href: '#kaitree' },
]

interface NavbarProps {
  isProductsPage?: boolean
}

export default function Navbar({ isProductsPage = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const links = isProductsPage ? PRODUCTS_NAV_LINKS : HOME_NAV_LINKS

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        aria-label="Primary navigation"
      >
        <a href="/" className={styles.logo}>
          <div className={styles.logoMark}>
            <div className={styles.logoMarkInner}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="10" cy="4" r="2.5" fill="#8B5CF6" />
                <circle cx="4" cy="14" r="2.5" fill="#10B981" />
                <circle cx="16" cy="14" r="2.5" fill="#8B5CF6" />
                <line x1="10" y1="4" x2="4" y2="14" stroke="#8B5CF6" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                <line x1="10" y1="4" x2="16" y2="14" stroke="#8B5CF6" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                <line x1="4" y1="14" x2="16" y2="14" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
              </svg>
            </div>
          </div>
          <span className={styles.logoText}>
            Kaizuna<span className={styles.logoAccent}>Nexus</span>
          </span>
        </a>

        <div className={styles.navLinks}>
          <a href="/" className={styles.navLink}>
            Home
          </a>
          <a href="/products" className={styles.navLink}>
            Products
          </a>
          {links.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </div>

        <a href={isProductsPage ? '/#waitlist' : '#waitlist'} className={styles.cta}>
          Connect Now →
        </a>

        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.active : ''}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-primary-nav"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        id="mobile-primary-nav"
        className={`${styles.mobileNav} ${mobileOpen ? styles.open : ''}`}
      >
        <a href="/" className={styles.mobileNavLink} onClick={closeMobile}>
          Home
        </a>
        <a href="/products" className={styles.mobileNavLink} onClick={closeMobile}>
          Products
        </a>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.mobileNavLink}
            onClick={closeMobile}
          >
            {link.label}
          </a>
        ))}
        <a
          href={isProductsPage ? '/#waitlist' : '#waitlist'}
          className={styles.mobileCta}
          onClick={closeMobile}
        >
          Connect Now →
        </a>
      </div>
    </>
  )
}
