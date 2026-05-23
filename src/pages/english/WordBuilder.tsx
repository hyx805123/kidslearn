import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { WORDS } from '@/constants/english-data'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Confetti } from '@/components/common/Confetti'
import { useSound } from '@/hooks/useSound'
import { useUserStore } from '@/store/useUserStore'
import { cdnTTS } from '@/utils/audio'
import { shuffleArray } from '@/utils/random'

interface LetterTile {
  id: string
  letter: string
  used: boolean
}

export function WordBuilder() {
  const [wordIdx, setWordIdx] = useState(0)
  const word = WORDS[wordIdx]

  const [tiles, setTiles] = useState<LetterTile[]>(() => createTiles(WORDS[0]))
  const [slots, setSlots] = useState<(string | null)[]>(() => Array(WORDS[0].letters.length).fill(null))
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [score, setScore] = useState(0)
  const { play, comboCorrect, comboWrong } = useSound()
  const { addExp } = useUserStore()

  function createTiles(w: typeof WORDS[0]): LetterTile[] {
    // 添加2个干扰字母
    const extras = ['x', 'z', 'q', 'w', 'y', 'k'].filter(c => !w.letters.includes(c)).slice(0, 2)
    const letters = [...w.letters, ...extras]
    const shuffled = shuffleArray(letters, Math.random)
    return shuffled.map((letter, i) => ({ id: `tile-${i}-${letter}-${Date.now()}`, letter, used: false }))
  }

  // 点击字母 -> 自动填入下一个空槽
  const handleTileClick = (tileId: string) => {
    if (result) return
    const tile = tiles.find(t => t.id === tileId)
    if (!tile || tile.used) return

    // 找到第一个空槽
    const emptyIdx = slots.indexOf(null)
    if (emptyIdx === -1) return

    // 标记 tile 为已使用
    const newTiles = tiles.map(t => t.id === tileId ? { ...t, used: true } : t)
    setTiles(newTiles)

    // 填入槽位
    const newSlots = [...slots]
    newSlots[emptyIdx] = tile.letter
    setSlots(newSlots)

    play('click')

    // 检查是否拼完
    checkWord(newSlots)
  }

  // 点击已填入的槽位 -> 退回字母
  const handleSlotClick = (slotIdx: number) => {
    if (result) return
    const letter = slots[slotIdx]
    if (!letter) return

    // 清空槽位
    const newSlots = [...slots]
    newSlots[slotIdx] = null
    setSlots(newSlots)

    // 简化：找到第一个匹配且 used 的 tile 恢复
    let restored = false
    const finalTiles = tiles.map(t => {
      if (!restored && t.used && t.letter === letter) {
        restored = true
        return { ...t, used: false }
      }
      return t
    })
    setTiles(finalTiles)
    play('pop')
  }

  const checkWord = useCallback((newSlots: (string | null)[]) => {
    if (newSlots.some(s => s === null)) return
    const spelled = newSlots.join('')
    if (spelled === word.english) {
      setResult('correct')
      setScore(s => s + 1)
      setShowConfetti(true)
      comboCorrect()
      addExp(10)
      // 朗读单词
      setTimeout(() => {
        cdnTTS.speakEnglish(word.english)
      }, 500)
    } else {
      setResult('wrong')
      comboWrong()
    }
  }, [word, comboCorrect, comboWrong, addExp])

  const nextWord = () => {
    const nextIdx = (wordIdx + 1) % WORDS.length
    setWordIdx(nextIdx)
    setSlots(Array(WORDS[nextIdx].letters.length).fill(null))
    setTiles(createTiles(WORDS[nextIdx]))
    setResult(null)
    setShowConfetti(false)
  }

  const resetWord = () => {
    setSlots(Array(word.letters.length).fill(null))
    setTiles(createTiles(word))
    setResult(null)
  }

  return (
    <div>
      <Confetti fire={showConfetti} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', color: '#2E7D32' }}>单词构建</h2>
        <span style={{ fontSize: '16px', color: '#666' }}>得分: {score}</span>
      </div>

      <Card color="#fff" style={{ padding: '32px', textAlign: 'center', marginBottom: '24px' }}>
        <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>
          {word.category === 'animals' ? '🐾' : word.category === 'fruits' ? '🍎' : word.category === 'colors' ? '🎨' : word.category === 'food' ? '🍕' : word.category === 'nature' ? '🌿' : '📦'}
        </span>
        <p style={{ fontSize: '20px', color: '#333', marginBottom: '8px' }}>
          拼出: <strong>{word.chinese}</strong>
        </p>
        <p style={{ fontSize: '14px', color: '#999' }}>
          点击字母按顺序拼写，点击已填字母可退回
        </p>
      </Card>

      {/* 拼写槽 - 可点击退回 */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
        {slots.map((val, i) => (
          <motion.button
            key={i}
            whileTap={val ? { scale: 0.9 } : undefined}
            onClick={() => handleSlotClick(i)}
            style={{
              width: '48px',
              height: '48px',
              border: val ? '3px solid #2E7D32' : '3px dashed #bbb',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: val ? '#C8E6C9' : '#fafafa',
              fontSize: '24px',
              fontWeight: 700,
              color: '#2E7D32',
              cursor: val ? 'pointer' : 'default',
              transition: 'all 0.2s',
            }}
          >
            {val || <span style={{ color: '#ccc', fontSize: '14px' }}>{i + 1}</span>}
          </motion.button>
        ))}
      </div>

      {/* 可点击字母 */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
        {tiles.map((tile) => (
          <motion.button
            key={tile.id}
            whileHover={!tile.used ? { scale: 1.1 } : undefined}
            whileTap={!tile.used ? { scale: 0.9 } : undefined}
            onClick={() => handleTileClick(tile.id)}
            disabled={tile.used}
            style={{
              width: '48px',
              height: '48px',
              background: tile.used ? '#e0e0e0' : '#fff',
              border: tile.used ? '3px solid #e0e0e0' : '3px solid #66BB6A',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 700,
              color: tile.used ? '#bbb' : '#2E7D32',
              cursor: tile.used ? 'default' : 'pointer',
              opacity: tile.used ? 0.5 : 1,
              transition: 'all 0.2s',
              boxShadow: tile.used ? 'none' : '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            {tile.letter}
          </motion.button>
        ))}
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center' }}
        >
          {result === 'correct' ? (
            <div>
              <p style={{ fontSize: '20px', color: '#2E7D32', marginBottom: '16px' }}>
                Excellent! {word.english} = {word.chinese}
              </p>
              <Button variant="accent" onClick={nextWord}>Next Word →</Button>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '18px', color: '#C62828', marginBottom: '16px' }}>
                顺序不对，再试试!
              </p>
              <Button variant="secondary" onClick={resetWord}>重新拼写</Button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
