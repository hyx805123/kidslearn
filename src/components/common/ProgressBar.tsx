import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number  // 0-1
  color?: string
  height?: number
  label?: string
  showPercent?: boolean
}

export function ProgressBar({ value, color = '#4FC3F7', height = 16, label, showPercent }: ProgressBarProps) {
  const percent = Math.round(Math.min(1, Math.max(0, value)) * 100)

  return (
    <div style={{ width: '100%' }}>
      {(label || showPercent) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '14px', color: '#666' }}>
          {label && <span>{label}</span>}
          {showPercent && <span>{percent}%</span>}
        </div>
      )}
      <div
        style={{
          width: '100%',
          height: `${height}px`,
          background: '#e8e8e8',
          borderRadius: `${height}px`,
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            borderRadius: `${height}px`,
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </div>
  )
}
