import type { UseCase } from '../../data/useCases'
import useScrollAnimation from '../../hooks/useScrollAnimation'
import styles from '../../styles/components/UseCases.module.css'
import MiniCanvas from './MiniCanvas'
import PersonaTabs from './PersonaTabs'

const TAG_CLASS: Record<string, string> = {
  purple: styles.tagPurple,
  green: styles.tagGreen,
  blue: styles.tagBlue,
}

interface UseCaseCardProps {
  useCase: UseCase
  featured?: boolean
  delay?: number
}

export default function UseCaseCard({
  useCase,
  featured = false,
  delay = 0,
}: UseCaseCardProps) {
  const ref = useScrollAnimation(delay)
  const tagClass = TAG_CLASS[useCase.tagColor] ?? styles.tagPurple

  return (
    <div
      ref={ref}
      className={`${styles.card} ${featured ? styles.featured : ''}`}
    >
      <div>
        <span className={`${styles.tag} ${tagClass}`}>{useCase.tag}</span>
        <h3 className={styles.ucTitle}>{useCase.title}</h3>
        <p className={styles.ucDesc}>{useCase.description}</p>
        <PersonaTabs personas={useCase.personas} useCaseId={useCase.id} />
      </div>

      {featured && (
        <div className={styles.visual}>
          <MiniCanvas />
        </div>
      )}
    </div>
  )
}
