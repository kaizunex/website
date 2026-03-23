import { useEffect, useRef } from 'react'

const NODE_COUNT = 55
const MAX_DIST = 140
const EDGE_ALPHA_MULT = 0.25
const MOUSE_RADIUS = 80
const MOUSE_FORCE = 0.15
const SPEED_CAP = 1.5
const COLORS = ['#8B5CF6', '#10B981', '#A78BFA']
const MAX_DPR = 1.6

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  color: string
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let nodes: Node[] = []
    let rafId: number

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      w = rect.width
      h = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const initNodes = () => {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        r: 2 + Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
    }

    const ro = new ResizeObserver(() => {
      resize()
      if (nodes.length === 0) initNodes()
    })
    ro.observe(canvas.parentElement!)

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    canvas.addEventListener('mousemove', onMove, { passive: true })

    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 }
    }
    canvas.addEventListener('mouseleave', onLeave)

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h)
      const t = time * 0.001

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]

        const dx = mouse.current.x - a.x
        const dy = mouse.current.y - a.y
        const md = Math.sqrt(dx * dx + dy * dy)
        if (md < MOUSE_RADIUS && md > 0) {
          const force = (1 - md / MOUSE_RADIUS) * MOUSE_FORCE
          a.vx -= (dx / md) * force
          a.vy -= (dy / md) * force
        }

        const speed = Math.sqrt(a.vx * a.vx + a.vy * a.vy)
        if (speed > SPEED_CAP) {
          a.vx = (a.vx / speed) * SPEED_CAP
          a.vy = (a.vy / speed) * SPEED_CAP
        }

        a.x += a.vx
        a.y += a.vy

        if (a.x < 0) { a.x = 0; a.vx *= -1 }
        if (a.x > w) { a.x = w; a.vx *= -1 }
        if (a.y < 0) { a.y = 0; a.vy *= -1 }
        if (a.y > h) { a.y = h; a.vy *= -1 }

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const ex = b.x - a.x
          const ey = b.y - a.y
          const dist = Math.sqrt(ex * ex + ey * ey)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * EDGE_ALPHA_MULT
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
            grad.addColorStop(0, a.color)
            grad.addColorStop(1, b.color)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = grad
            ctx.globalAlpha = alpha
            ctx.lineWidth = 1
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }

        const pulse = a.r + Math.sin(t + i) * 0.6
        const haloRadius = pulse * 4

        const halo = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, haloRadius)
        halo.addColorStop(0, a.color + '30')
        halo.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(a.x, a.y, haloRadius, 0, Math.PI * 2)
        ctx.fillStyle = halo
        ctx.fill()

        ctx.beginPath()
        ctx.arc(a.x, a.y, pulse, 0, Math.PI * 2)
        ctx.fillStyle = a.color
        ctx.fill()
      }

      if (!reducedMotion) {
        rafId = requestAnimationFrame(draw)
      }
    }

    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}
