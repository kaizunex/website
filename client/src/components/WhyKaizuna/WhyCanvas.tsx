import { useEffect, useRef } from 'react'

interface NetNode {
  label: string
  x: number
  y: number
  r: number
  color: string
}

const CENTER: NetNode = {
  label: 'You',
  x: 210,
  y: 240,
  r: 28,
  color: '#8B5CF6',
}

const SATELLITES: NetNode[] = [
  { label: 'Access', x: 90, y: 100, r: 16, color: '#A78BFA' },
  { label: 'Opportunity', x: 330, y: 80, r: 18, color: '#10B981' },
  { label: 'Business', x: 360, y: 260, r: 15, color: '#3B82F6' },
  { label: 'Trust', x: 70, y: 340, r: 14, color: '#F59E0B' },
  { label: 'Community', x: 300, y: 400, r: 13, color: '#F472B6' },
  { label: 'Referral', x: 130, y: 440, r: 12, color: '#34D399' },
  { label: 'Network', x: 350, y: 160, r: 10, color: '#93C5FD' },
]

export default function WhyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const W = 420
    const H = 480

    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = `${W}px`
    canvas.style.height = `${H}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    let rafId: number

    const draw = (time: number) => {
      const t = time * 0.001
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < SATELLITES.length; i++) {
        const sat = SATELLITES[i]
        const floatY = sat.y + Math.sin(t + i * 0.8) * 3
        const edgeAlpha = 0.15 + Math.sin(t + i) * 0.08

        const grad = ctx.createLinearGradient(
          CENTER.x, CENTER.y, sat.x, floatY,
        )
        grad.addColorStop(0, CENTER.color)
        grad.addColorStop(1, sat.color)
        ctx.beginPath()
        ctx.moveTo(CENTER.x, CENTER.y)
        ctx.lineTo(sat.x, floatY)
        ctx.strokeStyle = grad
        ctx.globalAlpha = edgeAlpha
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.globalAlpha = 1

        const haloR = sat.r * 3
        const halo = ctx.createRadialGradient(
          sat.x, floatY, 0, sat.x, floatY, haloR,
        )
        halo.addColorStop(0, sat.color + '30')
        halo.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(sat.x, floatY, haloR, 0, Math.PI * 2)
        ctx.fillStyle = halo
        ctx.fill()

        ctx.beginPath()
        ctx.arc(sat.x, floatY, sat.r, 0, Math.PI * 2)
        ctx.fillStyle = sat.color + '33'
        ctx.fill()
        ctx.strokeStyle = sat.color
        ctx.lineWidth = 1.5
        ctx.stroke()

        ctx.font = "11px 'DM Sans', sans-serif"
        ctx.textAlign = 'center'
        ctx.fillStyle = sat.color
        ctx.fillText(sat.label, sat.x, floatY + sat.r + 16)
      }

      const centerHaloR = CENTER.r * 3
      const centerHalo = ctx.createRadialGradient(
        CENTER.x, CENTER.y, 0, CENTER.x, CENTER.y, centerHaloR,
      )
      centerHalo.addColorStop(0, CENTER.color + '40')
      centerHalo.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(CENTER.x, CENTER.y, centerHaloR, 0, Math.PI * 2)
      ctx.fillStyle = centerHalo
      ctx.fill()

      ctx.beginPath()
      ctx.arc(CENTER.x, CENTER.y, CENTER.r, 0, Math.PI * 2)
      ctx.fillStyle = CENTER.color + 'CC'
      ctx.fill()
      ctx.strokeStyle = CENTER.color
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.font = "600 13px 'DM Sans', sans-serif"
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#FFFFFF'
      ctx.fillText(CENTER.label, CENTER.x, CENTER.y)

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        maxWidth: 420,
        maxHeight: 480,
        margin: '0 auto',
      }}
    />
  )
}
