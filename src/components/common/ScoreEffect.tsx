import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ScoreEffectProps {
  trigger: number
  points: number
}

interface FloatingItem {
  id: number
  points: number
}

interface Star {
  id: number
  angle: number
  distance: number
  size: number
}

let nextId = 0

export function ScoreEffect({ trigger, points }: ScoreEffectProps) {
  const [floats, setFloats] = useState<FloatingItem[]>([])
  const [stars, setStars] = useState<Star[]>([])
  const prevTrigger = useRef(trigger)

  useEffect(() => {
    if (trigger > prevTrigger.current) {
      const id = nextId++

      // 添加飘分数
      setFloats(prev => [...prev, { id, points }])

      // 添加星星粒子 (6-8个)
      const starCount = 6 + Math.floor(Math.random() * 3)
      const newStars: Star[] = []
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: id * 100 + i,
          angle: (360 / starCount) * i + Math.random() * 30,
          distance: 20 + Math.random() * 25,
          size: 8 + Math.random() * 8,
        })
      }
      setStars(prev => [...prev, ...newStars])

      // 动画结束后清除
      setTimeout(() => {
        setFloats(prev => prev.filter(f => f.id !== id))
      }, 900)
      setTimeout(() => {
        setStars(prev => prev.filter(s => Math.floor(s.id / 100) !== id))
      }, 700)
    }
    prevTrigger.current = trigger
  }, [trigger, points])

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', overflow: 'visible' }}>
      {/* 飘分数 */}
      <AnimatePresence>
        {floats.map(f => (
          <motion.div
            key={f.id}
            initial={{ opacity: 1, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -40, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '22px',
              fontWeight: 900,
              color: '#FF6D00',
              textShadow: '0 1px 4px rgba(255,109,0,0.4)',
              whiteSpace: 'nowrap',
              zIndex: 100,
            }}
          >
            +{f.points}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 星星粒子 */}
      {stars.map(star => (
        <span
          key={star.id}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            fontSize: `${star.size}px`,
            animation: `star-burst-${star.id} 0.6s ease-out forwards`,
            pointerEvents: 'none',
            zIndex: 99,
          }}
        >
          <style>
            {`@keyframes star-burst-${star.id} {
              0% {
                transform: translate(-50%, -50%) translate(0px, 0px) scale(1);
                opacity: 1;
              }
              100% {
                transform: translate(-50%, -50%) translate(${Math.cos(star.angle * Math.PI / 180) * star.distance}px, ${Math.sin(star.angle * Math.PI / 180) * star.distance}px) scale(0.3);
                opacity: 0;
              }
            }`}
          </style>
          ⭐
        </span>
      ))}
    </div>
  )
}
