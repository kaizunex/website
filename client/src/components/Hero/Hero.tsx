import styles from '../../styles/components/Hero.module.css'
import HeroCanvas from './HeroCanvas'
import { useTrackSection, trackClick } from '../../hooks/useAnalytics'

export default function Hero() {
  const sectionRef = useTrackSection('hero')

  return (
    <section className={styles.hero} ref={sectionRef} id="hero">
      <HeroCanvas />

      <div className={styles.glowLeft} />
      <div className={styles.glowRight} />
      <div className={styles.orbTop} />
      <div className={styles.orbBottom} />

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeIcon} aria-hidden>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor" />
            </svg>
          </span>
          <span className={styles.badgeText}>Redefining Social Connectivity</span>
        </div>
 

        <h1 className={styles.title}>
          Solving Problems through
          <br className={styles.titleBreak} />
          <span className={`${styles.titleAccent} shimmer-text`}>
            Human Connections.
          </span>
        </h1>

        <p className={styles.subtitle}>
          We use social networks to solve practical utility problems. Whether it's unlocking credit benefits, finding relationships, or
          finding a job, we accelerate your journey.
        </p>

        <div className={styles.actions}>
          <a href="#use-cases" className={styles.scrollHint} aria-label="Scroll to products section">
            <span className={styles.scrollChevron}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5 8l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className={styles.scrollLabel}>Our Products</span>
          </a>
        </div>
      </div>
    </section>
  )
}
