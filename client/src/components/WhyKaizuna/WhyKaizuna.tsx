import useScrollAnimation from '../../hooks/useScrollAnimation'
import { useTrackSection } from '../../hooks/useAnalytics'
import styles from '../../styles/components/WhyKaizuna.module.css'
import WhyCanvas from './WhyCanvas'

export default function WhyKaizuna() {
  const sectionRef = useTrackSection('why-kaizuna')

  return (
    <section id="why-kaizuna" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div>
            <span className="section-label">Why Kaizuna</span>
            <h2 className={styles.sectionTitle}>
              The layer that was{' '}
              <span className={styles.highlight}>always missing.</span>
            </h2>
            <p className={styles.sectionDesc}>
              Kaizuna isn&rsquo;t just another platform&mdash;it&rsquo;s the
              infrastructure for modern community trust.
            </p>
            <p className={styles.quote}>
              A world where opportunity flows through people. Not through
              institutions. Not through algorithms. Through the infinite
              potential of human networks, operating at the speed of trust.
            </p>
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
