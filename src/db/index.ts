import Dexie, { type EntityTable } from 'dexie'
import type {
  UserProfile,
  BadgeRecord,
  SubjectProgress,
  LearningRecord,
  DailyChallengeRecord,
  AppSettings,
  WrongAnswer,
} from '@/types'

class KidsLearnDB extends Dexie {
  userProfile!: EntityTable<UserProfile, 'id'>
  badges!: EntityTable<BadgeRecord, 'id'>
  subjectProgress!: EntityTable<SubjectProgress, 'id'>
  learningRecords!: EntityTable<LearningRecord, 'id'>
  dailyChallenges!: EntityTable<DailyChallengeRecord, 'date'>
  settings!: EntityTable<AppSettings, 'id'>
  wrongAnswers!: EntityTable<WrongAnswer, 'id'>

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

    // Version 2: 等级公式改为 500*level+2000，需要从 totalExp 重新计算 level
    this.version(2).stores({
      userProfile: 'id',
      badges: 'id, subject',
      subjectProgress: 'id, subject, lastPracticeAt',
      learningRecords: '++id, date, subject, [date+subject]',
      dailyChallenges: 'date',
      settings: 'id',
    }).upgrade(tx => {
      return tx.table('userProfile').toCollection().modify(profile => {
        let remaining = profile.totalExp
        let level = 1
        while (remaining >= (500 * level + 2000)) {
          remaining -= (500 * level + 2000)
          level++
        }
        profile.level = level
      })
    })

    // Version 3: 添加错题本表
    this.version(3).stores({
      userProfile: 'id',
      badges: 'id, subject',
      subjectProgress: 'id, subject, lastPracticeAt',
      learningRecords: '++id, date, subject, [date+subject]',
      dailyChallenges: 'date',
      settings: 'id',
      wrongAnswers: '++id, subject, questionType, timestamp, reviewed',
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

  // 确保错题本表已初始化（Version 3 添加）
  // 表结构已在数据库版本迁移中创建，这里无需额外初始化
}
