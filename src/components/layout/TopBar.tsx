import { useUserStore } from '@/store/useUserStore'
import { ProgressBar } from '@/components/common/ProgressBar'
import { useNavigate, useLocation } from 'react-router-dom'

export function TopBar() {
  const { nickname, level, levelInfo } = useUserStore()
  const info = levelInfo()
  const navigate = useNavigate()
  const location = useLocation()

  const getPageTitle = () => {
    const path = location.pathname
    if (path === '/') return '首页'
    if (path.startsWith('/pinyin')) return '🔤 拼音王国'
    if (path.startsWith('/math')) return '🔢 数学乐园'
    if (path.startsWith('/chinese')) return '📖 语文天地'
    if (path.startsWith('/english')) return '🌍 英语角'
    if (path === '/profile') return '👤 个人中心'
    if (path === '/challenge') return '🎯 每日挑战'
    if (path === '/parent') return '👨‍👩‍👧 家长模式'
    return 'KidsLearn'
  }

  return (
    <header
      style={{
        height: 'var(--topbar-height)',
        background: '#fff',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        gap: '16px',
      }}
    >
      {/* 页面标题 */}
      <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#333', whiteSpace: 'nowrap' }}>
        {getPageTitle()}
      </h1>

      {/* 经验条 */}
      <div style={{ flex: 1, maxWidth: '300px' }}>
        <ProgressBar
          value={info.progress}
          color="#4FC3F7"
          height={12}
          label={`Lv.${level} ${nickname}`}
          showPercent
        />
      </div>

      <div style={{ flex: 1 }} />

      {/* 用户头像区 */}
      <button
        onClick={() => navigate('/profile')}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4FC3F7, #81C784)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          border: 'none',
          cursor: 'pointer',
          color: '#fff',
          fontWeight: 700,
        }}
      >
        {nickname[0]}
      </button>
    </header>
  )
}
