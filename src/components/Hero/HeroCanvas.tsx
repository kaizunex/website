import { useEffect, useRef } from 'react'

const NODE_COUNT = 55
const MAX_DIST = 140
const EDGE_ALPHA_MULT = 0.25
const MOUSE_RADIUS = 80
const MOUSE_FORCE = 0.15
const SPEED_CAP = 1.5
const COLORS = ['#8B5CF6', '#10B981', '#A78BFA']

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  color: string
  rgba: string
}

function hexToRgb(hex: string): string {
  const h = hex.replace('#', '')
  const r = Number.parseInt(h.slice(0, 2), 16)
  const g = Number.parseInt(h.slice(2, 4), 16)
  const b = Number.parseInt(h.slice(4, 6), 16)
  return `${r},${g},${b}`
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // ✅ FIX 1: Get context without options object — iOS is stricter here
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let nodes: Node[] = []
    let rafId = 0
    let initialized = false

    // ✅ FIX 2: Always use a whole-number DPR — fractional DPR corrupts
    //    iOS canvas state silently
    const getDPR = () => Math.min(Math.round(window.devicePixelRatio || 1), 2)

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      // Guard: don't resize to 0 — iOS can silently kill the context
      if (rect.width === 0 || rect.height === 0) return
      const dpr = getDPR()
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const initNodes = () => {
      nodes = Array.from({ length: NODE_COUNT }, () => {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)]
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          r: 2 + Math.random() * 2,
          color,
          rgba: hexToRgb(color),
        }
      })
    }

    // ✅ FIX 3: Initialize synchronously before rAF — never defer inside draw()
    resize()
    if (w > 0 && h > 0) {
      initNodes()
      initialized = true
    }

    // ✅ FIX 4: Use ResizeObserver as primary resize — it fires reliably on iOS
    //    and avoids layout thrash from window resize + getBoundingClientRect
    const ro = new ResizeObserver(() => {
      const prevW = w
      const prevH = h
      resize()
      if (!initialized && w > 0 && h > 0) {
        initNodes()
        initialized = true
        return
      }
      if (initialized) {
        for (const n of nodes) {
          if (prevW > 0 && prevH > 0) {
            n.x = (n.x / prevW) * w
            n.y = (n.y / prevH) * h
          }
        }
      }
    })
    ro.observe(canvas.parentElement!)

    // ✅ FIX 5: Touch support for iOS — mousemove never fires there
    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      if ('touches' in e) {
        const t = e.touches[0]
        if (!t) return null
        return { x: t.clientX - rect.left, y: t.clientY - rect.top }
      }
      return { x: (e as MouseEvent).clientX - rect.left, y: (e as MouseEvent).clientY - rect.top }
    }

    const onMove = (e: MouseEvent | TouchEvent) => {
      const pos = getPos(e)
      if (pos) mouse.current = pos
    }
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 } }

    canvas.addEventListener('mousemove', onMove, { passive: true })
    canvas.addEventListener('mouseleave', onLeave)
    canvas.addEventListener('touchmove', onMove as EventListener, { passive: true })
    canvas.addEventListener('touchend', onLeave, { passive: true })

    const draw = (time: number) => {
      // ✅ FIX 6: Never resize inside the rAF loop — just skip the frame
      if (!initialized || w === 0 || h === 0) {
        rafId = requestAnimationFrame(draw)
        return
      }

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
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${a.rgba},${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }

        const pulse = a.r + Math.sin(t + i) * 0.6
        const haloRadius = pulse * 4

        // ✅ FIX 7: Keep the rgba(r,g,b,0) pattern — no 'transparent' keyword
        //    (your original was correct; keeping it explicitly)
        const halo = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, haloRadius)
        halo.addColorStop(0, `rgba(${a.rgba},0.18)`)
        halo.addColorStop(1, `rgba(${a.rgba},0)`)
        ctx.beginPath()
        ctx.arc(a.x, a.y, haloRadius, 0, Math.PI * 2)
        ctx.fillStyle = halo
        ctx.fill()

        ctx.beginPath()
        ctx.arc(a.x, a.y, pulse, 0, Math.PI * 2)
        ctx.fillStyle = a.color
        ctx.fill()
      }

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      canvas.removeEventListener('touchmove', onMove as EventListener)
      canvas.removeEventListener('touchend', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}