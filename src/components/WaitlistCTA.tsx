import { useState, type FormEvent } from 'react'
import { postWaitlist } from '../lib/api'
import { useTrackSection, trackClick } from '../hooks/useAnalytics'
import styles from '../styles/components/WaitlistCTA.module.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const avatars = [
  { letter: 'A', bg: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' },
  { letter: 'K', bg: 'linear-gradient(135deg, #10B981, #059669)' },
  { letter: 'R', bg: 'linear-gradient(135deg, #3B82F6, #2563EB)' },
  { letter: 'S', bg: 'linear-gradient(135deg, #F59E0B, #D97706)' },
]

export default function WaitlistCTA() {
  const sectionRef = useTrackSection('waitlist-cta')

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  function dispatchToast(message: string) {
    window.dispatchEvent(
      new CustomEvent('show-toast', { detail: message }),
    )
  }

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (!EMAIL_RE.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)
    trackClick('waitlist-request-access')

    try {
      await postWaitlist(email)
      setDone(true)
      dispatchToast("You're on the list! We'll be in touch.")
      setEmail('')
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="waitlist" ref={sectionRef} className={styles.section}>
      <div className={styles.glow} />

      <div className={styles.inner}>
        <span className="section-label" style={{ justifyContent: 'center' }}>
          Early Access
        </span>

        <p className={styles.desc}>
          Join 1,200+ people already on the waitlist. No spam, just an invite
          the moment we&rsquo;re ready for you.
        </p>

        {!done ? (
          <form className={styles.form} onSubmit={handleEmailSubmit}>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError('')
              }}
              className={`${styles.input} ${error ? styles.inputError : ''}`}
              disabled={loading}
            />
            <button
              type="submit"
              className={styles.btn}
              disabled={loading}
            >
              {loading ? 'Sending…' : 'Join Waitlist'}
            </button>
          </form>
        ) : (
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSuccess}`}
            disabled
          >
            &#10003; You&rsquo;re on the list!
          </button>
        )}

        {error && (
          <p style={{ color: 'var(--error)', fontSize: 13, marginTop: 8 }}>
            {error}
          </p>
        )}

        <p className={styles.note}>
          No spam. No noise. Just an invitation when you&rsquo;re up.
        </p>

        <div className={styles.socialProof}>
          <div className={styles.avatarStack}>
            {avatars.map((a) => (
              <div
                key={a.letter}
                className={styles.avatar}
                style={{ background: a.bg }}
              >
                {a.letter}
              </div>
            ))}
          </div>
          <p className={styles.proofText}>
            <strong>1,200+</strong> people already on the waitlist
          </p>
        </div>
      </div>
    </section>
  )
}
