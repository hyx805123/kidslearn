import { useUserStore } from '@/store/useUserStore'
import { audioManager } from '@/utils/audio'

/**
 * 检查并授予满足条件的徽章
 * 在关键时刻调用（如：完成关卡、每日挑战结束、app 加载）
 */
export function checkBadges(context?: {
  mathStreak?: number
  mathTimedScore?: number
  dailyChallengeScore?: number
  dailyChallengeTotal?: number
}) {
  const store = useUserStore.getState()
  const { level, consecutiveDays, badges, earnBadge } = store

  // 辅助函数：检查是否已获得徽章
  const hasBadge = (id: string) => badges.some((b) => b.id === id)

  // === 通用徽章 ===

  // 初次登场
  if (!hasBadge('first_login')) {
    earnBadge('first_login', 'general')
  }

  // 连续打卡
  if (consecutiveDays >= 3 && !hasBadge('streak_3')) {
    earnBadge('streak_3', 'general')
  }
  if (consecutiveDays >= 7 && !hasBadge('streak_7')) {
    earnBadge('streak_7', 'general')
  }
  if (consecutiveDays >= 30 && !hasBadge('streak_30')) {
    earnBadge('streak_30', 'general')
  }

  // 等级
  if (level >= 5 && !hasBadge('level_5')) {
    earnBadge('level_5', 'general')
  }
  if (level >= 10 && !hasBadge('level_10')) {
    earnBadge('level_10', 'general')
  }

  // === 每日挑战 ===
  if (context?.dailyChallengeScore !== undefined && context.dailyChallengeTotal) {
    if (!hasBadge('challenge_first')) {
      earnBadge('challenge_first', 'general')
    }
    if (context.dailyChallengeScore === context.dailyChallengeTotal && !hasBadge('challenge_perfect')) {
      earnBadge('challenge_perfect', 'general')
    }
  }

  // === 数学徽章 ===
  if (context?.mathStreak && context.mathStreak >= 10 && !hasBadge('math_streak10')) {
    earnBadge('math_streak10', 'math')
  }
  if (context?.mathTimedScore && context.mathTimedScore >= 15 && !hasBadge('math_speed')) {
    earnBadge('math_speed', 'math')
  }
}

/**
 * 授予徽章并播放音效（用于在页面中直接调用）
 */
export async function awardBadgeWithEffect(badgeId: string, subject: 'pinyin' | 'math' | 'chinese' | 'english' | 'general') {
  const { earnBadge } = useUserStore.getState()
  const isNew = await earnBadge(badgeId, subject)
  if (isNew) {
    audioManager.play('badge')
  }
  return isNew
}
