import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/pinyin', label: '拼音', icon: '🔤' },
  { path: '/math', label: '数学', icon: '🔢' },
  { path: '/chinese', label: '语文', icon: '📖' },
  { path: '/english', label: '英语', icon: '🌍' },
  { path: '/challenge', label: '挑战', icon: '🎯' },
  { path: '/profile', label: '我的', icon: '👤' },
]

export function Sidebar() {
  return (
    <nav
      style={{
        width: 'var(--sidebar-width)',
        background: 'var(--color-bg-sidebar)',
        height: 'calc(100vh - var(--topbar-height))',
        position: 'sticky',
        top: 'var(--topbar-height)',
        padding: '16px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        overflowY: 'auto',
        borderRight: '1px solid var(--color-border)',
      }}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          style={() => ({
            textDecoration: 'none',
          })}
        >
          {({ isActive }) => (
            <motion.div
              whileHover={{ x: 4 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: isActive ? '#fff' : 'transparent',
                boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                color: isActive ? '#0395d6' : '#555',
                fontWeight: isActive ? 600 : 400,
                fontSize: '15px',
                transition: 'background 0.2s',
              }}
            >
              <span style={{ fontSize: '22px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </motion.div>
          )}
        </NavLink>
      ))}

      <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #eee' }}>
        <p style={{ fontSize: '10px', color: '#bbb', textAlign: 'center', lineHeight: 1.6 }}>
          &copy; yingxiang.he<br />350168448@qq.com
        </p>
      </div>
    </nav>
  )
}
