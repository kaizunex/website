import { principles } from '../data/principles'
import useScrollAnimation from '../hooks/useScrollAnimation'
import { useTrackSection } from '../hooks/useAnalytics'
import styles from '../styles/components/Principles.module.css'

const iconColorMap: Record<string, string> = {
  'rgba(139, 92, 246, 0.1)': styles.iconPurple,
  'rgba(16, 185, 129, 0.1)': styles.iconGreen,
  'rgba(59, 130, 246, 0.1)': styles.iconBlue,
}

function PrincipleCard({
  principle,
  index,
}: {
  principle: (typeof principles)[number]
  index: number
}) {
  const ref = useScrollAnimation(index * 150)
  const colorClass = iconColorMap[principle.iconBg] ?? ''

  return (
    <div ref={ref} className={styles.card}>
      <div className={`${styles.iconWrap} ${colorClass}`}>
        <span dangerouslySetInnerHTML={{ __html: principle.svgMarkup }} />
      </div>
      <h3 className={styles.name}>{principle.name}</h3>
      <p className={styles.desc}>{principle.description}</p>
      <div className={styles.footer} style={{ color: principle.footerColor }}>
        {principle.footerText}
      </div>
    </div>
  )
}

export default function Principles() {
  const sectionRef = useTrackSection('principles')

  return (
    <section id="principles" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="section-label">Core Principles</span>
          <h2 className={styles.sectionTitle}>
            Built different, <span className={styles.highlight}>on purpose.</span>
          </h2>
          <p className={styles.sectionDesc}>
            Three non-negotiables that govern every interaction on the platform.
            Not marketing. Not policy. Architecture.
          </p>
        </div>

        <div className={styles.grid}>
          {principles.map((p, i) => (
            <PrincipleCard key={p.name} principle={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
