import styles from '../styles/components/ThemeToggle.module.css'

interface ThemeToggleProps {
  theme: 'light' | 'dark'
  onToggle: () => void
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isLight = theme === 'light'
  const label = isLight ? 'Switch to dark theme' : 'Switch to light theme'

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={onToggle}
      aria-label={label}
      title={label}
    >
      <span className={styles.track}>
        <span className={`${styles.thumb} ${isLight ? styles.thumbLight : styles.thumbDark}`}>
          <span className={styles.icon} aria-hidden>
            {isLight ? (
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 4.5v1.8m0 11.4v1.8M6.7 6.7 8 8m8 8 1.3 1.3M4.5 12h1.8m11.4 0h1.8M6.7 17.3 8 16m8-8 1.3-1.3M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M20.5 14.4a8.6 8.6 0 1 1-10.9-10.9 7.2 7.2 0 1 0 10.9 10.9Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        </span>
      </span>
    </button>
  )
}
