import { useEffect, useRef, useState } from 'react'
import styles from '../styles/components/Navbar.module.css'
import HeroCanvas from './Hero/HeroCanvas'

const PRODUCT_LINKS = [
  { label: 'Kaicards', href: '/product/kaicards' },
  { label: 'Kairef', href: '/product/kairef' },
  { label: 'Kaitree', href: '/product/kaitree' },
]

interface NavbarProps {
  isProductPage?: boolean
}

export default function Navbar({
  isProductPage = false,
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
        <div className={styles.navbarGlowLeft} />
        <div className={styles.navbarGlowRight} />
        <div className={styles.navbarOrbTop} />
        <div className={styles.navbarOrbBottom} />

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
          {!inHome && (
            <a href={homeHref} className={styles.navLink}>
              Home
            </a>
          )}
        </div>

        <div className={styles.rightActions}>
          <a href={waitlistHref} className={styles.cta}>
            Join Waitlist
          </a>
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
