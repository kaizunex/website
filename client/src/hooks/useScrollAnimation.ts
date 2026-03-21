import { useEffect, useRef } from 'react'

export default function useScrollAnimation(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => el.classList.add('visible'), delay)
          } else {
            el.classList.add('visible')
          }
          observer.unobserve(el)
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px',
      },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return ref
}
