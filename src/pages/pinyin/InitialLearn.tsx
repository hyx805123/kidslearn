import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { INITIALS } from '@/constants/pinyin-data'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { useSound } from '@/hooks/useSound'
import { pinyinAudio } from '@/utils/audio'

export function InitialLearn() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const { play } = useSound()

  const selected = selectedIndex !== null ? INITIALS[selectedIndex] : null

  const speakPinyin = () => {
    if (!selected) return
    pinyinAudio.playPinyin(selected.char)
  }

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#1976D2' }}>声母学习</h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
        点击卡片学习每个声母的发音 (共 23 个)
      </p>

      {/* 卡片网格 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
          gap: '12px',
          marginBottom: '32px',
        }}
      >
        {INITIALS.map((item, i) => (
          <motion.div
            key={item.char}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
          >
            <Card
              color={selectedIndex === i ? '#BBDEFB' : '#E3F2FD'}
              onClick={() => {
                setSelectedIndex(i)
                play('click')
                // 点击卡片时直接播放读音
                pinyinAudio.playPinyin(item.char)
              }}
              style={{
                padding: '16px',
                textAlign: 'center',
                border: selectedIndex === i ? '3px solid #1976D2' : '3px solid transparent',
              }}
            >
              <span style={{ fontSize: '28px', fontWeight: 700, color: '#1976D2' }}>{item.char}</span>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 详情面板 */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.char}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card color="#fff" style={{ textAlign: 'center', padding: '40px' }}>
              <motion.span
                style={{ fontSize: '72px', fontWeight: 700, color: '#1976D2', display: 'block' }}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {selected.char}
              </motion.span>
              <p style={{ fontSize: '20px', color: '#666', margin: '16px 0' }}>
                发音：{selected.pinyin}
              </p>
              <Button
                variant="primary"
                onClick={speakPinyin}
              >
                🔊 播放发音
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
