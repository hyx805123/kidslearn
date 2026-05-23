export interface MathLevel {
  id: number
  name: string
  type: 'add' | 'sub' | 'mul' | 'div' | 'mixed'
  ops?: ('+' | '-' | '×' | '÷')[] // 显式指定运算符，优先级高于 type
  minNum: number
  maxNum: number
  questionCount: number
  timeLimit?: number
  threeNumbers?: boolean // 是否生成三个数字的运算题
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
  // 加减混合（只用+和-，含三数运算）
  { id: 9, name: '加减混合 (1-20)', type: 'mixed', ops: ['+', '-'], minNum: 1, maxNum: 20, questionCount: 12, threeNumbers: true },
  { id: 10, name: '加减混合 (1-50)', type: 'mixed', ops: ['+', '-'], minNum: 1, maxNum: 50, questionCount: 12, threeNumbers: true },
  { id: 19, name: '加减混合 (1-100)', type: 'mixed', ops: ['+', '-'], minNum: 1, maxNum: 100, questionCount: 12, threeNumbers: true },
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
  // 三数运算模式：如 5 + 3 - 2 = ?
  if (level.threeNumbers) {
    return generateThreeNumberQuestion(level)
  }

  // 优先使用 level.ops（显式指定的运算符），否则根据 type 推断
  const ops: readonly ('+' | '-' | '×' | '÷')[] = level.ops
    ? level.ops
    : level.type === 'mixed'
      ? ['+', '-', '×', '÷']
      : level.type === 'add' ? ['+']
      : level.type === 'sub' ? ['-']
      : level.type === 'mul' ? ['×']
      : ['÷']

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

/**
 * 生成三个数字的加减混合题（用于形成肌肉记忆）
 * 如：5 + 3 - 2 = ?  或  12 - 4 + 7 = ?
 * 确保中间结果和最终结果都不为负数且在合理范围内
 */
function generateThreeNumberQuestion(level: MathLevel): MathQuestion {
  const ops = level.ops || ['+', '-']
  const maxNum = level.maxNum
  const minNum = level.minNum

  let num1: number, num2: number, num3: number
  let op1: '+' | '-', op2: '+' | '-'
  let midResult: number, finalResult: number

  // 最多尝试 50 次确保合理
  let attempts = 0
  do {
    attempts++
    op1 = ops[Math.floor(Math.random() * ops.length)] as '+' | '-'
    op2 = ops[Math.floor(Math.random() * ops.length)] as '+' | '-'

    // 第一个数字较大，确保后续减法不会出现负数
    num1 = Math.floor(Math.random() * (maxNum - minNum) * 0.7) + minNum + Math.floor((maxNum - minNum) * 0.15)
    num2 = Math.floor(Math.random() * Math.floor(num1 * 0.6)) + minNum
    num3 = Math.floor(Math.random() * Math.floor(num1 * 0.5)) + minNum

    midResult = op1 === '+' ? num1 + num2 : num1 - num2
    finalResult = op2 === '+' ? midResult + num3 : midResult - num3
  } while ((midResult < 0 || finalResult < 0 || finalResult > maxNum * 1.5) && attempts < 50)

  // 安全兜底
  if (midResult < 0 || finalResult < 0 || finalResult > maxNum * 1.5) {
    num1 = Math.floor(maxNum * 0.6)
    num2 = Math.floor(maxNum * 0.2)
    num3 = Math.floor(maxNum * 0.1)
    op1 = '+'
    op2 = '-'
    finalResult = num1 + num2 - num3
  }

  return {
    num1,
    num2,
    operator: op1!,
    answer: finalResult,
    displayText: `${num1} ${op1!} ${num2} ${op2!} ${num3} = ?`,
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
