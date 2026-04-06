import styles from '../../styles/components/WhyCanvas.module.css'

const VB = { w: 420, h: 480 }

const CENTER = { label: 'You', cx: 210, cy: 240, r: 28, color: '#8B5CF6' }

const SATELLITES = [
  { label: 'Access', cx: 90, cy: 100, r: 16, color: '#A78BFA' },
  { label: 'Opportunity', cx: 330, cy: 80, r: 18, color: '#10B981' },
  { label: 'Business', cx: 360, cy: 260, r: 15, color: '#3B82F6' },
  { label: 'Trust', cx: 70, cy: 340, r: 14, color: '#F59E0B' },
  { label: 'Community', cx: 300, cy: 400, r: 13, color: '#F472B6' },
  { label: 'Referral', cx: 130, cy: 440, r: 12, color: '#34D399' },
  { label: 'Network', cx: 350, cy: 160, r: 10, color: '#93C5FD' },
] as const

function gradientId(i: number) {
  return `why-edge-${i}`
}

export default function WhyCanvas() {
  return (
    <div className={styles.root}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          {SATELLITES.map((sat, i) => (
            <linearGradient
              key={gradientId(i)}
              id={gradientId(i)}
              gradientUnits="userSpaceOnUse"
              x1={CENTER.cx}
              y1={CENTER.cy}
              x2={sat.cx}
              y2={sat.cy}
            >
              <stop offset="0%" stopColor={CENTER.color} />
              <stop offset="100%" stopColor={sat.color} />
            </linearGradient>
          ))}
        </defs>

        {SATELLITES.map((sat, i) => (
          <line
            key={`e-${sat.label}`}
            className={styles.edge}
            x1={CENTER.cx}
            y1={CENTER.cy}
            x2={sat.cx}
            y2={sat.cy}
            stroke={`url(#${gradientId(i)})`}
            style={{ animationDelay: `${i * 0.35}s` }}
          />
        ))}

        {SATELLITES.map((sat) => (
          <g key={sat.label}>
            <circle
              cx={sat.cx}
              cy={sat.cy}
              r={sat.r * 3}
              fill={sat.color}
              fillOpacity={0.19}
            />
            <circle
              className={styles.disc}
              cx={sat.cx}
              cy={sat.cy}
              r={sat.r}
              fill={`${sat.color}33`}
              stroke={sat.color}
            />
            <text
              className={styles.satLabel}
              x={sat.cx}
              y={sat.cy + sat.r + 16}
              fill={sat.color}
            >
              {sat.label}
            </text>
          </g>
        ))}

        <circle
          cx={CENTER.cx}
          cy={CENTER.cy}
          r={CENTER.r * 3}
          fill={CENTER.color}
          fillOpacity={0.25}
        />
        <circle
          className={styles.centerDisc}
          cx={CENTER.cx}
          cy={CENTER.cy}
          r={CENTER.r}
          fill={`${CENTER.color}CC`}
          stroke={CENTER.color}
        />
        <text
          className={styles.centerLabel}
          x={CENTER.cx}
          y={CENTER.cy}
        >
          {CENTER.label}
        </text>
      </svg>
    </div>
  )
}
