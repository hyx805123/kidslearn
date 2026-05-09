import { useState } from 'react'
import { motion } from 'framer-motion'
import { POEMS } from '@/constants/chinese-data'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { useSound } from '@/hooks/useSound'

export function PoetryRead() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [showPinyin, setShowPinyin] = useState(true)
  const [showTranslation, setShowTranslation] = useState(false)
  const { play } = useSound()

  const poem = POEMS[selectedIdx]

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#C2185B' }}>古诗词</h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
        诵读经典名篇，感受诗词之美
      </p>

      {/* 诗歌列表 */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {POEMS.map((p, i) => (
          <motion.button
            key={p.title}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setSelectedIdx(i); play('click') }}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: selectedIdx === i ? '2px solid #C2185B' : '2px solid #e0e0e0',
              background: selectedIdx === i ? '#FCE4EC' : '#fff',
              fontSize: '14px',
              color: selectedIdx === i ? '#C2185B' : '#666',
              cursor: 'pointer',
              fontWeight: selectedIdx === i ? 600 : 400,
            }}
          >
            {p.title}
          </motion.button>
        ))}
      </div>

      {/* 诗歌展示 */}
      <Card color="#fff" style={{ padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '24px', color: '#333', marginBottom: '8px' }}>{poem.title}</h3>
          <p style={{ fontSize: '14px', color: '#666' }}>
            [{poem.dynasty}] {poem.author}
          </p>
        </div>

        <div style={{ maxWidth: '400px', margin: '0 auto', marginBottom: '24px' }}>
          {poem.lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              style={{ marginBottom: '12px', textAlign: 'center' }}
            >
              {showPinyin && (
                <p style={{ fontSize: '12px', color: '#999', marginBottom: '4px', letterSpacing: '1px' }}>
                  {poem.pinyin[i]}
                </p>
              )}
              <p style={{ fontSize: '22px', color: '#333', letterSpacing: '2px' }}>{line}</p>
            </motion.div>
          ))}
        </div>

        {/* 控制按钮 */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant={showPinyin ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setShowPinyin(!showPinyin)}
          >
            {showPinyin ? '隐藏拼音' : '显示拼音'}
          </Button>
          <Button
            variant={showTranslation ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => { setShowTranslation(!showTranslation); play('pop') }}
          >
            {showTranslation ? '隐藏译文' : '查看译文'}
          </Button>
        </div>

        {showTranslation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            style={{
              marginTop: '24px',
              padding: '20px',
              background: '#F3E5F5',
              borderRadius: '12px',
            }}
          >
            <p style={{ fontSize: '15px', color: '#4A148C', lineHeight: 1.8 }}>
              <strong>译文：</strong>{poem.translation}
            </p>
          </motion.div>
        )}
      </Card>
    </div>
  )
}
