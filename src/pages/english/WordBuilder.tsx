import { useState, useCallback } from 'react'
import { DndContext, DragEndEvent, useDraggable, useDroppable, PointerSensor, TouchSensor, useSensors, useSensor } from '@dnd-kit/core'
import { motion } from 'framer-motion'
import { WORDS } from '@/constants/english-data'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Confetti } from '@/components/common/Confetti'
import { useSound } from '@/hooks/useSound'
import { useUserStore } from '@/store/useUserStore'
import { shuffleArray } from '@/utils/random'

interface LetterTile {
  id: string
  letter: string
}

function DraggableLetter({ id, letter }: { id: string; letter: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id })

  const style: React.CSSProperties = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0.4 : 1,
    cursor: 'grab',
    touchAction: 'none',
    zIndex: isDragging ? 100 : 1,
  }

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <div
        style={{
          background: '#fff',
          border: '3px solid #66BB6A',
          borderRadius: '12px',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: 700,
          color: '#2E7D32',
          boxShadow: isDragging ? '0 8px 20px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'box-shadow 0.2s',
        }}
      >
        {letter}
      </div>
    </div>
  )
}

function LetterSlot({ id, index, value }: { id: string; index: number; value: string | null }) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      style={{
        width: '48px',
        height: '48px',
        border: isOver ? '3px solid #66BB6A' : value ? '3px solid #2E7D32' : '3px dashed #bbb',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isOver ? '#E8F5E9' : value ? '#C8E6C9' : '#fafafa',
        fontSize: '24px',
        fontWeight: 700,
        color: '#2E7D32',
        transition: 'all 0.2s',
      }}
    >
      {value || <span style={{ color: '#ccc', fontSize: '14px' }}>{index + 1}</span>}
    </div>
  )
}

function createTiles(word: typeof WORDS[0]): LetterTile[] {
  const letters = [...word.letters, 'x', 'z']
  const shuffled = shuffleArray(letters, Math.random)
  return shuffled.map((letter, i) => ({ id: `tile-${i}-${letter}`, letter }))
}

export function WordBuilder() {
  const [wordIdx, setWordIdx] = useState(0)
  const [slots, setSlots] = useState<(string | null)[]>(() => Array(WORDS[0].letters.length).fill(null))
  const [tiles, setTiles] = useState<LetterTile[]>(() => createTiles(WORDS[0]))
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [score, setScore] = useState(0)
  const { play } = useSound()
  const { addExp } = useUserStore()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } }),
  )

  const word = WORDS[wordIdx]

  const checkWord = useCallback((newSlots: (string | null)[]) => {
    if (newSlots.some(s => s === null)) return
    const spelled = newSlots.join('')
    if (spelled === word.english) {
      setResult('correct')
      setScore(s => s + 1)
      setShowConfetti(true)
      play('correct')
      addExp(10)
    } else {
      setResult('wrong')
      play('wrong')
    }
  }, [word, play, addExp])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const tileId = active.id as string
    const slotId = over.id as string

    if (!slotId.startsWith('slot-')) return
    const slotIdx = parseInt(slotId.replace('slot-', ''))

    // Find the tile that was dragged
    const tile = tiles.find(t => t.id === tileId)
    if (!tile) return

    // If slot already has a letter, return that tile back to available pool
    const oldLetter = slots[slotIdx]
    let updatedTiles = tiles.filter(t => t.id !== tileId)
    if (oldLetter !== null) {
      updatedTiles = [...updatedTiles, { id: `tile-ret-${Date.now()}-${oldLetter}`, letter: oldLetter }]
    }

    // Place letter in slot
    const newSlots = [...slots]
    newSlots[slotIdx] = tile.letter
    setSlots(newSlots)
    setTiles(updatedTiles)

    checkWord(newSlots)
  }

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
          {word.category === 'animals' ? '🐾' : word.category === 'fruits' ? '🍎' : word.category === 'colors' ? '🎨' : '📦'}
        </span>
        <p style={{ fontSize: '20px', color: '#333' }}>
          拼出: <strong>{word.chinese}</strong>
        </p>
      </Card>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        {/* 拼写槽 */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '32px' }}>
          {slots.map((val, i) => (
            <LetterSlot key={i} id={`slot-${i}`} index={i} value={val} />
          ))}
        </div>

        {/* 可拖拽字母 */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
          {tiles.map((tile) => (
            <DraggableLetter key={tile.id} id={tile.id} letter={tile.letter} />
          ))}
        </div>
      </DndContext>

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
              <Button variant="accent" onClick={nextWord}>Next Word</Button>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '18px', color: '#C62828', marginBottom: '16px' }}>Try again!</p>
              <Button variant="secondary" onClick={resetWord}>Reset</Button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
