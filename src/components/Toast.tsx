import { useEffect, useState } from 'react'
import styles from '../styles/components/Toast.module.css'

export default function Toast() {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    function handleToast(e: Event) {
      const detail = (e as CustomEvent<string>).detail
      setMessage(detail)
      setVisible(true)
    }

    window.addEventListener('show-toast', handleToast)
    return () => window.removeEventListener('show-toast', handleToast)
  }, [])

  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(() => setVisible(false), 4000)
    return () => clearTimeout(timer)
  }, [visible])

  return (
    <div className={`${styles.toast} ${visible ? styles.show : ''}`}>
      <span className={styles.icon}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 6l3 3 5-5"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {message}
    </div>
  )
}
