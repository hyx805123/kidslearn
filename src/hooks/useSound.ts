import { useCallback } from 'react'
import { audioManager, comboFeedback } from '@/utils/audio'
import { useSettingsStore } from '@/store/useSettingsStore'

type SoundName = 'click' | 'correct' | 'wrong' | 'levelUp' | 'badge' | 'pop' | 'whoosh' | 'tick'

export function useSound() {
  const soundEnabled = useSettingsStore((s) => s.soundEnabled)

  const play = useCallback(
    (name: SoundName) => {
      if (soundEnabled) {
        audioManager.play(name)
      }
    },
    [soundEnabled],
  )

  // 消消乐风格连击反馈
  const comboCorrect = useCallback(() => {
    if (soundEnabled) {
      return comboFeedback.onCorrect()
    }
    return null
  }, [soundEnabled])

  const comboWrong = useCallback(() => {
    if (soundEnabled) {
      comboFeedback.onWrong()
    }
  }, [soundEnabled])

  const comboReset = useCallback(() => {
    comboFeedback.reset()
  }, [])

  return { play, comboCorrect, comboWrong, comboReset }
}
