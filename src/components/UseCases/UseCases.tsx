import { pillarSummaries } from '../../data/ecosystem'
import { useTrackSection } from '../../hooks/useAnalytics'
import useScrollAnimation from '../../hooks/useScrollAnimation'
import styles from '../../styles/components/UseCases.module.css'

const GLOW_CLASS = {
  purple: styles.glowPurple,
  cyan: styles.glowCyan,
  emerald: styles.glowEmerald,
}

const LINK_ACCENT_CLASS = {
  kaicards: styles.linkKaicards,
  kairef: styles.linkKairef,
  kaitree: styles.linkKaitree,
}

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof pillarSummaries)[number]
  index: number
}) {
  const ref = useScrollAnimation(index * 70)

  return (
    <article ref={ref} className={`${styles.pillarCard} scroll-fade`}>
      <div className={`${styles.cardGlow} ${GLOW_CLASS[pillar.glow]}`} />
      <div className={styles.cardContainer}>
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <div className={styles.titleContainer}>
              <h3 className={styles.cardTitle}>{pillar.name}</h3>
              <p className={styles.vertical}>{pillar.vertical}</p>
            </div>
          </div>
          <p className={styles.bridgeLine}>{pillar.bridgeLine}</p>
          <p className={styles.oneLiner}>{pillar.oneLiner}</p>

          <ul className={styles.outcomeList}>
            {pillar.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </div>
        <div className={styles.cardFooter}>
          <a
            href={`/product/${pillar.id}`}
            className={styles.textLink}
          >
            View Details
          </a>
          <a href="#waitlist" className={styles.connectLink}>
            Join Waitlist
          </a>
        </div>
      </div>
    </article>
  )
}

export default function UseCases() {
  const sectionRef = useTrackSection('use-cases')

  return (
    <section id="use-cases" ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <span className="section-label">Three Pillars</span>
        <h2 className={styles.sectionTitle}>Our Ecosystem</h2>
        <p className={styles.sectionDesc}>
          We&rsquo;re starting with three pillars designed to solve fundamental
          daily friction points.
        </p>
      </div>

      <div className={styles.pillarGrid}>
        {pillarSummaries.map((pillar, index) => (
          <PillarCard key={pillar.id} pillar={pillar} index={index} />
        ))}
      </div>
    </section>
  )
}
