import { useEffect, useRef, useState } from 'react'

export default function useCounterAnimation(
  target: number,
  suffix: string,
  duration: number,
) {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(`0${suffix}`)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          observer.unobserve(el)

          const start = performance.now()

          const tick = (now: number) => {
            const elapsed = now - start
            const p = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            const current = Math.round(eased * target)
            setValue(`${current}${suffix}`)

            if (p < 1) {
              requestAnimationFrame(tick)
            }
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix, duration])

  return { ref, value }
}
