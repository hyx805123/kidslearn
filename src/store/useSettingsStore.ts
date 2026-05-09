import { create } from 'zustand'
import { db } from '@/db'

interface SettingsState {
  soundEnabled: boolean
  musicEnabled: boolean
  volume: number
  parentPin: string
  dailyTimeLimit: number
  todayUsedTime: number
  loaded: boolean
  loadFromDB: () => Promise<void>
  setSound: (enabled: boolean) => void
  setMusic: (enabled: boolean) => void
  setVolume: (v: number) => void
  setParentPin: (pin: string) => void
  setDailyTimeLimit: (mins: number) => void
  addUsedTime: (seconds: number) => void
  saveToDB: () => Promise<void>
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  soundEnabled: true,
  musicEnabled: true,
  volume: 80,
  parentPin: '',
  dailyTimeLimit: 0,
  todayUsedTime: 0,
  loaded: false,

  loadFromDB: async () => {
    const s = await db.settings.get('default')
    if (s) {
      const today = new Date().toISOString().split('T')[0]
      set({
        soundEnabled: s.soundEnabled,
        musicEnabled: s.musicEnabled,
        volume: s.volume,
        parentPin: s.parentPin,
        dailyTimeLimit: s.dailyTimeLimit,
        todayUsedTime: s.lastTimeCheckDate === today ? s.todayUsedTime : 0,
        loaded: true,
      })
    } else {
      set({ loaded: true })
    }
  },

  setSound: (enabled) => { set({ soundEnabled: enabled }); get().saveToDB() },
  setMusic: (enabled) => { set({ musicEnabled: enabled }); get().saveToDB() },
  setVolume: (v) => { set({ volume: v }); get().saveToDB() },
  setParentPin: (pin) => { set({ parentPin: pin }); get().saveToDB() },
  setDailyTimeLimit: (mins) => { set({ dailyTimeLimit: mins }); get().saveToDB() },
  addUsedTime: (seconds) => {
    set((s) => ({ todayUsedTime: s.todayUsedTime + seconds }))
    get().saveToDB()
  },

  saveToDB: async () => {
    const s = get()
    await db.settings.put({
      id: 'default',
      soundEnabled: s.soundEnabled,
      musicEnabled: s.musicEnabled,
      volume: s.volume,
      parentPin: s.parentPin,
      dailyTimeLimit: s.dailyTimeLimit,
      todayUsedTime: s.todayUsedTime,
      lastTimeCheckDate: new Date().toISOString().split('T')[0],
    })
  },
}))
