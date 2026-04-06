import { useEffect, useRef } from 'react'

interface Node {
  label: string
  x: number
  y: number
  r: number
  color: string
}

const CENTER: Node = {
  label: 'You',
  x: 150,
  y: 100,
  r: 20,
  color: '#8B5CF6',
}

const SATELLITES: Node[] = [
  { label: 'Friend', x: 60, y: 40, r: 12, color: '#A78BFA' },
  { label: 'Contact', x: 250, y: 45, r: 12, color: '#34D399' },
  { label: 'Partner', x: 260, y: 160, r: 12, color: '#93C5FD' },
  { label: 'Mentor', x: 50, y: 165, r: 12, color: '#F59E0B' },
  { label: 'Opp.', x: 155, y: 25, r: 10, color: '#F472B6' },
]

export default function MiniCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = 300 * dpr
    canvas.height = 200 * dpr
    ctx.scale(dpr, dpr)

    const draw = (t: number) => {
      ctx.clearRect(0, 0, 300, 200)
      const time = t / 1000

      SATELLITES.forEach((sat, i) => {
        const floatY = Math.sin(time + i) * 2
        const alpha = 0.25 + 0.2 * Math.sin(time + i * 1.3)

        const gradient = ctx.createLinearGradient(
          CENTER.x,
          CENTER.y,
          sat.x,
          sat.y + floatY,
        )
        gradient.addColorStop(0, `rgba(139, 92, 246, ${alpha})`)
        gradient.addColorStop(1, `rgba(16, 185, 129, ${alpha * 0.6})`)

        ctx.beginPath()
        ctx.moveTo(CENTER.x, CENTER.y)
        ctx.lineTo(sat.x, sat.y + floatY)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.2
        ctx.stroke()
      })

      SATELLITES.forEach((sat, i) => {
        const floatY = Math.sin(time + i) * 2
        const sy = sat.y + floatY

        ctx.beginPath()
        ctx.arc(sat.x, sy, sat.r + 6, 0, Math.PI * 2)
        const glow = ctx.createRadialGradient(
          sat.x,
          sy,
          sat.r,
          sat.x,
          sy,
          sat.r + 6,
        )
        glow.addColorStop(0, `${sat.color}30`)
        glow.addColorStop(1, 'transparent')
        ctx.fillStyle = glow
        ctx.fill()

        ctx.beginPath()
        ctx.arc(sat.x, sy, sat.r, 0, Math.PI * 2)
        ctx.fillStyle = `${sat.color}20`
        ctx.fill()
        ctx.strokeStyle = `${sat.color}60`
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.font = "10px 'DM Sans', system-ui, sans-serif"
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = sat.color
        ctx.fillText(sat.label, sat.x, sy)
      })

      ctx.beginPath()
      ctx.arc(CENTER.x, CENTER.y, CENTER.r + 8, 0, Math.PI * 2)
      const centerGlow = ctx.createRadialGradient(
        CENTER.x,
        CENTER.y,
        CENTER.r,
        CENTER.x,
        CENTER.y,
        CENTER.r + 8,
      )
      centerGlow.addColorStop(0, 'rgba(139, 92, 246, 0.25)')
      centerGlow.addColorStop(1, 'transparent')
      ctx.fillStyle = centerGlow
      ctx.fill()

      ctx.beginPath()
      ctx.arc(CENTER.x, CENTER.y, CENTER.r, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(139, 92, 246, 0.2)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      ctx.font = "bold 12px 'DM Sans', system-ui, sans-serif"
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#A78BFA'
      ctx.fillText(CENTER.label, CENTER.x, CENTER.y)

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={200}
      style={{
        width: 300,
        height: 200,
        borderRadius: 16,
      }}
    />
  )
}
