export interface UserProfile {
  id: string
  nickname: string
  avatarId: number
  totalExp: number
  level: number
  createdAt: Date
  lastLoginDate: string
  consecutiveDays: number
}

export interface BadgeRecord {
  id: string
  earnedAt: Date
  subject: SubjectType
}

export interface LevelInfo {
  level: number
  currentExp: number
  expNeeded: number
  progress: number
}

export type SubjectType = 'pinyin' | 'math' | 'chinese' | 'english'

export interface SubjectProgress {
  id: string
  subject: SubjectType
  moduleId: string
  completedLessons: number[]
  currentLesson: number
  accuracy: number
  totalAttempts: number
  totalCorrect: number
  bestScore: number
  lastPracticeAt: Date
}

export interface LearningRecord {
  id?: number
  date: string
  subject: SubjectType
  moduleId: string
  duration: number
  questionsAttempted: number
  questionsCorrect: number
  expEarned: number
  timestamp: Date
}

export interface DailyChallengeRecord {
  date: string
  questions: ChallengeQuestion[]
  answers: (number | null)[]
  completed: boolean
  score: number
}

export interface ChallengeQuestion {
  id: string
  subject: SubjectType
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface AppSettings {
  id: string
  soundEnabled: boolean
  musicEnabled: boolean
  volume: number
  parentPin: string
  dailyTimeLimit: number
  todayUsedTime: number
  lastTimeCheckDate: string
}

export type BuddyMood = 'idle' | 'happy' | 'thinking' | 'cheering' | 'sad'

export interface WrongAnswer {
  id?: number
  subject: SubjectType
  questionType: string
  question: string
  userAnswer: string
  correctAnswer: string
  timestamp: Date
  reviewed: boolean
}

export interface BadgeDefinition {
  id: string
  name: string
  description: string
  icon: string
  subject: SubjectType | 'general'
  condition: string
}
