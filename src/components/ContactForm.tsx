import { useState, type FormEvent } from 'react'
import { postContact } from '../lib/api'
import { useTrackSection, trackClick } from '../hooks/useAnalytics'
import styles from '../styles/components/ContactForm.module.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Status = 'idle' | 'sending' | 'sent' | 'error'

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactForm() {
  const sectionRef = useTrackSection('contact')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<FormErrors>({})

  function dispatchToast(msg: string) {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: msg }))
  }

  function validate(): boolean {
    const next: FormErrors = {}
    if (!name.trim()) next.name = 'Name is required'
    if (!email.trim()) {
      next.email = 'Email is required'
    } else if (!EMAIL_RE.test(email)) {
      next.email = 'Please enter a valid email'
    }
    if (!message.trim()) next.message = 'Message is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setStatus('sending')
    trackClick('contact-send-message')

    try {
      await postContact({ name: name.trim(), email: email.trim(), message: message.trim() })
      setStatus('sent')
      dispatchToast("Message sent! We'll get back to you soon.")
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  const btnLabel =
    status === 'sending'
      ? 'Sending…'
      : status === 'sent'
        ? '✓ Message Sent!'
        : status === 'error'
          ? 'Something went wrong'
          : 'Send Message →'

  const btnClass = [
    styles.submitBtn,
    status === 'sent' ? styles.btnSuccess : '',
    status === 'error' ? styles.btnError : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section id="contact" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="section-label">Get In Touch</span>
          <h2 className={styles.sectionTitle}>
            Have something <span className={styles.highlight}>in mind?</span>
          </h2>
          <p className={styles.sectionDesc}>
            Whether it&rsquo;s a partnership, a question, or just to say hello
            , we&rsquo;d love to hear from you.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="cf-name">
                Name
              </label>
              <input
                id="cf-name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
                }}
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                disabled={status === 'sending'}
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="cf-email">
                Email
              </label>
              <input
                id="cf-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                }}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                disabled={status === 'sending'}
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="cf-message">
              Message
            </label>
            <textarea
              id="cf-message"
              placeholder="Tell us what's on your mind…"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }))
              }}
              className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
              disabled={status === 'sending'}
            />
            {errors.message && <span className={styles.errorText}>{errors.message}</span>}
          </div>

          <button
            type="submit"
            className={btnClass}
            disabled={status === 'sending' || status === 'sent'}
          >
            {btnLabel}
          </button>
        </form>
      </div>
    </section>
  )
}
