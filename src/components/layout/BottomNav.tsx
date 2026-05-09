import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/pinyin', label: '拼音', icon: '🔤' },
  { path: '/math', label: '数学', icon: '🔢' },
  { path: '/chinese', label: '语文', icon: '📖' },
  { path: '/english', label: '英语', icon: '🌍' },
]

export function BottomNav() {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'var(--bottomnav-height)',
        background: '#fff',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 100,
        padding: '0 8px',
      }}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            padding: '6px 12px',
            borderRadius: '12px',
            textDecoration: 'none',
            color: isActive ? '#0395d6' : '#999',
            fontSize: '11px',
            fontWeight: isActive ? 600 : 400,
            background: isActive ? '#e3f2fd' : 'transparent',
            transition: 'all 0.2s',
            minWidth: '48px',
          })}
        >
          <span style={{ fontSize: '22px' }}>{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
