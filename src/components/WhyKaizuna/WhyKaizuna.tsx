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
              Kaizuna isn&rsquo;t just another platform, it&rsquo;s the
              infrastructure for modern community trust.
            </p>
            <p className={styles.quote}>
              Opportunity shouldn&rsquo;t depend on cold algorithms or
              gatekeepers. Kaizuna builds the infrastructure where value flows
              through people, making every connection faster, safer, and more
              meaningful.
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
