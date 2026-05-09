import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CHARACTERS } from '@/constants/chinese-data'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { useSound } from '@/hooks/useSound'

// Map stroke type to reveal direction for animation
function getStrokeDirection(strokeName: string): 'ltr' | 'ttb' | 'rtl-down' | 'ltr-down' | 'radial' {
  if (strokeName.includes('横')) return 'ltr'
  if (strokeName.includes('竖') || strokeName.includes('竖钩')) return 'ttb'
  if (strokeName.includes('撇')) return 'rtl-down'
  if (strokeName.includes('捺')) return 'ltr-down'
  if (strokeName.includes('点')) return 'radial'
  if (strokeName.includes('折')) return 'ltr'
  return 'ttb'
}

interface StrokeCanvasProps {
  char: string
  strokes: number
  strokeOrder: string[]
  currentStroke: number
  isAnimating: boolean
}

function StrokeCanvas({ char, strokes, strokeOrder, currentStroke, isAnimating }: StrokeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const size = 240

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, size, size)

    // Draw grid lines (田字格)
    ctx.strokeStyle = '#f0d0d0'
    ctx.lineWidth = 1
    ctx.setLineDash([4, 4])
    // Horizontal center
    ctx.beginPath()
    ctx.moveTo(20, size / 2)
    ctx.lineTo(size - 20, size / 2)
    ctx.stroke()
    // Vertical center
    ctx.beginPath()
    ctx.moveTo(size / 2, 20)
    ctx.lineTo(size / 2, size - 20)
    ctx.stroke()
    // Diagonal lines
    ctx.beginPath()
    ctx.moveTo(20, 20)
    ctx.lineTo(size - 20, size - 20)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(size - 20, 20)
    ctx.lineTo(20, size - 20)
    ctx.stroke()
    ctx.setLineDash([])

    // Draw outer border (田字格外框)
    ctx.strokeStyle = '#e57373'
    ctx.lineWidth = 2
    ctx.strokeRect(10, 10, size - 20, size - 20)

    // Draw the full character as light red template (描红底)
    ctx.font = `${size * 0.65}px "KaiTi", "STKaiti", "楷体", serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#FFCDD2'
    ctx.fillText(char, size / 2, size / 2 + 4)

    // If animating, progressively reveal the character in dark ink
    if (currentStroke >= 0 && isAnimating) {
      // Use clipping to reveal portions of the character
      ctx.save()

      // Create a progressive clipping region
      // We split the character into horizontal bands, revealing top-to-bottom
      // But we also use stroke direction hints for more natural feel
      ctx.beginPath()

      // Calculate reveal regions based on stroke directions
      const bandHeight = (size - 40) / strokes
      for (let i = 0; i <= currentStroke; i++) {
        const dir = getStrokeDirection(strokeOrder[i])
        const bandY = 20 + i * bandHeight
        const bandW = size - 40

        switch (dir) {
          case 'ltr':
            ctx.rect(20, bandY, bandW, bandHeight)
            break
          case 'ttb':
            ctx.rect(20, bandY, bandW, bandHeight)
            break
          case 'rtl-down':
            ctx.rect(20, bandY, bandW, bandHeight)
            break
          case 'ltr-down':
            ctx.rect(20, bandY, bandW, bandHeight)
            break
          case 'radial':
            ctx.rect(20, bandY, bandW, bandHeight)
            break
        }
      }
      ctx.clip()

      // Draw the dark character within the clipped region
      ctx.fillStyle = '#333'
      ctx.font = `${size * 0.65}px "KaiTi", "STKaiti", "楷体", serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(char, size / 2, size / 2 + 4)

      ctx.restore()

      // Draw an animated "pen tip" indicator at the current stroke position
      if (currentStroke < strokes) {
        const penY = 20 + (currentStroke + 0.5) * bandHeight
        const dir = getStrokeDirection(strokeOrder[currentStroke])
        let penX = size / 2
        if (dir === 'ltr' || dir === 'ltr-down') penX = 20 + (size - 40) * 0.9
        else if (dir === 'rtl-down') penX = 20 + (size - 40) * 0.1
        else penX = size / 2

        // Draw pen indicator
        ctx.beginPath()
        ctx.arc(penX, penY, 6, 0, Math.PI * 2)
        ctx.fillStyle = '#E53935'
        ctx.fill()
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 2
        ctx.stroke()
      }
    } else if (!isAnimating && currentStroke >= strokes - 1) {
      // Animation completed: show full character in dark
      ctx.fillStyle = '#333'
      ctx.fillText(char, size / 2, size / 2 + 4)
    }
  }, [char, strokes, strokeOrder, currentStroke, isAnimating, size])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '16px',
        display: 'block',
        margin: '0 auto',
      }}
    />
  )
}

export function StrokeOrder() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentStroke, setCurrentStroke] = useState(-1)
  const [animationDone, setAnimationDone] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { play } = useSound()

  const char = CHARACTERS[selectedIdx]

  const stopAnimation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const playAnimation = useCallback(() => {
    stopAnimation()
    setIsAnimating(true)
    setAnimationDone(false)
    setCurrentStroke(0)
    play('pop')

    let i = 0
    intervalRef.current = setInterval(() => {
      i++
      if (i >= char.strokeOrder.length) {
        stopAnimation()
        setIsAnimating(false)
        setAnimationDone(true)
        play('correct')
      } else {
        setCurrentStroke(i)
        play('tick')
      }
    }, 700)
  }, [char, play, stopAnimation])

  // Cleanup on unmount or character change
  useEffect(() => {
    return () => stopAnimation()
  }, [stopAnimation])

  const handleSelectChar = (i: number) => {
    stopAnimation()
    setSelectedIdx(i)
    setCurrentStroke(-1)
    setIsAnimating(false)
    setAnimationDone(false)
    play('click')
  }

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#C2185B' }}>汉字笔顺</h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
        选择一个汉字，观看笔顺描红演示
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
            {/* Canvas 描红演示区 */}
            <div style={{ marginBottom: '24px' }}>
              <StrokeCanvas
                char={char.char}
                strokes={char.strokes}
                strokeOrder={char.strokeOrder}
                currentStroke={currentStroke}
                isAnimating={isAnimating}
              />
            </div>

            {/* 信息 */}
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '18px', color: '#333', marginBottom: '4px' }}>
                <strong>{char.char}</strong> ({char.pinyin}) — {char.meaning}
              </p>
              <p style={{ fontSize: '14px', color: '#666' }}>
                笔画数: {char.strokes} 画
              </p>
            </div>

            {/* 笔顺步骤指示器 */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>笔顺步骤：</p>
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

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <Button
                variant="primary"
                onClick={playAnimation}
                disabled={isAnimating}
              >
                {isAnimating ? '描红中...' : animationDone ? '🔄 重新演示' : '✍️ 开始描红'}
              </Button>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
