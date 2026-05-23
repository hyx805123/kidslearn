import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { DndContext, DragEndEvent, useDraggable, useDroppable, PointerSensor, TouchSensor, useSensors, useSensor } from '@dnd-kit/core'
import { SPELLING_COMBOS, INITIALS, FINALS } from '@/constants/pinyin-data'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { Confetti } from '@/components/common/Confetti'
import { useSound } from '@/hooks/useSound'
import { useUserStore } from '@/store/useUserStore'
import { pinyinAudio } from '@/utils/audio'

function DraggableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id })

  const style: React.CSSProperties = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
    touchAction: 'none',
    zIndex: isDragging ? 100 : 1,
  }

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <div
        style={{
          background: '#fff',
          border: '3px solid #4FC3F7',
          borderRadius: '12px',
          padding: '12px 20px',
          fontSize: '24px',
          fontWeight: 700,
          color: '#1976D2',
          minWidth: '60px',
          textAlign: 'center',
          boxShadow: isDragging ? '0 8px 20px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'box-shadow 0.2s',
        }}
      >
        {children}
      </div>
    </div>
  )
}

function DroppableSlot({ id, label, value }: { id: string; label: string; value: string | null }) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      style={{
        width: '100px',
        height: '80px',
        border: isOver ? '3px solid #4FC3F7' : '3px dashed #bbb',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: isOver ? '#E3F2FD' : value ? '#E8F5E9' : '#fafafa',
        transition: 'all 0.2s',
      }}
    >
      {value ? (
        <span style={{ fontSize: '28px', fontWeight: 700, color: '#1976D2' }}>{value}</span>
      ) : (
        <span style={{ fontSize: '14px', color: '#999' }}>{label}</span>
      )}
    </div>
  )
}

export function SpellingGame() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [initialSlot, setInitialSlot] = useState<string | null>(null)
  const [finalSlot, setFinalSlot] = useState<string | null>(null)
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const [score, setScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const { play, comboCorrect, comboWrong } = useSound()
  const { addExp } = useUserStore()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } }),
  )

  const combo = SPELLING_COMBOS[currentIndex]
  const availableInitials = [combo.initial, ...INITIALS.slice(0, 4).map(i => i.char).filter(c => c !== combo.initial)].slice(0, 4)
  const availableFinals = [combo.final, ...FINALS.slice(0, 4).map(f => f.char).filter(c => c !== combo.final)].slice(0, 4)

  const checkResult = useCallback((initial: string | null, final: string | null) => {
    if (!initial || !final) return
    if (initial === combo.initial && final === combo.final) {
      setResult('correct')
      setScore(s => s + 1)
      setShowConfetti(true)
      comboCorrect()
      addExp(10)
      // 拼读正确后朗读该音节
      setTimeout(() => {
        pinyinAudio.playCombo(combo.result)
      }, 500)
    } else {
      setResult('wrong')
      comboWrong()
    }
  }, [combo, comboCorrect, comboWrong, addExp])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const draggedId = active.id as string
    const droppedOn = over.id as string

    if (droppedOn === 'initial-slot' && draggedId.startsWith('initial-')) {
      const val = draggedId.replace('initial-', '')
      setInitialSlot(val)
      checkResult(val, finalSlot)
    } else if (droppedOn === 'final-slot' && draggedId.startsWith('final-')) {
      const val = draggedId.replace('final-', '')
      setFinalSlot(val)
      checkResult(initialSlot, val)
    }
  }

  const nextQuestion = () => {
    setInitialSlot(null)
    setFinalSlot(null)
    setResult(null)
    setShowConfetti(false)
    setCurrentIndex((i) => (i + 1) % SPELLING_COMBOS.length)
  }

  const reset = () => {
    setInitialSlot(null)
    setFinalSlot(null)
    setResult(null)
  }

  return (
    <div>
      <Confetti fire={showConfetti} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', color: '#1976D2' }}>拼读游戏</h2>
        <span style={{ fontSize: '18px', color: '#666' }}>得分: {score}</span>
      </div>

      <Card color="#fff" style={{ padding: '32px', marginBottom: '24px' }}>
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#333', marginBottom: '8px' }}>
          拼出含义为「<strong>{combo.meaning}</strong>」的音节
        </p>
        <p style={{ textAlign: 'center', fontSize: '14px', color: '#999' }}>
          点击或拖拽声母和韵母到对应位置
        </p>
      </Card>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        {/* 拼读槽 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '32px', alignItems: 'center' }}>
          <DroppableSlot id="initial-slot" label="声母" value={initialSlot} />
          <span style={{ fontSize: '32px', color: '#999' }}>+</span>
          <DroppableSlot id="final-slot" label="韵母" value={finalSlot} />
          <span style={{ fontSize: '32px', color: '#999' }}>=</span>
          <div style={{
            width: '100px', height: '80px', borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: result === 'correct' ? '#E8F5E9' : result === 'wrong' ? '#FFEBEE' : '#f5f5f5',
            border: result === 'correct' ? '3px solid #66BB6A' : result === 'wrong' ? '3px solid #EF5350' : '3px solid #ddd',
          }}>
            <span style={{ fontSize: '24px', fontWeight: 700, color: result === 'correct' ? '#2E7D32' : result === 'wrong' ? '#C62828' : '#999' }}>
              {result === 'correct' ? combo.result : result === 'wrong' ? '✗' : '?'}
            </span>
          </div>
        </div>

        {/* 声母选项 - 支持点击直接放入 */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>声母:</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {availableInitials.map(c => (
              <div key={`initial-${c}`} onClick={() => { if (!result) { setInitialSlot(c); play('click'); checkResult(c, finalSlot) } }}>
                <DraggableItem id={`initial-${c}`}>{c}</DraggableItem>
              </div>
            ))}
          </div>
        </div>

        {/* 韵母选项 - 支持点击直接放入 */}
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>韵母:</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {availableFinals.map(c => (
              <div key={`final-${c}`} onClick={() => { if (!result) { setFinalSlot(c); play('click'); checkResult(initialSlot, c) } }}>
                <DraggableItem id={`final-${c}`}>{c}</DraggableItem>
              </div>
            ))}
          </div>
        </div>
      </DndContext>

      {/* 结果反馈 */}
      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', marginTop: '16px' }}
        >
          {result === 'correct' ? (
            <div>
              <p style={{ fontSize: '20px', color: '#2E7D32', marginBottom: '16px' }}>
                太棒了！{combo.result} = {combo.meaning} ✓
              </p>
              <Button variant="accent" onClick={nextQuestion}>下一题 →</Button>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '18px', color: '#C62828', marginBottom: '16px' }}>
                再试一次吧！
              </p>
              <Button variant="secondary" onClick={reset}>重新拼读</Button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
