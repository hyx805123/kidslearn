import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
  onClose: () => void
}

const typeConfig = {
  success: { bg: '#E8F5E9', color: '#2E7D32', icon: '✓' },
  error: { bg: '#FFEBEE', color: '#C62828', icon: '✗' },
  info: { bg: '#E3F2FD', color: '#1565C0', icon: 'ℹ' },
}

export function Toast({ message, type = 'info', duration = 2500, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true)
  const config = typeConfig[type]

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          style={{
            position: 'fixed',
            top: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: config.bg,
            color: config.color,
            padding: '12px 24px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '16px',
            fontWeight: 600,
          }}
        >
          <span style={{ fontSize: '20px' }}>{config.icon}</span>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
