import { useState, type FormEvent } from 'react'
import { postWaitlist, confirmWaitlist } from '../lib/api'
import useScrollAnimation from '../hooks/useScrollAnimation'
import { useTrackSection, trackClick } from '../hooks/useAnalytics'
import styles from '../styles/components/WaitlistCTA.module.css'

type Step = 'email' | 'code' | 'done'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const avatars = [
  { letter: 'A', bg: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' },
  { letter: 'K', bg: 'linear-gradient(135deg, #10B981, #059669)' },
  { letter: 'R', bg: 'linear-gradient(135deg, #3B82F6, #2563EB)' },
  { letter: 'S', bg: 'linear-gradient(135deg, #F59E0B, #D97706)' },
]

export default function WaitlistCTA() {
  const sectionRef = useTrackSection('waitlist-cta')
  const titleRef = useScrollAnimation()

  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<Step>('email')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
      const res = await postWaitlist(email)
      if (res.code) setCode(res.code)
      setStep('code')
    } catch {
      setStep('done')
      dispatchToast("You're on the list! We'll be in touch.")
    } finally {
      setLoading(false)
    }
  }

  async function handleCodeSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (code.length !== 6) {
      setError('Please enter the 6-digit code.')
      return
    }

    setLoading(true)
    trackClick('waitlist-confirm-code')

    try {
      await confirmWaitlist(email, code)
      setStep('done')
      dispatchToast("You're in! Welcome to Kaizuna.")
    } catch {
      setError('Invalid code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isDone = step === 'done'

  return (
    <section id="waitlist" ref={sectionRef} className={styles.section}>
      <div className={styles.glow} />

      <div className={styles.inner}>
        <span className="section-label" style={{ justifyContent: 'center' }}>
          Early Access
        </span>

        <p className={styles.desc}>
          Join the waitlist for early access. The future of human connection is
          being built right now &mdash; and it starts with you.
        </p>

        {step === 'email' && (
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
              {loading ? 'Sending…' : 'Request Access'}
            </button>
          </form>
        )}

        {step === 'code' && (
          <form onSubmit={handleCodeSubmit} style={{ textAlign: 'center' }}>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="000000"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.replace(/\D/g, '').slice(0, 6))
                if (error) setError('')
              }}
              className={styles.codeInput}
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              className={styles.btn}
              disabled={loading || code.length !== 6}
            >
              {loading ? 'Verifying…' : 'Confirm'}
            </button>
          </form>
        )}

        {isDone && (
          <button
            className={`${styles.btn} ${styles.btnSuccess}`}
            disabled
          >
            &#10003; You&rsquo;re in!
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
