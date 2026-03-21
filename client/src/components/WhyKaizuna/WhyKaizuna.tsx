import { whyItems } from '../../data/whyItems'
import useScrollAnimation from '../../hooks/useScrollAnimation'
import { useTrackSection } from '../../hooks/useAnalytics'
import styles from '../../styles/components/WhyKaizuna.module.css'
import WhyCanvas from './WhyCanvas'

function WhyItem({
  item,
  index,
}: {
  item: (typeof whyItems)[number]
  index: number
}) {
  const ref = useScrollAnimation(index * 100)

  return (
    <div ref={ref} className={styles.item}>
      <div className={styles.check}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div>
        <div className={styles.itemTitle}>{item.title}</div>
        <p className={styles.itemDesc}>{item.description}</p>
      </div>
    </div>
  )
}

export default function WhyKaizuna() {
  const sectionRef = useTrackSection('why-kaizuna')

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div>
            <span className="section-label">Why Kaizuna Nexus</span>
            <h2 className={styles.sectionTitle}>
              The layer that was{' '}
              <span className={styles.highlight}>always missing.</span>
            </h2>
            <p className={styles.sectionDesc}>
              LinkedIn optimizes for visibility. Banks optimize for risk.
              Marketplaces optimize for transactions. Nobody built for the spaces
              in between &mdash; until now.
            </p>

            <div className={styles.list}>
              {whyItems.map((item, i) => (
                <WhyItem key={item.title} item={item} index={i} />
              ))}
            </div>
          </div>

          <div className={styles.visual}>
            <div className={styles.canvas}>
              <WhyCanvas />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
