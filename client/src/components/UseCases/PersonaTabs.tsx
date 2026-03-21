import { useState } from 'react'
import type { Persona } from '../../data/useCases'
import styles from '../../styles/components/UseCases.module.css'

const COLOR_CLASS_MAP: Record<string, string> = {
  '#A78BFA': styles.activePurple,
  '#34D399': styles.activeGreen,
  '#93C5FD': styles.activeBlue,
  '#FBBF24': styles.activeYellow,
  '#F472B6': styles.activePink,
}

function getActiveClass(bulletColor: string): string {
  return COLOR_CLASS_MAP[bulletColor] ?? styles.activePurple
}

interface PersonaTabsProps {
  personas: Persona[]
  useCaseId: string
}

export default function PersonaTabs({ personas, useCaseId }: PersonaTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = personas[activeIndex]

  return (
    <div className={styles.personaBenefits}>
      <div className={styles.personaTabs}>
        {personas.map((p, i) => {
          const isActive = i === activeIndex
          const tabClass = isActive
            ? `${styles.personaTab} ${styles.activeTab} ${getActiveClass(p.bulletColor)}`
            : styles.personaTab

          return (
            <button
              key={`${useCaseId}-${p.id}`}
              className={tabClass}
              onClick={() => setActiveIndex(i)}
              type="button"
            >
              <span
                className={styles.tabDot}
                style={{ backgroundColor: p.bulletColor }}
              />
              {p.label}
            </button>
          )
        })}
      </div>

      <div className={styles.panel} key={`${useCaseId}-panel-${active.id}`}>
        <div className={styles.personaHeader}>
          <div className={styles.personaAvatar}>{active.emoji}</div>
          <div>
            <div className={styles.personaName}>{active.name}</div>
            <div className={styles.personaRole}>{active.subtitle}</div>
          </div>
        </div>

        <ul className={styles.benefitList}>
          {active.benefits.map((b, i) => (
            <li key={i} className={styles.benefitItem}>
              <span
                className={styles.benefitBullet}
                style={{
                  backgroundColor: `${active.bulletColor}18`,
                }}
              >
                <svg
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke={active.bulletColor}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 5l2.5 2.5L8 3" />
                </svg>
              </span>
              <span>{b.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
