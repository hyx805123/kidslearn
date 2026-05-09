import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ALPHABET } from '@/constants/english-data'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { useSound } from '@/hooks/useSound'

export function AlphabetLearn() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const { play } = useSound()

  const letter = selectedIdx !== null ? ALPHABET[selectedIdx] : null

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#2E7D32' }}>字母学习</h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
        点击字母卡片学习发音和单词
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
          gap: '8px',
          marginBottom: '32px',
        }}
      >
        {ALPHABET.map((item, i) => (
          <motion.button
            key={item.upper}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { setSelectedIdx(i); play('click') }}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              border: selectedIdx === i ? '3px solid #2E7D32' : '2px solid #c8e6c9',
              background: selectedIdx === i ? '#E8F5E9' : '#fff',
              fontSize: '22px',
              fontWeight: 700,
              color: '#2E7D32',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {item.upper}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {letter && (
          <motion.div
            key={letter.upper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card color="#fff" style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '24px' }}>
                <motion.span
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{ fontSize: '80px', fontWeight: 700, color: '#2E7D32' }}
                >
                  {letter.upper}
                </motion.span>
                <motion.span
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                  style={{ fontSize: '80px', fontWeight: 700, color: '#66BB6A' }}
                >
                  {letter.lower}
                </motion.span>
              </div>

              <p style={{ fontSize: '16px', color: '#666', marginBottom: '8px' }}>
                音标: <strong>{letter.phonetic}</strong>
              </p>
              <p style={{ fontSize: '18px', color: '#333', marginBottom: '16px' }}>
                {letter.word} = {letter.wordChinese}
              </p>

              <Button variant="accent" onClick={() => play('pop')}>
                🔊 Play Sound
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
