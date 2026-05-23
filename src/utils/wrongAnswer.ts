import { db } from '@/db'
import type { SubjectType, WrongAnswer } from '@/types'

/**
 * 记录错题（含5分钟去重，避免重复记录）
 */
export async function recordWrongAnswer(data: {
  subject: SubjectType
  questionType: string
  question: string
  userAnswer: string
  correctAnswer: string
}) {
  // 5分钟内相同题目+相同错误答案不重复记录
  const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000)
  const existing = await db.wrongAnswers
    .where('timestamp')
    .above(fiveMinAgo)
    .filter(r => r.question === data.question && r.userAnswer === data.userAnswer)
    .first()

  if (existing) return

  await db.wrongAnswers.add({
    ...data,
    timestamp: new Date(),
    reviewed: false,
  })
}

/**
 * 获取错题列表
 */
export async function getWrongAnswers(filter?: {
  subject?: SubjectType
  reviewed?: boolean
}): Promise<WrongAnswer[]> {
  let collection = db.wrongAnswers.orderBy('timestamp').reverse()

  if (filter?.subject) {
    const subject = filter.subject
    const reviewed = filter.reviewed
    const results = await collection.toArray()
    return results.filter(r => {
      if (r.subject !== subject) return false
      if (reviewed !== undefined && r.reviewed !== reviewed) return false
      return true
    })
  }

  if (filter?.reviewed !== undefined) {
    const reviewed = filter.reviewed
    const results = await collection.toArray()
    return results.filter(r => r.reviewed === reviewed)
  }

  return collection.toArray()
}

/**
 * 标记错题为已复习/已掌握
 */
export async function markAsReviewed(id: number) {
  await db.wrongAnswers.update(id, { reviewed: true })
}

/**
 * 删除单条错题
 */
export async function deleteWrongAnswer(id: number) {
  await db.wrongAnswers.delete(id)
}

/**
 * 获取错题总数
 */
export async function getWrongAnswerCount(): Promise<number> {
  return db.wrongAnswers.count()
}
