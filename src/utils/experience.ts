export function calcExpNeeded(level: number): number {
  return level * 100 + 50
}

export function calcLevel(totalExp: number): { level: number; currentExp: number; expNeeded: number } {
  let remaining = totalExp
  let level = 1
  while (remaining >= calcExpNeeded(level)) {
    remaining -= calcExpNeeded(level)
    level++
  }
  return {
    level,
    currentExp: remaining,
    expNeeded: calcExpNeeded(level),
  }
}

export function expForCorrectAnswer(streak: number): number {
  const base = 10
  const multiplier = streak >= 5 ? 1.5 : 1
  return Math.round(base * multiplier)
}
