import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

interface ConfettiProps {
  fire: boolean
  onComplete?: () => void
}

export function Confetti({ fire, onComplete }: ConfettiProps) {
  const firedRef = useRef(false)

  useEffect(() => {
    if (fire && !firedRef.current) {
      firedRef.current = true

      const duration = 2000
      const end = Date.now() + duration

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#4FC3F7', '#FFD54F', '#81C784', '#EF5350', '#AB47BC'],
        })
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#4FC3F7', '#FFD54F', '#81C784', '#EF5350', '#AB47BC'],
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        } else {
          onComplete?.()
        }
      }
      frame()
    }

    if (!fire) {
      firedRef.current = false
    }
  }, [fire, onComplete])

  return null
}
