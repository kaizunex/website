import { useEffect, useState } from 'react'
import styles from '../styles/components/Navbar.module.css'

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Principles', href: '#principles' },
  { label: 'Vision', href: '#vision' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

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
      >
        <a href="#" className={styles.logo}>
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
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </div>

        <a href="#waitlist" className={styles.cta}>
          Join Waitlist →
        </a>

        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.active : ''}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`${styles.mobileNav} ${mobileOpen ? styles.open : ''}`}>
        {NAV_LINKS.map((link) => (
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
          href="#waitlist"
          className={styles.mobileCta}
          onClick={closeMobile}
        >
          Join Waitlist →
        </a>
      </div>
    </>
  )
}
