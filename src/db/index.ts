import Dexie, { type EntityTable } from 'dexie'
import type {
  UserProfile,
  BadgeRecord,
  SubjectProgress,
  LearningRecord,
  DailyChallengeRecord,
  AppSettings,
} from '@/types'

class KidsLearnDB extends Dexie {
  userProfile!: EntityTable<UserProfile, 'id'>
  badges!: EntityTable<BadgeRecord, 'id'>
  subjectProgress!: EntityTable<SubjectProgress, 'id'>
  learningRecords!: EntityTable<LearningRecord, 'id'>
  dailyChallenges!: EntityTable<DailyChallengeRecord, 'date'>
  settings!: EntityTable<AppSettings, 'id'>

  constructor() {
    super('KidsLearnDB')
    this.version(1).stores({
      userProfile: 'id',
      badges: 'id, subject',
      subjectProgress: 'id, subject, lastPracticeAt',
      learningRecords: '++id, date, subject, [date+subject]',
      dailyChallenges: 'date',
      settings: 'id',
    })
  }
}

export const db = new KidsLearnDB()

export async function initDefaultData() {
  const profile = await db.userProfile.get('default')
  if (!profile) {
    await db.userProfile.put({
      id: 'default',
      nickname: '小学霸',
      avatarId: 1,
      totalExp: 0,
      level: 1,
      createdAt: new Date(),
      lastLoginDate: new Date().toISOString().split('T')[0],
      consecutiveDays: 1,
    })
  }

  const settings = await db.settings.get('default')
  if (!settings) {
    await db.settings.put({
      id: 'default',
      soundEnabled: true,
      musicEnabled: true,
      volume: 80,
      parentPin: '',
      dailyTimeLimit: 0,
      todayUsedTime: 0,
      lastTimeCheckDate: new Date().toISOString().split('T')[0],
    })
  }
}
