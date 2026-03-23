import styles from '../../styles/components/Hero.module.css'
import HeroCanvas from './HeroCanvas'
import useCounterAnimation from '../../hooks/useCounterAnimation'
import useScrollAnimation from '../../hooks/useScrollAnimation'
import { useTrackSection, trackClick } from '../../hooks/useAnalytics'
import { nexusStats } from '../../data/ecosystem'

const STATS = nexusStats.map((stat) => ({
  target: Number(stat.value),
  suffix: '',
  label: stat.label,
  duration: 1200,
}))

function StatItem({ target, suffix, label, duration }: (typeof STATS)[number]) {
  const { ref, value } = useCounterAnimation(target, suffix, duration)
  return (
    <div className={styles.stat} ref={ref}>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  )
}

export default function Hero() {
  const sectionRef = useTrackSection('hero')
  const statsRef = useScrollAnimation(200)

  return (
    <section className={styles.hero} ref={sectionRef} id="hero">
      <HeroCanvas />

      <div className={styles.glowLeft} />
      <div className={styles.glowRight} />
      <div className={styles.orbTop} />
      <div className={styles.orbBottom} />

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Nexus in Private Beta
        </div>

        <h1 className={styles.title}>
          One Nexus. Three Bridges.
          <br className={styles.titleBreak} />
          <span className={`${styles.titleAccent} shimmer-text`}>
            Infinite Connections
          </span>
        </h1>

        <p className={styles.subtitle}>
          KaizunaNexus is the central hub for your financial, professional, and
          ancestral capital. We remove middlemen to build direct, high-trust
          bridges.
        </p>

        <div className={styles.actions}>
          <a
            href="#waitlist"
            className={styles.btnPrimary}
            onClick={() => trackClick('hero_connect_now')}
          >
            Connect Now
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10m0 0L9 4m4 4L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="/products" className={styles.btnGhost}>
            Explore Products
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10m0 0L9 4m4 4L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className={`${styles.stats} scroll-fade`} ref={statsRef}>
          {STATS.map((s) => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>

        <a href="#use-cases" className={styles.scrollHint} aria-label="Scroll to three bridges section">
          <span className={styles.mouseShell}>
            <span className={styles.mouseWheel} />
          </span>
          <span className={styles.scrollLabel}>Three Bridges</span>
        </a>
      </div>
    </section>
  )
}
