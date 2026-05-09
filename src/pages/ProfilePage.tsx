import { motion } from 'framer-motion'
import { Card } from '@/components/common/Card'
import { ProgressBar } from '@/components/common/ProgressBar'
import { useUserStore } from '@/store/useUserStore'
import { BADGES } from '@/constants/badges'

export function ProfilePage() {
  const { nickname, level, totalExp, levelInfo, badges, consecutiveDays } = useUserStore()
  const info = levelInfo()

  const earnedBadgeIds = badges.map(b => b.id)

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* 用户头像区 */}
        <Card color="linear-gradient(135deg, #4FC3F7, #81C784)" style={{ textAlign: 'center', padding: '40px', marginBottom: '24px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: '#fff', margin: '0 auto 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '36px', fontWeight: 700, color: '#4FC3F7',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}>
            {nickname[0]}
          </div>
          <h2 style={{ fontSize: '24px', color: '#fff', marginBottom: '8px' }}>{nickname}</h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>
            Lv.{level} | 总经验 {totalExp} | 连续学习 {consecutiveDays} 天
          </p>
        </Card>

        {/* 经验进度 */}
        <Card color="#fff" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>等级进度</h3>
          <ProgressBar
            value={info.progress}
            color="#4FC3F7"
            height={14}
            label={`Lv.${level} → Lv.${level + 1}`}
            showPercent
          />
          <p style={{ fontSize: '13px', color: '#999', marginTop: '8px' }}>
            还需 {info.expNeeded - info.currentExp} 经验升级
          </p>
        </Card>

        {/* 徽章收集 */}
        <Card color="#fff">
          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
            徽章收集 ({earnedBadgeIds.length}/{BADGES.length})
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '12px',
          }}>
            {BADGES.map((badge) => {
              const earned = earnedBadgeIds.includes(badge.id)
              return (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    textAlign: 'center',
                    padding: '12px 8px',
                    borderRadius: '12px',
                    background: earned ? '#FFF8E1' : '#f5f5f5',
                    opacity: earned ? 1 : 0.6,
                    border: earned ? '2px solid #FFD54F' : '2px solid transparent',
                  }}
                >
                  <span style={{ fontSize: '28px', display: 'block', marginBottom: '4px', filter: earned ? 'none' : 'grayscale(1)' }}>
                    {badge.icon}
                  </span>
                  <p style={{ fontSize: '11px', color: earned ? '#333' : '#999', lineHeight: 1.3, fontWeight: earned ? 600 : 400 }}>
                    {badge.name}
                  </p>
                  {!earned && (
                    <p style={{ fontSize: '10px', color: '#bbb', marginTop: '2px' }}>
                      🔒 未解锁
                    </p>
                  )}
                </motion.div>
              )
            })}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
