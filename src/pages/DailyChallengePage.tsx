import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import dayjs from 'dayjs'
import { Card } from '@/components/common/Card'
import { ProgressBar } from '@/components/common/ProgressBar'
import { Confetti } from '@/components/common/Confetti'
import { useSound } from '@/hooks/useSound'
import { useUserStore } from '@/store/useUserStore'
import { seededRandom, pickRandom } from '@/utils/random'
import type { ChallengeQuestion } from '@/types'
import { SPELLING_COMBOS } from '@/constants/pinyin-data'
import { IDIOMS } from '@/constants/chinese-data'
import { WORDS } from '@/constants/english-data'

function generateDailyQuestions(date: string): ChallengeQuestion[] {
  const rng = seededRandom(date)
  const questions: ChallengeQuestion[] = []

  // 拼音题
  const pinyinCombo = pickRandom(SPELLING_COMBOS, 1, rng)[0]
  const pinyinWrongs = pickRandom(SPELLING_COMBOS.filter(c => c.result !== pinyinCombo.result), 3, rng)
  const pinyinOptions = [pinyinCombo.result, ...pinyinWrongs.map(w => w.result)].sort(() => rng() - 0.5)
  questions.push({
    id: 'daily-pinyin',
    subject: 'pinyin',
    question: `哪个拼音的含义是「${pinyinCombo.meaning}」？`,
    options: pinyinOptions,
    correctIndex: pinyinOptions.indexOf(pinyinCombo.result),
    explanation: `正确答案是 ${pinyinCombo.result}（${pinyinCombo.meaning}）`,
  })

  // 数学题
  const a = Math.floor(rng() * 20) + 5
  const b = Math.floor(rng() * 15) + 1
  const mathAnswer = a + b
  const mathWrongs = [mathAnswer + 1, mathAnswer - 2, mathAnswer + 3].map(String)
  const mathOptions = [String(mathAnswer), ...mathWrongs].sort(() => rng() - 0.5)
  questions.push({
    id: 'daily-math',
    subject: 'math',
    question: `${a} + ${b} = ?`,
    options: mathOptions,
    correctIndex: mathOptions.indexOf(String(mathAnswer)),
    explanation: `${a} + ${b} = ${mathAnswer}`,
  })

  // 英语/语文题(交替)
  if (Math.floor(rng() * 2) === 0) {
    const word = pickRandom(WORDS, 1, rng)[0]
    const wrongWords = pickRandom(WORDS.filter(w => w.english !== word.english), 3, rng)
    const engOptions = [word.chinese, ...wrongWords.map(w => w.chinese)].sort(() => rng() - 0.5)
    questions.push({
      id: 'daily-english',
      subject: 'english',
      question: `"${word.english}" 的中文意思是？`,
      options: engOptions,
      correctIndex: engOptions.indexOf(word.chinese),
      explanation: `${word.english} = ${word.chinese}`,
    })
  } else {
    const idiom = pickRandom(IDIOMS, 1, rng)[0]
    const wrongIdioms = pickRandom(IDIOMS.filter(i => i.idiom !== idiom.idiom), 3, rng)
    const meanings = [idiom.meaning.slice(0, 20) + '...', ...wrongIdioms.map(i => i.meaning.slice(0, 20) + '...')].sort(() => rng() - 0.5)
    questions.push({
      id: 'daily-chinese',
      subject: 'chinese',
      question: `成语「${idiom.idiom}」是什么意思？`,
      options: meanings,
      correctIndex: meanings.indexOf(idiom.meaning.slice(0, 20) + '...'),
      explanation: idiom.meaning,
    })
  }

  return questions
}

export function DailyChallengePage() {
  const today = dayjs().format('YYYY-MM-DD')
  const questions = useMemo(() => generateDailyQuestions(today), [today])
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
      setScore(s => s + 1)
      addExp(15)
    } else {
      play('wrong')
    }

    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ(q => q + 1)
        setSelected(null)
      } else {
        setFinished(true)
        if (score + (idx === question.correctIndex ? 1 : 0) === questions.length) {
          setShowConfetti(true)
        }
      }
    }, 1500)
  }, [selected, currentQ, question, questions.length, score, play, addExp])

  if (finished) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <Confetti fire={showConfetti} />
        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
          <span style={{ fontSize: '64px', display: 'block', marginBottom: '16px' }}>
            {score === questions.length ? '🏆' : '⭐'}
          </span>
          <h2 style={{ fontSize: '28px', marginBottom: '12px' }}>今日挑战完成！</h2>
          <p style={{ fontSize: '20px', color: '#666', marginBottom: '8px' }}>
            得分：{score} / {questions.length}
          </p>
          {score === questions.length && (
            <p style={{ fontSize: '16px', color: '#FFA726', marginBottom: '16px' }}>
              全部答对！太厉害了！
            </p>
          )}
          <p style={{ fontSize: '14px', color: '#999' }}>
            明天再来挑战吧！
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #FFD54F, #FFA726)',
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '24px',
          color: '#333',
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '4px' }}>🎯 每日挑战</h2>
        <p style={{ fontSize: '14px' }}>{today} | 每天 3 道跨学科趣味题</p>
      </motion.div>

      <ProgressBar value={currentQ / questions.length} color="#FFA726" label={`第 ${currentQ + 1} / ${questions.length} 题`} />

      <Card color="#fff" style={{ padding: '32px', margin: '24px 0', textAlign: 'center' }}>
        <span style={{
          display: 'inline-block',
          padding: '4px 12px',
          borderRadius: '12px',
          background: question.subject === 'pinyin' ? '#E3F2FD' : question.subject === 'math' ? '#FFF3E0' : question.subject === 'chinese' ? '#FCE4EC' : '#E8F5E9',
          fontSize: '12px',
          color: '#666',
          marginBottom: '16px',
        }}>
          {question.subject === 'pinyin' ? '拼音' : question.subject === 'math' ? '数学' : question.subject === 'chinese' ? '语文' : '英语'}
        </span>
        <motion.p
          key={currentQ}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '20px', fontWeight: 600 }}
        >
          {question.question}
        </motion.p>
      </Card>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {question.options.map((opt, idx) => {
          let bg = '#f8f8f8'
          let border = '2px solid transparent'
          if (selected !== null) {
            if (idx === question.correctIndex) { bg = '#E8F5E9'; border = '2px solid #66BB6A' }
            else if (idx === selected) { bg = '#FFEBEE'; border = '2px solid #EF5350' }
          }

          return (
            <motion.button
              key={idx}
              whileHover={selected === null ? { scale: 1.02 } : undefined}
              whileTap={selected === null ? { scale: 0.98 } : undefined}
              onClick={() => handleSelect(idx)}
              disabled={selected !== null}
              style={{
                padding: '16px 20px',
                borderRadius: '14px',
                background: bg,
                border,
                fontSize: '16px',
                color: '#333',
                cursor: selected !== null ? 'default' : 'pointer',
                textAlign: 'left',
              }}
            >
              {opt}
            </motion.button>
          )
        })}
      </div>

      {selected !== null && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ marginTop: '16px', fontSize: '14px', color: '#666', textAlign: 'center' }}
        >
          {question.explanation}
        </motion.p>
      )}
    </div>
  )
}
