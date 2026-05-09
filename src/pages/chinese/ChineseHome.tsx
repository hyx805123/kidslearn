import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card } from '@/components/common/Card'

const modules = [
  { id: 'stroke', name: '汉字笔顺', icon: '✍️', desc: '动画学写字', path: '/chinese/stroke' },
  { id: 'idiom', name: '成语故事', icon: '📖', desc: '趣味成语学习', path: '/chinese/idiom' },
  { id: 'poetry', name: '古诗词', icon: '📜', desc: '名篇诵读', path: '/chinese/poetry' },
  { id: 'quiz', name: '语文测验', icon: '📝', desc: '综合检测', path: '/chinese/quiz' },
]

export function ChineseHome() {
  const navigate = useNavigate()

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #EC407A, #C2185B)',
          borderRadius: '24px',
          padding: '32px',
          marginBottom: '32px',
          color: '#fff',
        }}
      >
        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>📖 语文天地</h2>
        <p style={{ fontSize: '16px', opacity: 0.9 }}>
          学写汉字、读古诗、听成语故事！
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
            <Card color="#FCE4EC" onClick={() => navigate(m.path)}>
              <span style={{ fontSize: '36px', display: 'block', marginBottom: '8px' }}>{m.icon}</span>
              <h4 style={{ fontSize: '18px', color: '#C2185B', marginBottom: '4px' }}>{m.name}</h4>
              <p style={{ fontSize: '13px', color: '#666' }}>{m.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
