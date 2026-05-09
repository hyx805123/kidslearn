import { useState } from 'react'
import { motion } from 'framer-motion'
import { DIALOGS } from '@/constants/english-data'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { useSound } from '@/hooks/useSound'
import { useUserStore } from '@/store/useUserStore'

export function DialogScene() {
  const [sceneIdx, setSceneIdx] = useState(0)
  const [lineIdx, setLineIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const { play } = useSound()
  const { addExp } = useUserStore()

  const scene = DIALOGS[sceneIdx]
  const line = scene.lines[lineIdx]

  const handleOptionSelect = (idx: number) => {
    if (selectedOption !== null) return
    setSelectedOption(idx)

    if (line.correctOption !== undefined && idx === line.correctOption) {
      play('correct')
      setScore(s => s + 1)
      addExp(10)
    } else {
      play('wrong')
    }

    setTimeout(() => {
      if (lineIdx + 1 < scene.lines.length) {
        setLineIdx(l => l + 1)
        setSelectedOption(null)
      } else {
        setCompleted(true)
      }
    }, 1500)
  }

  const nextScene = () => {
    setSceneIdx((i) => (i + 1) % DIALOGS.length)
    setLineIdx(0)
    setSelectedOption(null)
    setCompleted(false)
  }

  const resetScene = () => {
    setLineIdx(0)
    setSelectedOption(null)
    setCompleted(false)
    setScore(0)
  }

  if (completed) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
          <span style={{ fontSize: '64px', display: 'block', marginBottom: '16px' }}>🎭</span>
          <h2 style={{ fontSize: '28px', marginBottom: '12px' }}>对话完成！</h2>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '24px' }}>
            {scene.titleChinese} — 得分: {score}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Button variant="ghost" onClick={resetScene}>重新练习</Button>
            <Button variant="accent" onClick={nextScene}>下一场景 →</Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', color: '#2E7D32' }}>情景对话</h2>
        <span style={{ fontSize: '14px', color: '#666' }}>{scene.titleChinese}</span>
      </div>

      {/* 对话历史 */}
      <div style={{ marginBottom: '24px' }}>
        {scene.lines.slice(0, lineIdx + 1).map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: l.speaker === 'A' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              display: 'flex',
              justifyContent: l.speaker === 'A' ? 'flex-start' : 'flex-end',
              marginBottom: '12px',
            }}
          >
            <div style={{
              maxWidth: '75%',
              padding: '12px 20px',
              borderRadius: l.speaker === 'A' ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
              background: l.speaker === 'A' ? '#E8F5E9' : '#E3F2FD',
            }}>
              <p style={{ fontSize: '16px', color: '#333', marginBottom: '4px' }}>{l.english}</p>
              <p style={{ fontSize: '12px', color: '#666' }}>{l.chinese}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 选项区 */}
      {line.options && !completed && (
        <Card color="#fff" style={{ padding: '24px' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>选择正确的回答:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {line.options.map((opt, idx) => {
              let bg = '#f5f5f5'
              let border = '2px solid transparent'
              if (selectedOption !== null) {
                if (idx === line.correctOption) { bg = '#E8F5E9'; border = '2px solid #66BB6A' }
                else if (idx === selectedOption) { bg = '#FFEBEE'; border = '2px solid #EF5350' }
              }

              return (
                <motion.button
                  key={idx}
                  whileHover={selectedOption === null ? { scale: 1.02 } : undefined}
                  whileTap={selectedOption === null ? { scale: 0.98 } : undefined}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={selectedOption !== null}
                  style={{
                    padding: '14px 20px',
                    borderRadius: '12px',
                    background: bg,
                    border,
                    fontSize: '15px',
                    color: '#333',
                    cursor: selectedOption !== null ? 'default' : 'pointer',
                    textAlign: 'left',
                  }}
                >
                  {opt}
                </motion.button>
              )
            })}
          </div>
        </Card>
      )}

      {/* 非选择行的继续按钮 */}
      {!line.options && !completed && (
        <div style={{ textAlign: 'center' }}>
          <Button
            variant="accent"
            onClick={() => {
              if (lineIdx + 1 < scene.lines.length) setLineIdx(l => l + 1)
              else setCompleted(true)
            }}
          >
            继续 →
          </Button>
        </div>
      )}
    </div>
  )
}
