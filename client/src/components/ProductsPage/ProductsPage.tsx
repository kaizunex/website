import { motion, useReducedMotion } from 'framer-motion'
import { productDetails } from '../../data/ecosystem'
import styles from '../../styles/components/ProductsPage.module.css'

function ProductIcon({ icon }: { icon: 'credit-card' | 'briefcase' | 'network' }) {
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

function BenefitList({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className={styles.benefitList}>
      {items.map((item) => (
        <li key={item} className={styles.benefitItem}>
          <span className={`${styles.checkIcon} ${dark ? styles.checkIconDark : ''}`}>
            <svg viewBox="0 0 20 20" aria-hidden>
              <circle cx="10" cy="10" r="8.5" />
              <path d="m6.8 10 2.2 2.2 4.2-4.2" />
            </svg>
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
        <a href="/#use-cases" className={styles.backLink}>
          <span aria-hidden>←</span> Back to Overview
        </a>
        <div className={styles.heroGrid}>
          <div className={styles.heroMain}>
            <div className={styles.productIconWrap} aria-hidden>
              <ProductIcon icon={product.icon} />
            </div>
            <p className={styles.heroTag}>{product.heroTag}</p>
            <h1 className={styles.title}>{product.heroTitle}</h1>
            <p className={styles.subtitle}>{product.statement}</p>
          </div>

          <aside className={styles.factsCard} aria-label="Fast facts">
            <h2 className={styles.factsHeading}>Fast Facts</h2>
            <div className={styles.factsList}>
              {product.fastFacts.map((fact) => (
                <div key={fact.label} className={styles.factRow}>
                  <span className={styles.factLabel}>{fact.label}</span>
                  <span className={styles.factValue}>{fact.value}</span>
                </div>
              ))}
            </div>
            <a href="/#waitlist" className={styles.requestButton}>
              Request Early Access
            </a>
          </aside>
        </div>
      </motion.header>

      <motion.section className={styles.personaGrid} {...reveal(0.07)}>
        <motion.article className={styles.personaCard} {...hoverLift}>
          <div className={styles.personaIcon} aria-hidden>
            <ProductIcon icon={product.icon} />
          </div>
          <h2 className={styles.personaTitle}>{product.personas.seeker.title}</h2>
          <BenefitList items={product.personas.seeker.benefits} />
        </motion.article>

        <motion.article
          className={`${styles.personaCard} ${styles.personaCardDark}`}
          {...hoverLift}
        >
          <div className={`${styles.personaIcon} ${styles.personaIconDark}`} aria-hidden>
            <ProductIcon icon={product.icon} />
          </div>
          <h2 className={styles.personaTitle}>{product.personas.provider.title}</h2>
          <BenefitList items={product.personas.provider.benefits} dark />
        </motion.article>
      </motion.section>

      <motion.section
        className={styles.flowSection}
        aria-label="How it works"
        {...reveal(0.12)}
      >
        <h2 className={styles.flowHeading}>How it works</h2>
        <div className={styles.flowGrid}>
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
              {index < product.journeySteps.length - 1 && (
                <span className={styles.stepConnector} aria-hidden>
                  ›
                </span>
              )}
            </motion.article>
          ))}
        </div>
      </motion.section>
    </section>
  )
}
