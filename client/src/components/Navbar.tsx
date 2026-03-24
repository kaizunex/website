import { useEffect, useRef, useState } from 'react'
import styles from '../styles/components/Navbar.module.css'
import ThemeToggle from './ThemeToggle'

const PRODUCT_LINKS = [
  { label: 'Kaicards', href: '/product/kaicards' },
  { label: 'Kairef', href: '/product/kairef' },
  { label: 'Kaitree', href: '/product/kaitree' },
]

interface NavbarProps {
  isProductPage?: boolean
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export default function Navbar({
  isProductPage = false,
  theme,
  onToggleTheme,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const productsMenuRef = useRef<HTMLDivElement | null>(null)

  const inHome = !isProductPage
  const homeHref = inHome ? '#hero' : '/#hero'
  const whyHref = inHome ? '#why-kaizuna' : '/#why-kaizuna'
  const ecosystemHref = inHome ? '#use-cases' : '/#use-cases'
  const contactHref = inHome ? '#contact' : '/#contact'
  const waitlistHref = inHome ? '#waitlist' : '/#waitlist'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (
        productsMenuRef.current &&
        !productsMenuRef.current.contains(event.target as Node)
      ) {
        setProductsOpen(false)
      }
    }

    window.addEventListener('click', onClickOutside)
    return () => window.removeEventListener('click', onClickOutside)
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
          <span className={styles.logoText}>Kaizuna</span>
        </a>

        <div className={styles.navLinks}>
          <a href={homeHref} className={styles.navLink}>
            Home
          </a>
          <a href={whyHref} className={styles.navLink}>
            Why Kaizuna
          </a>
          <div className={styles.productsMenu} ref={productsMenuRef}>
            <a href={ecosystemHref} className={styles.navLink}>
              Our Ecosystem / Products
            </a>
            <button
              type="button"
              className={styles.dropdownTrigger}
              onClick={() => setProductsOpen((open) => !open)}
              aria-expanded={productsOpen}
              aria-controls="products-dropdown"
              aria-label="Open product links"
            >
              <span className={`${styles.chevron} ${productsOpen ? styles.chevronOpen : ''}`}>
                ▾
              </span>
            </button>
            <div
              id="products-dropdown"
              className={`${styles.dropdown} ${productsOpen ? styles.dropdownOpen : ''}`}
            >
              {PRODUCT_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={styles.dropdownLink}
                  onClick={() => setProductsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <a href={contactHref} className={styles.navLink}>
            Get in touch
          </a>
        </div>

        <div className={styles.rightActions}>
          <a href={waitlistHref} className={styles.cta}>
            Join Waitlist
          </a>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>

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
        <a href={homeHref} className={styles.mobileNavLink} onClick={closeMobile}>
          Home
        </a>
        <a href={whyHref} className={styles.mobileNavLink} onClick={closeMobile}>
          Why Kaizuna
        </a>
        <a href={ecosystemHref} className={styles.mobileNavLink} onClick={closeMobile}>
          Our Ecosystem / Products
        </a>
        <div className={styles.mobileSubhead}>Product Pages</div>
        {PRODUCT_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.mobileNavLink}
            onClick={closeMobile}
          >
            {link.label}
          </a>
        ))}
        <a href={waitlistHref} className={styles.mobileCta} onClick={closeMobile}>
          Join Waitlist
        </a>
        <a href={contactHref} className={styles.mobileCta} onClick={closeMobile}>
          Get in touch →
        </a>
      </div>
    </>
  )
}
