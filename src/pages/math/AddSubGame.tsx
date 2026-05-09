import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { MATH_LEVELS, generateQuestion, generateWrongAnswers, type MathQuestion } from '@/constants/math-levels'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { ProgressBar } from '@/components/common/ProgressBar'
import { Confetti } from '@/components/common/Confetti'
import { useSound } from '@/hooks/useSound'
import { useUserStore } from '@/store/useUserStore'
import { shuffleArray } from '@/utils/random'

export function AddSubGame() {
  const levels = MATH_LEVELS.filter(l => l.type === 'add' || l.type === 'sub')
  const [levelIdx, setLevelIdx] = useState(0)
  const [questionIdx, setQuestionIdx] = useState(0)

  const [initialData] = useState(() => {
    const q = generateQuestion(levels[0])
    const wrongs = generateWrongAnswers(q.answer, 3)
    return { q, opts: shuffleArray([q.answer, ...wrongs], Math.random) }
  })
  const [question, setQuestion] = useState<MathQuestion>(initialData.q)
  const [options, setOptions] = useState<number[]>(initialData.opts)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [levelComplete, setLevelComplete] = useState(false)
  const { play } = useSound()
  const { addExp } = useUserStore()

  const level = levels[levelIdx]

  const nextQuestion = useCallback(() => {
    if (questionIdx + 1 >= level.questionCount) {
      setLevelComplete(true)
      setShowConfetti(true)
      return
    }
    const q = generateQuestion(level)
    const wrongs = generateWrongAnswers(q.answer, 3)
    setQuestion(q)
    setOptions(shuffleArray([q.answer, ...wrongs], Math.random))
    setQuestionIdx(i => i + 1)
    setSelected(null)
  }, [questionIdx, level])

  const handleSelect = (val: number) => {
    if (selected !== null) return
    setSelected(val)

    if (val === question.answer) {
      play('correct')
      setScore(s => s + 1)
      setStreak(s => s + 1)
      addExp(streak >= 5 ? 15 : 10)
    } else {
      play('wrong')
      setStreak(0)
    }

    setTimeout(nextQuestion, 1000)
  }

  const nextLevel = () => {
    if (levelIdx + 1 < levels.length) {
      setLevelIdx(i => i + 1)
      setQuestionIdx(0)
      setScore(0)
      setStreak(0)
      setLevelComplete(false)
      setShowConfetti(false)
      const q = generateQuestion(levels[levelIdx + 1])
      const wrongs = generateWrongAnswers(q.answer, 3)
      setQuestion(q)
      setOptions(shuffleArray([q.answer, ...wrongs], Math.random))
      setSelected(null)
    }
  }

  if (levelComplete) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <Confetti fire={showConfetti} />
        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
          <span style={{ fontSize: '64px', display: 'block', marginBottom: '16px' }}>🎉</span>
          <h2 style={{ fontSize: '28px', marginBottom: '12px' }}>关卡完成！</h2>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '8px' }}>{level.name}</p>
          <p style={{ fontSize: '22px', color: '#E65100', marginBottom: '24px' }}>
            得分：{score} / {level.questionCount}
          </p>
          {levelIdx + 1 < levels.length ? (
            <Button variant="secondary" onClick={nextLevel}>下一关 →</Button>
          ) : (
            <Button onClick={() => window.location.reload()}>全部完成！再来一次</Button>
          )}
        </motion.div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '20px', color: '#E65100' }}>{level.name}</h2>
        <span style={{ fontSize: '16px', color: '#666' }}>
          {streak >= 3 && <span style={{ color: '#FFA726' }}>🔥×{streak} </span>}
          得分: {score}
        </span>
      </div>

      <ProgressBar value={questionIdx / level.questionCount} color="#FFA726" />

      <Card color="#fff" style={{ padding: '48px 32px', textAlign: 'center', margin: '24px 0' }}>
        <motion.div
          key={`${levelIdx}-${questionIdx}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
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
              key={idx}
              whileHover={selected === null ? { scale: 1.03 } : undefined}
              whileTap={selected === null ? { scale: 0.97 } : undefined}
              onClick={() => handleSelect(opt)}
              disabled={selected !== null}
              style={{
                padding: '24px',
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
    </div>
  )
}
