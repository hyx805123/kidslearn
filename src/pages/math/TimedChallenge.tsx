import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { MATH_LEVELS, generateQuestion, generateWrongAnswers, type MathQuestion } from '@/constants/math-levels'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { Confetti } from '@/components/common/Confetti'
import { useSound } from '@/hooks/useSound'
import { useUserStore } from '@/store/useUserStore'
import { useTimer } from '@/hooks/useTimer'
import { shuffleArray } from '@/utils/random'

export function TimedChallenge() {
  const [started, setStarted] = useState(false)
  const [question, setQuestion] = useState<MathQuestion | null>(null)
  const [options, setOptions] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)
  const [finished, setFinished] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { play } = useSound()
  const { addExp } = useUserStore()

  const level = MATH_LEVELS[8] // mixed 1-20

  const onTimeUp = useCallback(() => {
    setFinished(true)
    if (score >= 8) setShowConfetti(true)
  }, [score])

  const { time, start, formatted } = useTimer({
    initialTime: 60,
    countdown: true,
    onComplete: onTimeUp,
  })

  const genNewQuestion = () => {
    const q = generateQuestion(level)
    const wrongs = generateWrongAnswers(q.answer, 3)
    setQuestion(q)
    setOptions(shuffleArray([q.answer, ...wrongs], Math.random))
    setSelected(null)
  }

  const handleStart = () => {
    setStarted(true)
    start()
    genNewQuestion()
  }

  const handleSelect = (val: number) => {
    if (selected !== null || !question) return
    setSelected(val)
    setTotalAnswered(t => t + 1)

    if (val === question.answer) {
      play('correct')
      setScore(s => s + 1)
      addExp(10)
    } else {
      play('wrong')
    }

    setTimeout(genNewQuestion, 600)
  }

  if (!started) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <span style={{ fontSize: '64px', display: 'block', marginBottom: '16px' }}>⏱️</span>
        <h2 style={{ fontSize: '28px', marginBottom: '12px' }}>计时挑战</h2>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px' }}>
          60秒内答对尽可能多的数学题！
        </p>
        <Button variant="secondary" size="lg" onClick={handleStart}>开始挑战！</Button>
      </div>
    )
  }

  if (finished) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <Confetti fire={showConfetti} />
        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
          <span style={{ fontSize: '64px', display: 'block', marginBottom: '16px' }}>
            {score >= 15 ? '🏆' : score >= 10 ? '🌟' : score >= 5 ? '⭐' : '💪'}
          </span>
          <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>挑战结束！</h2>
          <p style={{ fontSize: '20px', color: '#E65100', marginBottom: '8px' }}>
            答对: {score} / {totalAnswered}
          </p>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px' }}>
            正确率: {totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0}%
          </p>
          <Button onClick={() => window.location.reload()}>再来一次</Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', color: '#E65100' }}>计时挑战</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', color: '#666' }}>✓ {score}</span>
          <span style={{
            fontSize: '24px',
            fontWeight: 700,
            color: time <= 10 ? '#EF5350' : '#E65100',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {formatted}
          </span>
        </div>
      </div>

      {question && (
        <>
          <Card color="#fff" style={{ padding: '48px 32px', textAlign: 'center', marginBottom: '24px' }}>
            <motion.div
              key={totalAnswered}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.15 }}
            >
              <span style={{ fontSize: '48px', fontWeight: 700, color: '#333' }}>
                {question.displayText}
              </span>
            </motion.div>
          </Card>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {options.map((opt, idx) => {
              let bg = '#FFF3E0'
              let border = '3px solid transparent'
              if (selected !== null) {
                if (opt === question.answer) { bg = '#E8F5E9'; border = '3px solid #66BB6A' }
                else if (opt === selected) { bg = '#FFEBEE'; border = '3px solid #EF5350' }
              }
              return (
                <motion.button
                  key={`${totalAnswered}-${idx}`}
                  whileTap={selected === null ? { scale: 0.97 } : undefined}
                  onClick={() => handleSelect(opt)}
                  disabled={selected !== null}
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    background: bg,
                    border,
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#333',
                    cursor: selected !== null ? 'default' : 'pointer',
                  }}
                >
                  {opt}
                </motion.button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
