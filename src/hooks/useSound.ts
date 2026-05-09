import { useCallback } from 'react'
import { audioManager } from '@/utils/audio'
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

  return { play }
}
