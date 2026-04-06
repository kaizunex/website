import { howItWorksSteps } from '../data/howItWorks'
import useScrollAnimation from '../hooks/useScrollAnimation'
import { useTrackSection } from '../hooks/useAnalytics'
import styles from '../styles/components/HowItWorks.module.css'

function Card({
  step,
  index,
}: {
  step: (typeof howItWorksSteps)[number]
  index: number
}) {
  const ref = useScrollAnimation(index * 100)

  const iconColorClass =
    step.iconColor === 'purple'
      ? styles.iconPurple
      : step.iconColor === 'green'
        ? styles.iconGreen
        : styles.iconBlue

  return (
    <div ref={ref} className={styles.card}>
      <div className={styles.number}>{step.number}</div>
      <div className={`${styles.icon} ${iconColorClass}`}>
        <span dangerouslySetInnerHTML={{ __html: step.svgPath }} />
      </div>
      <h3 className={styles.title}>{step.title}</h3>
      <p className={styles.desc}>{step.description}</p>
      {index < howItWorksSteps.length - 1 && (
        <div className={styles.connector} />
      )}
    </div>
  )
}

export default function HowItWorks() {
  const sectionRef = useTrackSection('how-it-works')

  return (
    <section id="how-it-works" ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <span className="section-label">The Model</span>
        <h2 className={styles.sectionTitle}>
          People don&rsquo;t just connect.{' '}
          <span className="gradient-text">
            They connect through something.
          </span>
        </h2>
        <p className={styles.sectionDesc}>
          Kaizuna turns relationships into mediums - channels through
          which access, opportunity, and trust actually flow.
        </p>
      </div>

      <div className={styles.flow}>
        {howItWorksSteps.map((step, i) => (
          <Card key={step.number} step={step} index={i} />
        ))}
      </div>
    </section>
  )
}
