import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HanziWriter from 'hanzi-writer'
import { CHARACTERS } from '@/constants/chinese-data'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { useSound } from '@/hooks/useSound'

interface HanziWriterDisplayProps {
  char: string
  writerRef: React.MutableRefObject<HanziWriter | null>
}

function HanziWriterDisplay({
  char,
  writerRef,
}: HanziWriterDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clear previous instance
    containerRef.current.innerHTML = ''
    writerRef.current = null

    const writer = HanziWriter.create(containerRef.current, char, {
      width: 240,
      height: 240,
      padding: 16,
      showOutline: true,
      showCharacter: false,
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 300,
      strokeColor: '#333',
      outlineColor: '#FFCDD2',
      radicalColor: '#C2185B',
      drawingColor: '#C2185B',
      highlightColor: '#E53935',
      highlightOnComplete: true,
      // Callback handlers
      onLoadCharDataSuccess: () => {
        // Character loaded successfully
      },
      onLoadCharDataError: () => {
        // Show the character as fallback if data can't be loaded
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div style="width:240px;height:240px;display:flex;align-items:center;justify-content:center;
              border:2px solid #e57373;border-radius:16px;background:#fff;">
              <span style="font-size:120px;color:#FFCDD2;font-family:KaiTi,STKaiti,楷体,serif;">${char}</span>
            </div>`
        }
      },
    })

    writerRef.current = writer

    return () => {
      writerRef.current = null
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [char])

  return (
    <div
      ref={containerRef}
      style={{
        width: '240px',
        height: '240px',
        margin: '0 auto',
        position: 'relative',
        borderRadius: '16px',
        border: '2px solid #e57373',
        overflow: 'hidden',
        background: '#fff',
        // Draw 田字格 grid lines via CSS
        backgroundImage: `
          linear-gradient(to right, transparent 49.5%, #f0d0d0 49.5%, #f0d0d0 50.5%, transparent 50.5%),
          linear-gradient(to bottom, transparent 49.5%, #f0d0d0 49.5%, #f0d0d0 50.5%, transparent 50.5%)
        `,
      }}
    />
  )
}

export function StrokeOrder() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentStroke, setCurrentStroke] = useState(-1)
  const [animationDone, setAnimationDone] = useState(false)
  const writerRef = useRef<HanziWriter | null>(null)
  const { play } = useSound()

  const char = CHARACTERS[selectedIdx]

  const playAnimation = useCallback(() => {
    if (!writerRef.current || isAnimating) return

    setIsAnimating(true)
    setAnimationDone(false)
    setCurrentStroke(0)
    play('pop')

    writerRef.current.animateCharacter({
      onComplete: () => {
        setIsAnimating(false)
        setAnimationDone(true)
        setCurrentStroke(-1)
        play('correct')
      },
    })
  }, [isAnimating, play])

  const handleQuizMode = useCallback(() => {
    if (!writerRef.current || isAnimating) return

    setIsAnimating(true)
    setAnimationDone(false)
    setCurrentStroke(0)

    writerRef.current.quiz({
      onMistake: () => {
        play('wrong')
      },
      onCorrectStroke: (strokeData) => {
        setCurrentStroke(strokeData.strokeNum + 1)
        play('tick')
      },
      onComplete: () => {
        setIsAnimating(false)
        setAnimationDone(true)
        setCurrentStroke(-1)
        play('correct')
      },
    })
  }, [isAnimating, play])

  const handleSelectChar = (i: number) => {
    if (writerRef.current) {
      writerRef.current.cancelQuiz()
    }
    setSelectedIdx(i)
    setCurrentStroke(-1)
    setIsAnimating(false)
    setAnimationDone(false)
    play('click')
  }

  const handleReset = useCallback(() => {
    if (!writerRef.current) return
    writerRef.current.cancelQuiz()
    writerRef.current.hideCharacter()
    writerRef.current.showOutline()
    setIsAnimating(false)
    setAnimationDone(false)
    setCurrentStroke(-1)
  }, [])

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#C2185B' }}>汉字笔顺</h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
        选择汉字，观看笔顺动画或手写练习
      </p>

      {/* 汉字选择网格 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
          gap: '8px',
          marginBottom: '32px',
        }}
      >
        {CHARACTERS.map((c, i) => (
          <motion.button
            key={c.char}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelectChar(i)}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              border: selectedIdx === i ? '3px solid #C2185B' : '2px solid #e0e0e0',
              background: selectedIdx === i ? '#FCE4EC' : '#fff',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {c.char}
          </motion.button>
        ))}
      </div>

      {/* 详情展示 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={char.char}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Card color="#fff" style={{ textAlign: 'center', padding: '32px' }}>
            {/* hanzi-writer 描红演示区 */}
            <div style={{ marginBottom: '24px' }}>
              <HanziWriterDisplay
                char={char.char}
                writerRef={writerRef}
              />
            </div>

            {/* 汉字信息 */}
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '18px', color: '#333', marginBottom: '4px' }}>
                <strong>{char.char}</strong> ({char.pinyin}) — {char.meaning}
              </p>
              <p style={{ fontSize: '14px', color: '#666' }}>
                笔画数: {char.strokes} 画
              </p>
            </div>

            {/* 笔顺步骤 */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>笔顺：</p>
              <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {char.strokeOrder.map((stroke, i) => {
                  let bg = '#f5f5f5'
                  let color = '#999'
                  let scale = 1
                  if (isAnimating && currentStroke === i) {
                    bg = '#C2185B'
                    color = '#fff'
                    scale = 1.15
                  } else if ((isAnimating && currentStroke > i) || animationDone) {
                    bg = '#E8F5E9'
                    color = '#2E7D32'
                  }

                  return (
                    <motion.span
                      key={i}
                      animate={{ background: bg, color, scale }}
                      transition={{ duration: 0.2 }}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 600,
                        display: 'inline-block',
                      }}
                    >
                      {i + 1}.{stroke}
                    </motion.span>
                  )
                })}
              </div>
            </div>

            {/* 动画完成提示 */}
            {animationDone && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: '16px', color: '#2E7D32', marginBottom: '16px', fontWeight: 600 }}
              >
                书写完成！
              </motion.p>
            )}

            {/* 操作按钮 */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="primary"
                onClick={playAnimation}
                disabled={isAnimating}
              >
                {isAnimating ? '描红中...' : animationDone ? '🔄 重新演示' : '✍️ 笔顺演示'}
              </Button>
              <Button
                variant="accent"
                onClick={handleQuizMode}
                disabled={isAnimating}
              >
                ✏️ 手写练习
              </Button>
              {(isAnimating || animationDone) && (
                <Button
                  variant="secondary"
                  onClick={handleReset}
                >
                  重置
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
