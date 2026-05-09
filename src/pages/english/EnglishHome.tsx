import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card } from '@/components/common/Card'

const modules = [
  { id: 'alphabet', name: '字母学习', icon: '🔡', desc: '26个字母', path: '/english/alphabet' },
  { id: 'words', name: '单词构建', icon: '🧩', desc: '拼写单词', path: '/english/words' },
  { id: 'phonics', name: '自然拼读', icon: '🗣️', desc: '拼读规则', path: '/english/phonics' },
  { id: 'dialog', name: '情景对话', icon: '💬', desc: '角色扮演', path: '/english/dialog' },
]

export function EnglishHome() {
  const navigate = useNavigate()

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #66BB6A, #2E7D32)',
          borderRadius: '24px',
          padding: '32px',
          marginBottom: '32px',
          color: '#fff',
        }}
      >
        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>🌍 英语角</h2>
        <p style={{ fontSize: '16px', opacity: 0.9 }}>
          Learn English with fun! 轻松学英语！
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
            <Card color="#E8F5E9" onClick={() => navigate(m.path)}>
              <span style={{ fontSize: '36px', display: 'block', marginBottom: '8px' }}>{m.icon}</span>
              <h4 style={{ fontSize: '18px', color: '#2E7D32', marginBottom: '4px' }}>{m.name}</h4>
              <p style={{ fontSize: '13px', color: '#666' }}>{m.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
