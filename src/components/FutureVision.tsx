import { visionPills } from '../data/visionPills'
import useScrollAnimation from '../hooks/useScrollAnimation'
import { useTrackSection } from '../hooks/useAnalytics'
import styles from '../styles/components/FutureVision.module.css'

function Pill({
  pill,
  index,
}: {
  pill: (typeof visionPills)[number]
  index: number
}) {
  const ref = useScrollAnimation(index * 80)

  return (
    <div ref={ref} className={styles.pill}>
      <span className={styles.dot} style={{ background: pill.dotColor }} />
      {pill.label}
    </div>
  )
}

export default function FutureVision() {
  const sectionRef = useTrackSection('vision')
  const quoteRef = useScrollAnimation(200)

  return (
    <section id="vision" ref={sectionRef} className={styles.section}>
      <div className={styles.bg} />

      <div className={styles.content}>
        <span className="section-label" style={{ justifyContent: 'center' }}>
          The Future We&rsquo;re Building
        </span>

        <h2 className={styles.sectionTitle}>
          A world where opportunity flows{' '}
          <span className="gradient-text">through people.</span>
        </h2>

        <p className={styles.sectionDesc}>
          Not through institutions. Not through algorithms. Through the infinite
          potential of human networks, operating at the speed of trust.
        </p>

        <div className={styles.pills}>
          {visionPills.map((pill, i) => (
            <Pill key={pill.label} pill={pill} index={i} />
          ))}
        </div>

        <div ref={quoteRef} className={styles.quote}>
          <p className={styles.quoteText}>
            The most valuable networks aren&rsquo;t built by companies.
            They&rsquo;re built by people who choose to vouch for each other
            , and the platform that gets out of their way.
          </p>
          <p className={styles.quoteAttribution}>
            , The Kaizuna Manifesto
          </p>
        </div>
      </div>
    </section>
  )
}
