import { create } from 'zustand'
import { db } from '@/db'
import type { LevelInfo, BadgeRecord, SubjectType } from '@/types'

interface UserState {
  nickname: string
  avatarId: number
  totalExp: number
  level: number
  consecutiveDays: number
  badges: BadgeRecord[]
  loaded: boolean
  levelInfo: () => LevelInfo
  addExp: (amount: number) => void
  loadFromDB: () => Promise<void>
  saveToDB: () => Promise<void>
  earnBadge: (id: string, subject: SubjectType | 'general') => Promise<boolean>
}

function calcExpNeeded(level: number) {
  return level * 100 + 50
}

function calcLevelInfo(totalExp: number, level: number): LevelInfo {
  let remaining = totalExp
  let lv = 1
  while (lv < level) {
    remaining -= calcExpNeeded(lv)
    lv++
  }
  const needed = calcExpNeeded(level)
  return {
    level,
    currentExp: remaining,
    expNeeded: needed,
    progress: Math.min(remaining / needed, 1),
  }
}

export const useUserStore = create<UserState>((set, get) => ({
  nickname: '小学霸',
  avatarId: 1,
  totalExp: 0,
  level: 1,
  consecutiveDays: 1,
  badges: [],
  loaded: false,

  levelInfo: () => {
    const { totalExp, level } = get()
    return calcLevelInfo(totalExp, level)
  },

  addExp: (amount: number) => {
    const state = get()
    let newExp = state.totalExp + amount
    let newLevel = state.level
    while (newExp >= calcExpNeeded(newLevel)) {
      newExp -= calcExpNeeded(newLevel)
      newLevel++
    }
    // recalculate totalExp as cumulative
    let cumulative = 0
    for (let i = 1; i < newLevel; i++) {
      cumulative += calcExpNeeded(i)
    }
    cumulative += newExp
    set({ totalExp: cumulative, level: newLevel })
    get().saveToDB()
  },

  loadFromDB: async () => {
    const profile = await db.userProfile.get('default')
    const badges = await db.badges.toArray()
    if (profile) {
      set({
        nickname: profile.nickname,
        avatarId: profile.avatarId,
        totalExp: profile.totalExp,
        level: profile.level,
        consecutiveDays: profile.consecutiveDays,
        badges,
        loaded: true,
      })
    } else {
      set({ loaded: true })
    }
  },

  saveToDB: async () => {
    const { nickname, avatarId, totalExp, level, consecutiveDays } = get()
    await db.userProfile.put({
      id: 'default',
      nickname,
      avatarId,
      totalExp,
      level,
      createdAt: new Date(),
      lastLoginDate: new Date().toISOString().split('T')[0],
      consecutiveDays,
    })
  },

  earnBadge: async (id: string, subject: SubjectType | 'general') => {
    const existing = get().badges.find((b) => b.id === id)
    if (existing) return false
    const badge: BadgeRecord = { id, earnedAt: new Date(), subject: subject as SubjectType }
    await db.badges.put(badge)
    set((s) => ({ badges: [...s.badges, badge] }))
    return true
  },
}))
