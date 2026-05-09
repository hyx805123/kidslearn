import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card } from '@/components/common/Card'

const modules = [
  { id: 'addsub', name: '加减法闯关', icon: '➕', desc: '从入门到精通', path: '/math/addsub' },
  { id: 'muldiv', name: '乘除法闯关', icon: '✖️', desc: '九九乘法表', path: '/math/muldiv' },
  { id: 'timed', name: '计时挑战', icon: '⏱️', desc: '60秒速算', path: '/math/timed' },
  { id: 'tools', name: '虚拟教具', icon: '🧮', desc: '算盘和数轴', path: '/math/tools' },
]

export function MathHome() {
  const navigate = useNavigate()

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #FFA726, #E65100)',
          borderRadius: '24px',
          padding: '32px',
          marginBottom: '32px',
          color: '#fff',
        }}
      >
        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>🔢 数学乐园</h2>
        <p style={{ fontSize: '16px', opacity: 0.9 }}>
          加减乘除样样行，闯关挑战乐无穷！
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
            <Card color="#FFF3E0" onClick={() => navigate(m.path)}>
              <span style={{ fontSize: '36px', display: 'block', marginBottom: '8px' }}>{m.icon}</span>
              <h4 style={{ fontSize: '18px', color: '#E65100', marginBottom: '4px' }}>{m.name}</h4>
              <p style={{ fontSize: '13px', color: '#666' }}>{m.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
