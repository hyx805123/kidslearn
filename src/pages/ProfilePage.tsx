import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/common/Card'
import { ProgressBar } from '@/components/common/ProgressBar'
import { useUserStore } from '@/store/useUserStore'
import { BADGES } from '@/constants/badges'

export function ProfilePage() {
  const { nickname, level, totalExp, levelInfo, badges, consecutiveDays, setNickname } = useUserStore()
  const info = levelInfo()
  const navigate = useNavigate()

  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editValue, setEditValue] = useState('')

  const earnedBadgeIds = badges.map(b => b.id)

  const openEditModal = () => {
    setEditValue(nickname)
    setEditModalOpen(true)
  }

  const saveNickname = () => {
    const trimmed = editValue.trim()
    if (trimmed && trimmed.length <= 8) {
      setNickname(trimmed)
      setEditModalOpen(false)
    }
  }

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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '24px', color: '#fff', margin: 0 }}>{nickname}</h2>
            <button
              onClick={openEditModal}
              style={{
                background: 'rgba(255,255,255,0.3)',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
              }}
            >
              ✏️
            </button>
          </div>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>
            Lv.{level} | 总经验 {totalExp} | 连续学习 {consecutiveDays} 天
          </p>
        </Card>

        {/* 快捷入口 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          <Card color="#E8F5E9" onClick={() => navigate('/english')} style={{ padding: '16px', textAlign: 'center' }}>
            <span style={{ fontSize: '24px', display: 'block', marginBottom: '4px' }}>🌍</span>
            <p style={{ fontSize: '12px', color: '#2E7D32' }}>英语角</p>
          </Card>
          <Card color="#FFF3E0" onClick={() => navigate('/challenge')} style={{ padding: '16px', textAlign: 'center' }}>
            <span style={{ fontSize: '24px', display: 'block', marginBottom: '4px' }}>🎯</span>
            <p style={{ fontSize: '12px', color: '#E65100' }}>每日挑战</p>
          </Card>
          <Card color="#FFEBEE" onClick={() => navigate('/wrong-book')} style={{ padding: '16px', textAlign: 'center' }}>
            <span style={{ fontSize: '24px', display: 'block', marginBottom: '4px' }}>📝</span>
            <p style={{ fontSize: '12px', color: '#C62828' }}>错题本</p>
          </Card>
          <Card color="#F3E5F5" onClick={() => navigate('/parent')} style={{ padding: '16px', textAlign: 'center' }}>
            <span style={{ fontSize: '24px', display: 'block', marginBottom: '4px' }}>👨‍👩‍👧</span>
            <p style={{ fontSize: '12px', color: '#6A1B9A' }}>家长模式</p>
          </Card>
        </div>

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

      {/* 昵称编辑弹窗 */}
      <AnimatePresence>
        {editModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.4)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', zIndex: 1000,
              padding: '24px',
            }}
            onClick={() => setEditModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#fff', borderRadius: '20px', padding: '32px',
                width: '100%', maxWidth: '320px', textAlign: 'center',
              }}
            >
              <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#333' }}>修改昵称</h3>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value.slice(0, 8))}
                maxLength={8}
                autoFocus
                style={{
                  width: '100%', padding: '12px 16px', fontSize: '18px',
                  border: '2px solid #4FC3F7', borderRadius: '12px',
                  textAlign: 'center', outline: 'none', boxSizing: 'border-box',
                }}
                onKeyDown={(e) => { if (e.key === 'Enter') saveNickname() }}
              />
              <p style={{ fontSize: '12px', color: editValue.trim().length === 0 ? '#EF5350' : '#999', marginTop: '8px' }}>
                {editValue.trim().length === 0 ? '昵称不能为空' : `${editValue.trim().length}/8`}
              </p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px', justifyContent: 'center' }}>
                <button
                  onClick={() => setEditModalOpen(false)}
                  style={{
                    padding: '10px 24px', borderRadius: '10px', border: '2px solid #e0e0e0',
                    background: '#fff', fontSize: '15px', cursor: 'pointer', color: '#666',
                  }}
                >
                  取消
                </button>
                <button
                  onClick={saveNickname}
                  disabled={!editValue.trim()}
                  style={{
                    padding: '10px 24px', borderRadius: '10px', border: 'none',
                    background: editValue.trim() ? '#4FC3F7' : '#e0e0e0',
                    color: '#fff', fontSize: '15px', fontWeight: 600, cursor: editValue.trim() ? 'pointer' : 'default',
                  }}
                >
                  保存
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
