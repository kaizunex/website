import styles from '../../styles/components/Hero.module.css'
import HeroCanvas from './HeroCanvas'
import useCounterAnimation from '../../hooks/useCounterAnimation'
import useScrollAnimation from '../../hooks/useScrollAnimation'
import { useTrackSection, trackClick } from '../../hooks/useAnalytics'

const STATS = [
  { target: 1247, suffix: '+', label: 'Beta Users', duration: 2000 },
  { target: 3, suffix: '', label: 'Mediums Available', duration: 1200 },
  { target: 18, suffix: '', label: 'Countries Onboarding', duration: 1600 },
]

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

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Now in Private Beta — Limited Access
        </div>

        <h1 className={styles.title}>
          Where Connections Become
          <br />
          <span className="gradient-text">Opportunities</span>
        </h1>

        <p className={styles.subtitle}>
          A marketplace where people connect through trust, access, and shared
          value. You are the infrastructure.
        </p>

        <div className={styles.actions}>
          <a
            href="#waitlist"
            className={styles.btnPrimary}
            onClick={() => trackClick('hero_join_waitlist')}
          >
            Join the Waitlist
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
          <a href="#how-it-works" className={styles.btnGhost}>
            See how it works
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 3v10m0 0l4-4m-4 4L4 9"
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
      </div>
    </section>
  )
}
