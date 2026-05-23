import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card } from '@/components/common/Card'

const ageGroups = [
  {
    age: '4-5岁',
    label: '幼儿园',
    color: '#E8F5E9',
    textColor: '#2E7D32',
    modules: [
      { id: 'add10', name: '10以内加法', icon: '🐣', desc: '1+2=? 入门加法', path: '/math/addsub?group=add10' },
      { id: 'sub10', name: '10以内减法', icon: '🌱', desc: '5-3=? 入门减法', path: '/math/addsub?group=sub10' },
    ],
  },
  {
    age: '6-7岁',
    label: '一年级',
    color: '#E3F2FD',
    textColor: '#1565C0',
    modules: [
      { id: 'add20', name: '20以内加法', icon: '🐥', desc: '进阶加法练习', path: '/math/addsub?group=add20' },
      { id: 'sub20', name: '20以内减法', icon: '🌿', desc: '进阶减法练习', path: '/math/addsub?group=sub20' },
      { id: 'mix20', name: '20以内加减混合', icon: '🎯', desc: '加减法混合练习', path: '/math/addsub?group=mix20' },
    ],
  },
  {
    age: '7-8岁',
    label: '二年级',
    color: '#FFF3E0',
    textColor: '#E65100',
    modules: [
      { id: 'add100', name: '100以内加法', icon: '🚀', desc: '两位数加法', path: '/math/addsub?group=add100' },
      { id: 'sub100', name: '100以内减法', icon: '🔥', desc: '两位数减法', path: '/math/addsub?group=sub100' },
      { id: 'mix100', name: '连加连减混合', icon: '⚡', desc: '连续运算挑战', path: '/math/addsub?group=mix100' },
      { id: 'mul', name: '乘法表', icon: '✖️', desc: '九九乘法口诀', path: '/math/addsub?group=mul' },
    ],
  },
  {
    age: '综合',
    label: '挑战模式',
    color: '#FCE4EC',
    textColor: '#C2185B',
    modules: [
      { id: 'timed', name: '60秒速算', icon: '⏱️', desc: '限时计算挑战', path: '/math/timed' },
    ],
  },
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
          选择适合你的难度，一步步成为数学小天才！
        </p>
      </motion.div>

      {ageGroups.map((group, gi) => (
        <motion.div
          key={group.age}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: gi * 0.1 }}
          style={{ marginBottom: '28px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{
              padding: '4px 12px',
              borderRadius: '20px',
              background: group.color,
              color: group.textColor,
              fontSize: '13px',
              fontWeight: 600,
            }}>
              {group.age}
            </span>
            <span style={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>{group.label}</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '12px',
            }}
          >
            {group.modules.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: gi * 0.1 + i * 0.05 }}
              >
                <Card color={group.color} onClick={() => navigate(m.path)} style={{ padding: '20px' }}>
                  <span style={{ fontSize: '28px', display: 'block', marginBottom: '6px' }}>{m.icon}</span>
                  <h4 style={{ fontSize: '16px', color: group.textColor, marginBottom: '4px' }}>{m.name}</h4>
                  <p style={{ fontSize: '12px', color: '#666' }}>{m.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
