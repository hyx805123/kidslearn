export interface MathLevel {
  id: number
  name: string
  type: 'add' | 'sub' | 'mul' | 'div' | 'mixed'
  minNum: number
  maxNum: number
  questionCount: number
  timeLimit?: number
}

export const MATH_LEVELS: MathLevel[] = [
  // 加法入门
  { id: 1, name: '加法入门 (1-10)', type: 'add', minNum: 1, maxNum: 10, questionCount: 10 },
  { id: 2, name: '加法进阶 (1-20)', type: 'add', minNum: 1, maxNum: 20, questionCount: 10 },
  { id: 3, name: '加法挑战 (1-50)', type: 'add', minNum: 1, maxNum: 50, questionCount: 10 },
  { id: 4, name: '加法大师 (1-100)', type: 'add', minNum: 1, maxNum: 100, questionCount: 10 },
  // 减法入门
  { id: 5, name: '减法入门 (1-10)', type: 'sub', minNum: 1, maxNum: 10, questionCount: 10 },
  { id: 6, name: '减法进阶 (1-20)', type: 'sub', minNum: 1, maxNum: 20, questionCount: 10 },
  { id: 7, name: '减法挑战 (1-50)', type: 'sub', minNum: 1, maxNum: 50, questionCount: 10 },
  { id: 8, name: '减法大师 (1-100)', type: 'sub', minNum: 1, maxNum: 100, questionCount: 10 },
  // 加减混合
  { id: 9, name: '加减混合 (1-20)', type: 'mixed', minNum: 1, maxNum: 20, questionCount: 12 },
  { id: 10, name: '加减混合 (1-50)', type: 'mixed', minNum: 1, maxNum: 50, questionCount: 12 },
  // 乘法
  { id: 11, name: '乘法入门 (1-5)', type: 'mul', minNum: 1, maxNum: 5, questionCount: 10 },
  { id: 12, name: '乘法进阶 (1-9)', type: 'mul', minNum: 1, maxNum: 9, questionCount: 10 },
  { id: 13, name: '乘法挑战 (1-12)', type: 'mul', minNum: 1, maxNum: 12, questionCount: 12 },
  // 除法
  { id: 14, name: '除法入门 (1-5)', type: 'div', minNum: 1, maxNum: 5, questionCount: 10 },
  { id: 15, name: '除法进阶 (1-9)', type: 'div', minNum: 1, maxNum: 9, questionCount: 10 },
  // 综合
  { id: 16, name: '四则运算 (1-20)', type: 'mixed', minNum: 1, maxNum: 20, questionCount: 15 },
  { id: 17, name: '四则运算 (1-50)', type: 'mixed', minNum: 1, maxNum: 50, questionCount: 15 },
  { id: 18, name: '终极挑战 (1-100)', type: 'mixed', minNum: 1, maxNum: 100, questionCount: 20 },
]

export interface MathQuestion {
  num1: number
  num2: number
  operator: '+' | '-' | '×' | '÷'
  answer: number
  displayText: string
}

export function generateQuestion(level: MathLevel): MathQuestion {
  const ops = level.type === 'mixed'
    ? ['+', '-', '×', '÷'] as const
    : level.type === 'add' ? ['+'] as const
    : level.type === 'sub' ? ['-'] as const
    : level.type === 'mul' ? ['×'] as const
    : ['÷'] as const

  const op = ops[Math.floor(Math.random() * ops.length)]
  const range = level.maxNum - level.minNum + 1
  let num1: number, num2: number, answer: number

  switch (op) {
    case '+':
      // Ensure answer does not exceed maxNum (e.g. "加法入门1-10" means sum ≤ 10)
      num1 = Math.floor(Math.random() * (level.maxNum - 2 * level.minNum + 1)) + level.minNum
      num2 = Math.floor(Math.random() * (level.maxNum - num1 - level.minNum + 1)) + level.minNum
      answer = num1 + num2
      break
    case '-':
      num1 = Math.floor(Math.random() * range) + level.minNum
      num2 = Math.floor(Math.random() * num1) + 1
      if (num2 > num1) num2 = num1
      answer = num1 - num2
      break
    case '×':
      num1 = Math.floor(Math.random() * range) + level.minNum
      num2 = Math.floor(Math.random() * range) + level.minNum
      answer = num1 * num2
      break
    case '÷':
      // Keep divisor and quotient within range for child-friendly numbers
      num2 = Math.floor(Math.random() * (level.maxNum - level.minNum)) + level.minNum
      if (num2 < 1) num2 = 1
      answer = Math.floor(Math.random() * (level.maxNum - level.minNum)) + level.minNum
      if (answer < 1) answer = 1
      num1 = num2 * answer
      break
    default:
      num1 = 1; num2 = 1; answer = 2
  }

  return {
    num1, num2, operator: op, answer,
    displayText: `${num1} ${op} ${num2} = ?`,
  }
}

export function generateWrongAnswers(correct: number, count: number): number[] {
  const wrongs = new Set<number>()
  let attempts = 0
  while (wrongs.size < count && attempts < 100) {
    attempts++
    const offset = Math.floor(Math.random() * 10) - 5
    const wrong = correct + (offset === 0 ? 1 : offset)
    if (wrong !== correct && wrong >= 0) wrongs.add(wrong)
  }
  // Fallback: fill remaining with sequential values
  let fallback = correct + 1
  while (wrongs.size < count) {
    if (fallback !== correct && !wrongs.has(fallback)) wrongs.add(fallback)
    fallback++
  }
  return Array.from(wrongs)
}
