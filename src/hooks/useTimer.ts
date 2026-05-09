import { useState, useRef, useCallback, useEffect } from 'react'

interface UseTimerOptions {
  initialTime: number
  countdown?: boolean
  onComplete?: () => void
  autoStart?: boolean
}

export function useTimer({ initialTime, countdown = false, onComplete, autoStart = false }: UseTimerOptions) {
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(autoStart)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onCompleteRef = useRef(onComplete)

  // Keep ref in sync without triggering effect re-runs
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  const stop = useCallback(() => {
    setIsRunning(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    setIsRunning(true)
  }, [])

  const reset = useCallback(() => {
    stop()
    setTime(initialTime)
  }, [initialTime, stop])

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        const next = countdown ? prev - 1 : prev + 1
        if (countdown && next <= 0) {
          stop()
          onCompleteRef.current?.()
          return 0
        }
        return next
      })
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, countdown, stop])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return { time, isRunning, start, stop, reset, formatted: formatTime(time) }
}
