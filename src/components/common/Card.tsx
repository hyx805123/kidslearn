import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  color?: string
  onClick?: () => void
  style?: React.CSSProperties
  className?: string
  hoverable?: boolean
}

export function Card({ children, color, onClick, style, hoverable = true }: CardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      style={{
        background: color || '#fff',
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        cursor: onClick ? 'pointer' : 'default',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}
