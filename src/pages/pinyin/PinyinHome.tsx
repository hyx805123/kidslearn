import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card } from '@/components/common/Card'

const modules = [
  { id: 'initials', name: '声母学习', icon: '🅰️', desc: '23个声母', path: '/pinyin/initials' },
  { id: 'finals', name: '韵母学习', icon: '🅱️', desc: '24个韵母', path: '/pinyin/finals' },
  { id: 'tones', name: '声调学习', icon: '🎵', desc: '四声调练习', path: '/pinyin/tones' },
  { id: 'spelling', name: '拼读游戏', icon: '🧩', desc: '拖拽拼读', path: '/pinyin/spelling' },
  { id: 'quiz', name: '拼音测验', icon: '📝', desc: '综合测试', path: '/pinyin/quiz' },
]

export function PinyinHome() {
  const navigate = useNavigate()

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #42A5F5, #1976D2)',
          borderRadius: '24px',
          padding: '32px',
          marginBottom: '32px',
          color: '#fff',
        }}
      >
        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>🔤 拼音王国</h2>
        <p style={{ fontSize: '16px', opacity: 0.9 }}>
          学习声母、韵母和声调，掌握拼音拼读技巧！
        </p>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '20px',
        }}
      >
        {modules.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card color="#E3F2FD" onClick={() => navigate(m.path)}>
              <span style={{ fontSize: '36px', display: 'block', marginBottom: '8px' }}>{m.icon}</span>
              <h4 style={{ fontSize: '18px', color: '#1976D2', marginBottom: '4px' }}>{m.name}</h4>
              <p style={{ fontSize: '13px', color: '#666' }}>{m.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
