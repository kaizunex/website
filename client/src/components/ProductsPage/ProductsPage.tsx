import { motion, useReducedMotion } from 'framer-motion'
import { productDetails } from '../../data/ecosystem'
import { useTrackSection, trackClick } from '../../hooks/useAnalytics'
import styles from '../../styles/components/ProductsPage.module.css'
import flipkart from '../../assets/logos/flipkart.png'
import myntra from '../../assets/logos/myntra.png'
import cleartrip from '../../assets/logos/cleartrip.png'
import bms from '../../assets/logos/bms.png'
import ajio from '../../assets/logos/ajio.png'
import paytm from '../../assets/logos/paytm.png'
import linkedin from '../../assets/logos/linkedin.png'
import naukri from '../../assets/logos/naukri.png'
import iimjobs from '../../assets/logos/iimjobs.png'
import instahyre from '../../assets/logos/instahyre.png';
import workday from '../../assets/logos/workday.png';
import referrer from '../../assets/images/referrer.png';
import jobseeker from '../../assets/images/jobseeker.png';
import cardholder from '../../assets/images/cardholder.png';
import discountseeker from '../../assets/images/discountseeker.png';
import connector from '../../assets/images/connector.png';
import bridge from '../../assets/images/bridge.png';

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: {
    duration: 0.4,
    ease: [0.23, 1, 0.32, 1] as const,
    delay,
  },
})

const hoverLift = {
  whileHover: { y: -4 },
  transition: {
    duration: 0.2,
    ease: [0.23, 1, 0.32, 1] as const,
  },
}

function ProductIcon({
  icon,
}: {
  icon:
    | 'credit-card'
    | 'briefcase'
    | 'network'
    | 'wallet-user'
    | 'card-holder'
    | 'job-candidate'
    | 'team-referrer'
    | 'community-connector'
    | 'trust-bridge'
}) {
  if (icon === 'wallet-user') {
    return (
      <img
        src={discountseeker}
        alt="Discount Seeker"
        style={{
          borderRadius: '10px'
        }}
      />
    )
  }

  if (icon === 'card-holder') {
    return (
      <img
        src={cardholder}
        alt="Card Holder"
        style={{
          borderRadius: '10px'
        }}
      />
    )
  }

  if (icon === 'job-candidate') {
    return (
      <img
        src={jobseeker}
        alt="Job Seeker"
        style={{
          borderRadius: '10px'
        }}
      />
    )
  }

  if (icon === 'team-referrer') {
    return (
      <img
        src={referrer}
        alt="Team Referrer"
        style={{
          borderRadius: '10px'
        }}
      />
    )
  }

  if (icon === 'community-connector') {
    return (
      <img
        src={connector}
        alt="Community Connector"
        style={{
          borderRadius: '10px'
        }}
      />
    )
  }

  if (icon === 'trust-bridge') {
    return (
      <img
        src={bridge}
        alt="Trust Bridge"
        style={{
          borderRadius: '10px'
        }}
      />
    )
  }

  if (icon === 'credit-card') {
    return (
      <svg viewBox="0 0 24 24" className={styles.productIconSvg} aria-hidden>
        <rect x="3" y="6" width="18" height="12" rx="2.5" />
        <path d="M3 10h18" />
      </svg>
    )
  }

  if (icon === 'briefcase') {
    return (
      <svg viewBox="0 0 24 24" className={styles.productIconSvg} aria-hidden>
        <rect x="3" y="7" width="18" height="12" rx="2.5" />
        <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        <path d="M3 12h18" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className={styles.productIconSvg} aria-hidden>
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="17" r="2.5" />
      <circle cx="19" cy="17" r="2.5" />
      <path d="M10.4 6.8 6.5 14.6M13.6 6.8l3.9 7.8M7.5 17h9" />
    </svg>
  )
}

function PlatformIcon({ platform }: { platform: string }) {
  const normalized = platform.trim().toLowerCase()
  const logoMap: Record<string, string> = {
    flipkart,
    myntra,
    cleartrip,
    ajio,
    paytm,
    linkedin,
    naukri,
    iimjobs,
    instahyre,
    workday,
    bms,
    bookmyshow: bms,
  }

  const logoSrc = logoMap[normalized]

  return (
    <div className={styles.platformIcon}>
      {logoSrc ? (
        <img
          src={logoSrc}
          alt={`${platform} logo`}
          className={styles.platformLogo}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="10" fill="#ccc" />
        </svg>
      )}
    </div>
  )
}

function PlatformsSection({ platforms }: { platforms: { name: string; icon: string }[] }) {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.section className={styles.platformsSection} {...reveal(0.15)}>
      <h2 className={styles.platformsHeading}>Platforms Supported</h2>
      <div className={styles.platformsGrid}>
        {platforms.map((platform, index) => (
          <motion.div
            key={platform.name}
            className={styles.platformCard}
            {...(shouldReduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.2 },
                  transition: {
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1] as const,
                    delay: index * 0.1,
                  },
                })}
          >
            <PlatformIcon platform={platform.icon} />
            <span>{platform.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

function getBenefitIcon(benefitText: string) {
  const text = benefitText.toLowerCase()
  
  // Kaicards - Discount Seeker Benefits
  if (text.includes('access 20%+ discounts') || text.includes('discounts without owning')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="currentColor"/>
      </svg>
    )
  }
  
  if (text.includes('no credit inquiry') || text.includes('no annual fees')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9zm4.5-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="currentColor"/>
      </svg>
    )
  }
  
  if (text.includes('kaizuna escrow') || text.includes('escrow protection')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="currentColor"/>
      </svg>
    )
  }
  
  if (text.includes('seamless checkout')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
      </svg>
    )
  }
  
  // Kaicards - Card Holder Benefits  
  if (text.includes('spending milestones') || text.includes('hit high-tier')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="currentColor"/>
      </svg>
    )
  }
  
  if (text.includes('reward points') || text.includes("other people's purchases")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
      </svg>
    )
  }
  
  if (text.includes('card active status') || text.includes('without personal spending')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
      </svg>
    )
  }
  
  if (text.includes('compliant and secure')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill="currentColor"/>
      </svg>
    )
  }
  
  // Kairef - Candidate Benefits
  if (text.includes('linkedin inbox') || text.includes('black hole')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm8 13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0-2c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" fill="currentColor"/>
      </svg>
    )
  }
  
  if (text.includes('immediate feedback') || text.includes('if you qualify')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="currentColor"/>
      </svg>
    )
  }
  
  if (text.includes('direct line') || text.includes('high-intent referrers')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" fill="currentColor"/>
      </svg>
    )
  }
  
  if (text.includes('track referral status') || text.includes('real-time')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor"/>
      </svg>
    )
  }
  
  // Kairef - Referrer Benefits
  if (text.includes('save hours') || text.includes('manual resume')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" fill="currentColor"/>
      </svg>
    )
  }
  
  if (text.includes('linkedin spam') || text.includes('zero spam')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14L12 11.5 7.5 16l-1.41-1.41L12 8.67l5.91 5.92L16.5 16z" fill="currentColor"/>
      </svg>
    )
  }
  
  if (text.includes('company referral bonuses') || text.includes('earn bonuses')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1.81.45 1.61 1.67 1.61 1.16 0 1.6-.64 1.6-1.46 0-.84-.68-1.22-1.88-1.54-1.76-.46-3.44-1.15-3.44-3.27 0-1.61 1.19-2.73 2.84-3.03V4.09h2.67v2.46c1.52.4 2.66 1.46 2.76 3.02h-1.96c-.05-.64-.42-1.44-1.53-1.44-1.03 0-1.49.56-1.49 1.28 0 .73.59 1.1 1.78 1.41 1.78.47 3.54 1.13 3.54 3.38 0 1.78-1.19 2.9-2.95 3.2z" fill="currentColor"/>
      </svg>
    )
  }
  
  if (text.includes('team grow') || text.includes('higher-quality hires')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.001 3.001 0 0017.07 7h-4.14c-.93 0-1.76.57-2.1 1.42L8.5 16H11v6h9zm-8.5-9.5L7.5 8H8c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1s.45 1 1 1h.5l2.5 2.5L6 16H4v2h4l4-4.5z" fill="currentColor"/>
      </svg>
    )
  }
  
  // Kaitree - Connector Benefits
  if (text.includes('verified paths') || text.includes('high-value individuals')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z" fill="currentColor"/>
      </svg>
    )
  }
  
  if (text.includes('stranger danger') || text.includes('reduce danger')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" fill="currentColor"/>
      </svg>
    )
  }
  
  if (text.includes('matrimonial matches') || text.includes('trusted social circles')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
      </svg>
    )
  }
  
  if (text.includes('community roots') || text.includes('heritage')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" fill="currentColor"/>
      </svg>
    )
  }
  
  // Kaitree - Bridge Benefits
  if (text.includes('strengthen community ties') || text.includes('trusted link')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/>
      </svg>
    )
  }
  
  if (text.includes('control who can see') || text.includes('privacy')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="currentColor"/>
      </svg>
    )
  }
  
  if (text.includes('trust points') || text.includes('successful introductions')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="currentColor"/>
      </svg>
    )
  }
  
  if (text.includes('family and friends') || text.includes('life-changing opportunities')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M16.5 12c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5s1.57 3.5 3.5 3.5zm-9 0c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zm9 2c-2.33 0-7 1.17-7 3.5V19h14v-1.5c0-2.33-4.67-3.5-7-3.5zm-9 0c-2.33 0-7 1.17-7 3.5V19h14v-1.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/>
      </svg>
    )
  }
  
  // Default check icon for any unmatched benefits
  return (
    <svg viewBox="0 0 20 20" aria-hidden>
      <circle cx="10" cy="10" r="8.5" />
      <path d="m6.8 10 2.2 2.2 4.2-4.2" />
    </svg>
  )
}

function BenefitList({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className={styles.benefitList}>
      {items.map((item) => (
        <li key={item} className={styles.benefitItem}>
          <span className={`${styles.benefitIcon} ${dark ? styles.benefitIconDark : ''}`}>
            {getBenefitIcon(item)}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

interface ProductsPageProps {
  productId: string | null
}

export default function ProductsPage({ productId }: ProductsPageProps) {
  const reduceMotion = useReducedMotion()
  const product = productDetails.find((item) => item.id === productId)

  if (!product) {
    return (
      <section className={styles.page}>
        <div className={styles.fallback}>
          <h1>Product not found</h1>
          <p>Please go back to the home page and choose a product again.</p>
          <a href="/#use-cases" className={styles.fallbackBtn}>
            Back to home
          </a>
        </div>
      </section>
    )
  }

  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: {
            duration: 0.45,
            ease: [0.23, 1, 0.32, 1] as const,
            delay,
          },
        }

  const hoverLift = reduceMotion
    ? {}
    : {
        whileHover: {
          y: -4,
          transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] as const },
        },
      }

  return (
    <section className={styles.page}>
      <motion.header
        className={`${styles.hero} ${styles[product.accent]}`}
        {...reveal(0)}
      >
        <div className={styles.heroGrid}>
          <div className={styles.heroMain}>
            <div className={styles.productIconWrap} aria-hidden>
              <div className={styles.iconContainer}>
                <ProductIcon icon={product.icon} />
              </div>
              <div className={styles.titleContainer}>
                <h1 className={styles.title}>{product.name}</h1>
                <p className={styles.heroTag}>{product.heroTag}</p>
              </div>
            </div>
          </div>
          <p className={styles.subtitle}>{product.statement}</p>
        </div>
      </motion.header>

      {product.platforms && (
        <PlatformsSection platforms={product.platforms} />
      )}

      <motion.section className={styles.personaGrid} {...reveal(0.07)}>
        <motion.article className={styles.personaCard} {...hoverLift}>
          <div className={styles.personaHeader} aria-hidden>
            <div className={styles.personaIcon}>
              <ProductIcon icon={product.personas.seeker.icon} />
            </div>
            <h2 className={styles.personaTitle}>{product.personas.seeker.title}</h2>
          </div>
          <BenefitList items={product.personas.seeker.benefits} />
        </motion.article>

        <motion.article
          className={`${styles.personaCard} ${styles.personaCardDark}`}
          {...hoverLift}
        >
          <div className={`${styles.personaHeader} ${styles.personaHeaderDark}`} aria-hidden>
            <div className={`${styles.personaIcon} ${styles.personaIconDark}`}>
              <ProductIcon icon={product.personas.provider.icon} />
            </div>
            <h2 className={styles.personaTitle}>{product.personas.provider.title}</h2>
          </div>
          <BenefitList items={product.personas.provider.benefits} dark />
        </motion.article>
      </motion.section>

      <motion.section
        className={`${styles.flowSection} ${styles[product.accent]}`}
        aria-label="How it works"
        {...reveal(0.12)}
      >
        <h2 className={styles.flowHeading}>How it works</h2>
        <div className={styles.flowGrid} style={{ gridTemplateColumns: `repeat(${product.journeySteps.length}, 1fr)` }}>
          {product.journeySteps.map((step, index) => (
            <motion.article
              key={step.number}
              className={styles.stepCard}
              {...(reduceMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 18 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, amount: 0.2 },
                    transition: {
                      duration: 0.4,
                      ease: [0.23, 1, 0.32, 1] as const,
                      delay: index * 0.04,
                    },
                    whileHover: {
                      y: -4,
                      transition: {
                        duration: 0.2,
                        ease: [0.23, 1, 0.32, 1] as const,
                      },
                    },
                  })}
            >
              <span className={styles.stepNumber}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </section>
  )
}
