import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { SPELLING_COMBOS } from '@/constants/pinyin-data'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { ProgressBar } from '@/components/common/ProgressBar'
import { Confetti } from '@/components/common/Confetti'
import { useSound } from '@/hooks/useSound'
import { useUserStore } from '@/store/useUserStore'
import { shuffleArray } from '@/utils/random'

interface QuizQuestion {
  syllable: string
  meaning: string
  options: string[]
  correctIndex: number
}

function generateQuiz(count: number): QuizQuestion[] {
  const rng = () => Math.random()
  const combos = shuffleArray(SPELLING_COMBOS, rng).slice(0, count)

  return combos.map((combo) => {
    const wrongOptions = SPELLING_COMBOS
      .filter((c) => c.result !== combo.result)
      .slice(0, 3)
      .map((c) => c.result)

    const options = shuffleArray([combo.result, ...wrongOptions], rng)
    return {
      syllable: combo.result,
      meaning: combo.meaning,
      options,
      correctIndex: options.indexOf(combo.result),
    }
  })
}

export function PinyinQuiz() {
  const [questions] = useState(() => generateQuiz(10))
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { play } = useSound()
  const { addExp } = useUserStore()

  const question = questions[currentQ]

  const handleSelect = useCallback((idx: number) => {
    if (selected !== null) return
    setSelected(idx)

    if (idx === question.correctIndex) {
      play('correct')
      setScore((s) => s + 1)
      addExp(10)
    } else {
      play('wrong')
    }

    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ((q) => q + 1)
        setSelected(null)
      } else {
        setFinished(true)
        if (score + (idx === question.correctIndex ? 1 : 0) >= 8) {
          setShowConfetti(true)
        }
      }
    }, 1200)
  }, [selected, currentQ, question, questions.length, score, play, addExp])

  if (finished) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <Confetti fire={showConfetti} />
        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
          <span style={{ fontSize: '64px', display: 'block', marginBottom: '16px' }}>
            {score >= 8 ? '🏆' : score >= 5 ? '⭐' : '💪'}
          </span>
          <h2 style={{ fontSize: '28px', marginBottom: '12px' }}>测验完成！</h2>
          <p style={{ fontSize: '20px', color: '#666', marginBottom: '24px' }}>
            得分：{score} / {questions.length}
          </p>
          <Button onClick={() => window.location.reload()}>再做一次</Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <ProgressBar value={(currentQ) / questions.length} label={`第 ${currentQ + 1} / ${questions.length} 题`} />
      </div>

      <Card color="#fff" style={{ padding: '32px', textAlign: 'center', marginBottom: '24px' }}>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '12px' }}>
          哪个拼音读作「{question.meaning}」？
        </p>
        <motion.span
          key={currentQ}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ fontSize: '48px', fontWeight: 700, color: '#1976D2', display: 'block' }}
        >
          ?
        </motion.span>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {question.options.map((opt, idx) => {
          let bg = '#f5f5f5'
          let border = '3px solid transparent'
          if (selected !== null) {
            if (idx === question.correctIndex) { bg = '#E8F5E9'; border = '3px solid #66BB6A' }
            else if (idx === selected) { bg = '#FFEBEE'; border = '3px solid #EF5350' }
          }

          return (
            <motion.button
              key={idx}
              whileHover={selected === null ? { scale: 1.03 } : undefined}
              whileTap={selected === null ? { scale: 0.97 } : undefined}
              onClick={() => handleSelect(idx)}
              disabled={selected !== null}
              style={{
                padding: '20px',
                borderRadius: '16px',
                background: bg,
                border,
                fontSize: '22px',
                fontWeight: 600,
                color: '#333',
                cursor: selected !== null ? 'default' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {opt}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
