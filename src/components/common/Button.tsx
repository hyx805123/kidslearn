import React from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  loading?: boolean
}

const variantStyles: Record<string, React.CSSProperties> = {
  primary: { background: 'linear-gradient(135deg, #4FC3F7, #0395d6)', color: '#fff' },
  secondary: { background: 'linear-gradient(135deg, #FFD54F, #f9a825)', color: '#333' },
  accent: { background: 'linear-gradient(135deg, #81C784, #388E3C)', color: '#fff' },
  ghost: { background: 'transparent', color: '#4FC3F7', border: '2px solid #4FC3F7' },
}

const sizeStyles: Record<string, React.CSSProperties> = {
  sm: { padding: '8px 16px', fontSize: '14px', minHeight: '36px', minWidth: '36px' },
  md: { padding: '12px 24px', fontSize: '16px', minHeight: '48px', minWidth: '48px' },
  lg: { padding: '16px 32px', fontSize: '20px', minHeight: '56px', minWidth: '56px' },
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  loading,
  children,
  style,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        border: variant === 'ghost' ? '2px solid #4FC3F7' : 'none',
        borderRadius: '16px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: 600,
        opacity: disabled ? 0.5 : 1,
        boxShadow: variant !== 'ghost' ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
        fontFamily: 'inherit',
        outline: 'none',
        ...style,
      }}
      disabled={disabled || loading}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {loading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          style={{ display: 'inline-block', width: 20, height: 20 }}
        >
          ⏳
        </motion.span>
      ) : (
        icon
      )}
      {children}
    </motion.button>
  )
}
