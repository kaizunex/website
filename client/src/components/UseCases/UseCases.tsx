import { scenarioCards, useCases, type ScenarioCard } from '../../data/useCases'
import { useTrackSection } from '../../hooks/useAnalytics'
import useScrollAnimation from '../../hooks/useScrollAnimation'
import styles from '../../styles/components/UseCases.module.css'
import UseCaseCard from './UseCaseCard'

const MEDIUM_CLASS: Record<ScenarioCard['medium'], string> = {
  Access: styles.mediumAccess,
  Opportunity: styles.mediumOpportunity,
  Trust: styles.mediumTrust,
}

const VISUAL_CLASS: Record<ScenarioCard['visual'], string> = {
  funding: styles.visualFunding,
  referral: styles.visualReferral,
  mentor: styles.visualMentor,
  global: styles.visualGlobal,
  creative: styles.visualCreative,
  builder: styles.visualBuilder,
}

function ScenarioScrollerCard({
  scenario,
  index,
}: {
  scenario: ScenarioCard
  index: number
}) {
  const ref = useScrollAnimation(index * 70)
  return (
    <article ref={ref} className={styles.scenarioCard}>
      <div className={`${styles.scenarioVisual} ${VISUAL_CLASS[scenario.visual]}`}>
        <svg
          className={styles.scenarioSvg}
          viewBox="0 0 320 160"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`g-${scenario.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          <line x1="72" y1="82" x2="160" y2="40" stroke={`url(#g-${scenario.id})`} strokeWidth="2" opacity="0.55" />
          <line x1="160" y1="40" x2="246" y2="84" stroke={`url(#g-${scenario.id})`} strokeWidth="2" opacity="0.55" />
          <line x1="72" y1="82" x2="160" y2="124" stroke={`url(#g-${scenario.id})`} strokeWidth="2" opacity="0.55" />
          <line x1="160" y1="124" x2="246" y2="84" stroke={`url(#g-${scenario.id})`} strokeWidth="2" opacity="0.55" />
          <circle cx="72" cy="82" r="11" fill="#8B5CF6" />
          <circle cx="160" cy="40" r="10" fill="#10B981" />
          <circle cx="246" cy="84" r="12" fill="#A78BFA" />
          <circle cx="160" cy="124" r="9" fill="#3B82F6" />
          <circle cx="160" cy="82" r="5" fill="#F8FAFC" opacity="0.8" />
        </svg>
      </div>

      <div className={styles.scenarioBody}>
        <span className={`${styles.mediumPill} ${MEDIUM_CLASS[scenario.medium]}`}>
          {scenario.medium}
        </span>
        <h4 className={styles.scenarioTitle}>{scenario.title}</h4>
        <p className={styles.scenarioSummary}>{scenario.summary}</p>
      </div>
    </article>
  )
}

export default function UseCases() {
  const sectionRef = useTrackSection('use-cases')

  return (
    <section id="use-cases" ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <span className="section-label">Real Scenarios</span>
        <h2 className={styles.sectionTitle}>
          What you can actually{' '}
          <span className="gradient-text">unlock</span>
        </h2>
        <p className={styles.sectionDesc}>
          Real use cases, real people, real outcomes. See how Kaizuna Nexus
          turns trust into tangible value across every dimension of life.
        </p>
      </div>

      <div className={styles.grid}>
        {useCases.map((uc, i) => (
          <UseCaseCard
            key={uc.id}
            useCase={uc}
            featured={!!uc.featured}
            delay={i * 100}
          />
        ))}
      </div>

      <div className={styles.scrollerWrap}>
        <div className={styles.scrollerHeader}>
          <h3 className={styles.scrollerTitle}>More scenarios in the Nexus</h3>
          <p className={styles.scrollerDesc}>
            Swipe through real-world pathways where access, opportunity, and trust
            compound into outcomes.
          </p>
        </div>

        <div
          className={styles.scroller}
          role="region"
          aria-label="Use case scenario cards"
          tabIndex={0}
        >
          {scenarioCards.map((scenario, index) => (
            <ScenarioScrollerCard
              key={scenario.id}
              scenario={scenario}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
