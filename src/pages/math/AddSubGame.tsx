import { useState, useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MATH_LEVELS, generateQuestion, generateWrongAnswers, type MathQuestion, type MathLevel } from '@/constants/math-levels'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { ProgressBar } from '@/components/common/ProgressBar'
import { Confetti } from '@/components/common/Confetti'
import { ScoreEffect } from '@/components/common/ScoreEffect'
import { useSound } from '@/hooks/useSound'
import { useUserStore } from '@/store/useUserStore'
import { shuffleArray } from '@/utils/random'

// 根据 URL 参数获取对应的关卡组
function getLevelsForGroup(group: string | null): MathLevel[] {
  switch (group) {
    case 'add10':
      return MATH_LEVELS.filter(l => l.type === 'add' && l.maxNum <= 10)
    case 'sub10':
      return MATH_LEVELS.filter(l => l.type === 'sub' && l.maxNum <= 10)
    case 'add20':
      return MATH_LEVELS.filter(l => l.type === 'add' && l.maxNum > 10 && l.maxNum <= 20)
    case 'sub20':
      return MATH_LEVELS.filter(l => l.type === 'sub' && l.maxNum > 10 && l.maxNum <= 20)
    case 'mix20':
      // 只匹配有 ops=['+','-'] 的加减混合关卡，范围 <=20
      return MATH_LEVELS.filter(l => l.ops && l.maxNum <= 20)
    case 'add100':
      return MATH_LEVELS.filter(l => l.type === 'add' && l.maxNum > 20)
    case 'sub100':
      return MATH_LEVELS.filter(l => l.type === 'sub' && l.maxNum > 20)
    case 'mix100':
      // 连加连减混合：有 ops=['+','-'] 且范围 >20
      return MATH_LEVELS.filter(l => l.ops && l.maxNum > 20)
    case 'mul':
      return MATH_LEVELS.filter(l => l.type === 'mul')
    default:
      return MATH_LEVELS.filter(l => l.type === 'add' || l.type === 'sub')
  }
}

function getGroupTitle(group: string | null): string {
  switch (group) {
    case 'add10': return '10以内加法'
    case 'sub10': return '10以内减法'
    case 'add20': return '20以内加法'
    case 'sub20': return '20以内减法'
    case 'mix20': return '20以内加减混合'
    case 'add100': return '100以内加法'
    case 'sub100': return '100以内减法'
    case 'mix100': return '连加连减混合运算'
    case 'mul': return '乘法表练习'
    default: return '加减法闯关'
  }
}

export function AddSubGame() {
  const [searchParams] = useSearchParams()
  const group = searchParams.get('group')

  const levels = useMemo(() => {
    const filtered = getLevelsForGroup(group)
    return filtered.length > 0 ? filtered : [MATH_LEVELS[0]]
  }, [group])

  const title = getGroupTitle(group)

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
  const [comboText, setComboText] = useState<string | null>(null)
  const { comboCorrect, comboWrong, comboReset } = useSound()
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
      const result = comboCorrect()
      if (result) {
        setComboText(result.phrase)
        setTimeout(() => setComboText(null), 1200)
      }
      setScore(s => s + 1)
      const newStreak = streak + 1
      setStreak(newStreak)
      addExp(streak >= 5 ? 15 : 10)
      // 连续答对10题触发徽章
      if (newStreak === 10) {
        import('@/utils/badge-checker').then(({ checkBadges }) => checkBadges({ mathStreak: 10 }))
      }
    } else {
      comboWrong()
      setStreak(0)
      import('@/utils/wrongAnswer').then(({ recordWrongAnswer }) =>
        recordWrongAnswer({ subject: 'math', questionType: 'addition', question: question.displayText, userAnswer: String(val), correctAnswer: String(question.answer) })
      )
    }

    setTimeout(nextQuestion, 1200)
  }

  const nextLevel = () => {
    if (levelIdx + 1 < levels.length) {
      setLevelIdx(i => i + 1)
      setQuestionIdx(0)
      setScore(0)
      setStreak(0)
      setLevelComplete(false)
      setShowConfetti(false)
      comboReset()
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
          {streak >= 5 && (
            <p style={{ fontSize: '14px', color: '#FFA726', marginBottom: '16px' }}>
              连续答对 {streak} 题！经验加成！
            </p>
          )}
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
        <div>
          <h2 style={{ fontSize: '20px', color: '#E65100' }}>{title}</h2>
          <p style={{ fontSize: '13px', color: '#999', marginTop: '2px' }}>{level.name}</p>
        </div>
        <span style={{
          fontSize: '18px',
          fontWeight: 700,
          color: streak >= 5 ? '#E91E63' : streak >= 3 ? '#FF6D00' : '#FF8F00',
          position: 'relative',
          background: 'linear-gradient(135deg, #FFF8E1, #FFECB3)',
          padding: '4px 14px',
          borderRadius: '20px',
          boxShadow: '0 2px 8px rgba(255,152,0,0.2)',
        }}>
          {streak >= 3 && <span>🔥×{streak} </span>}
          ⭐ {score}
          <ScoreEffect trigger={score} points={streak >= 5 ? 15 : 10} />
        </span>
      </div>

      <ProgressBar value={questionIdx / level.questionCount} color="#FFA726" />

      <Card color="#fff" style={{ padding: '48px 32px', textAlign: 'center', margin: '24px 0', position: 'relative', overflow: 'visible' }}>
        {/* Combo 文字弹出 */}
        <AnimatePresence>
          {comboText && (
            <motion.div
              key={comboText + questionIdx}
              initial={{ scale: 0.3, opacity: 0, y: 20 }}
              animate={{ scale: 1.2, opacity: 1, y: -30 }}
              exit={{ scale: 0.8, opacity: 0, y: -60 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
              style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '28px',
                fontWeight: 900,
                color: streak >= 5 ? '#E91E63' : streak >= 3 ? '#FF9800' : '#4CAF50',
                textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                zIndex: 10,
                whiteSpace: 'nowrap',
              }}
            >
              {comboText}! 🎯
            </motion.div>
          )}
        </AnimatePresence>
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
