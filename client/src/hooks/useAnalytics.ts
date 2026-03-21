import { useEffect, useRef } from 'react'
import { trackEvent } from '../lib/api'

export function useTrackSection(sectionName: string) {
  const ref = useRef<HTMLDivElement>(null)
  const fired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true
          trackEvent('section_view', { section: sectionName })
          observer.unobserve(el)
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [sectionName])

  return ref
}

export function trackClick(label: string) {
  trackEvent('cta_click', { label })
}
