import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IDIOMS } from '@/constants/chinese-data'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { useSound } from '@/hooks/useSound'

export function IdiomStory() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [showStory, setShowStory] = useState(false)
  const { play } = useSound()

  const idiom = IDIOMS[selectedIdx]

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#C2185B' }}>成语故事</h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
        每个成语背后都有一个有趣的故事
      </p>

      {/* 成语列表 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '12px',
          marginBottom: '32px',
        }}
      >
        {IDIOMS.map((item, i) => (
          <Card
            key={item.idiom}
            color={selectedIdx === i ? '#FCE4EC' : '#fff'}
            onClick={() => {
              setSelectedIdx(i)
              setShowStory(false)
              play('click')
            }}
            style={{
              padding: '16px',
              textAlign: 'center',
              border: selectedIdx === i ? '2px solid #C2185B' : '2px solid transparent',
            }}
          >
            <span style={{ fontSize: '18px', fontWeight: 700, color: '#333' }}>{item.idiom}</span>
          </Card>
        ))}
      </div>

      {/* 成语详情 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={idiom.idiom}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <Card color="#fff" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '28px', color: '#C2185B', textAlign: 'center', marginBottom: '8px' }}>
              {idiom.idiom}
            </h3>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '16px' }}>
              {idiom.pinyin}
            </p>
            <p style={{ fontSize: '16px', color: '#333', marginBottom: '16px', lineHeight: 1.8 }}>
              <strong>释义：</strong>{idiom.meaning}
            </p>

            {!showStory ? (
              <div style={{ textAlign: 'center' }}>
                <Button variant="secondary" onClick={() => { setShowStory(true); play('pop') }}>
                  📖 看故事
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <div style={{
                  background: '#FFF8E1',
                  borderRadius: '16px',
                  padding: '24px',
                  marginBottom: '16px',
                }}>
                  <p style={{ fontSize: '16px', color: '#333', lineHeight: 2 }}>
                    {idiom.story}
                  </p>
                </div>
                <p style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
                  <strong>造句：</strong>{idiom.example}
                </p>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
