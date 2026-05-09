import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card } from '@/components/common/Card'
import { useUserStore } from '@/store/useUserStore'
import { subjectColors } from '@/styles/theme'

const subjects = [
  { id: 'pinyin', name: '拼音王国', icon: '🔤', desc: '声母韵母、拼读练习', path: '/pinyin', color: subjectColors.pinyin },
  { id: 'math', name: '数学乐园', icon: '🔢', desc: '加减乘除、闯关挑战', path: '/math', color: subjectColors.math },
  { id: 'chinese', name: '语文天地', icon: '📖', desc: '汉字书写、古诗成语', path: '/chinese', color: subjectColors.chinese },
  { id: 'english', name: '英语角', icon: '🌍', desc: '字母单词、情景对话', path: '/english', color: subjectColors.english },
]

export function HomePage() {
  const navigate = useNavigate()
  const { nickname, level } = useUserStore()

  return (
    <div>
      {/* 欢迎区 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #4FC3F7, #81C784)',
          borderRadius: '24px',
          padding: '32px',
          marginBottom: '32px',
          color: '#fff',
        }}
      >
        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>
          你好，{nickname}！
        </h2>
        <p style={{ fontSize: '16px', opacity: 0.9 }}>
          今天想学什么呢？选择一个学科开始吧！ (Lv.{level})
        </p>
      </motion.div>

      {/* 每日挑战入口 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ marginBottom: '32px' }}
      >
        <Card
          color="linear-gradient(135deg, #FFD54F, #FFA726)"
          onClick={() => navigate('/challenge')}
          style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
        >
          <span style={{ fontSize: '40px' }}>🎯</span>
          <div>
            <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '4px' }}>每日挑战</h3>
            <p style={{ fontSize: '14px', color: '#555' }}>每天3道趣味题，连续打卡赢徽章！</p>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: '24px' }}>→</div>
        </Card>
      </motion.div>

      {/* 学科卡片网格 */}
      <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>选择学科</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px',
        }}
      >
        {subjects.map((subject, i) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
          >
            <Card
              color={subject.color.bg}
              onClick={() => navigate(subject.path)}
              style={{ textAlign: 'center', padding: '32px 24px' }}
            >
              <motion.span
                style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
              >
                {subject.icon}
              </motion.span>
              <h4 style={{ fontSize: '20px', color: subject.color.icon, marginBottom: '8px' }}>
                {subject.name}
              </h4>
              <p style={{ fontSize: '14px', color: '#666' }}>{subject.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
