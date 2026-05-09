export interface LetterData {
  upper: string
  lower: string
  word: string
  wordChinese: string
  phonetic: string
}

export interface WordData {
  english: string
  chinese: string
  category: string
  letters: string[]
}

export interface PhonicsRule {
  pattern: string
  sound: string
  examples: string[]
}

export interface DialogScene {
  id: string
  title: string
  titleChinese: string
  scene: string
  lines: DialogLine[]
}

export interface DialogLine {
  speaker: 'A' | 'B'
  english: string
  chinese: string
  options?: string[]
  correctOption?: number
}

export const ALPHABET: LetterData[] = [
  { upper: 'A', lower: 'a', word: 'Apple', wordChinese: '苹果', phonetic: '/æ/' },
  { upper: 'B', lower: 'b', word: 'Bear', wordChinese: '熊', phonetic: '/biː/' },
  { upper: 'C', lower: 'c', word: 'Cat', wordChinese: '猫', phonetic: '/siː/' },
  { upper: 'D', lower: 'd', word: 'Dog', wordChinese: '狗', phonetic: '/diː/' },
  { upper: 'E', lower: 'e', word: 'Elephant', wordChinese: '大象', phonetic: '/iː/' },
  { upper: 'F', lower: 'f', word: 'Fish', wordChinese: '鱼', phonetic: '/ef/' },
  { upper: 'G', lower: 'g', word: 'Grape', wordChinese: '葡萄', phonetic: '/dʒiː/' },
  { upper: 'H', lower: 'h', word: 'Hat', wordChinese: '帽子', phonetic: '/eɪtʃ/' },
  { upper: 'I', lower: 'i', word: 'Ice cream', wordChinese: '冰淇淋', phonetic: '/aɪ/' },
  { upper: 'J', lower: 'j', word: 'Juice', wordChinese: '果汁', phonetic: '/dʒeɪ/' },
  { upper: 'K', lower: 'k', word: 'Kite', wordChinese: '风筝', phonetic: '/keɪ/' },
  { upper: 'L', lower: 'l', word: 'Lion', wordChinese: '狮子', phonetic: '/el/' },
  { upper: 'M', lower: 'm', word: 'Moon', wordChinese: '月亮', phonetic: '/em/' },
  { upper: 'N', lower: 'n', word: 'Nose', wordChinese: '鼻子', phonetic: '/en/' },
  { upper: 'O', lower: 'o', word: 'Orange', wordChinese: '橘子', phonetic: '/əʊ/' },
  { upper: 'P', lower: 'p', word: 'Panda', wordChinese: '熊猫', phonetic: '/piː/' },
  { upper: 'Q', lower: 'q', word: 'Queen', wordChinese: '女王', phonetic: '/kjuː/' },
  { upper: 'R', lower: 'r', word: 'Rabbit', wordChinese: '兔子', phonetic: '/ɑːr/' },
  { upper: 'S', lower: 's', word: 'Sun', wordChinese: '太阳', phonetic: '/es/' },
  { upper: 'T', lower: 't', word: 'Tiger', wordChinese: '老虎', phonetic: '/tiː/' },
  { upper: 'U', lower: 'u', word: 'Umbrella', wordChinese: '雨伞', phonetic: '/juː/' },
  { upper: 'V', lower: 'v', word: 'Violin', wordChinese: '小提琴', phonetic: '/viː/' },
  { upper: 'W', lower: 'w', word: 'Water', wordChinese: '水', phonetic: '/ˈdʌb.əl.juː/' },
  { upper: 'X', lower: 'x', word: 'X-ray', wordChinese: 'X光', phonetic: '/eks/' },
  { upper: 'Y', lower: 'y', word: 'Yo-yo', wordChinese: '溜溜球', phonetic: '/waɪ/' },
  { upper: 'Z', lower: 'z', word: 'Zebra', wordChinese: '斑马', phonetic: '/zed/' },
]

export const WORDS: WordData[] = [
  // 动物
  { english: 'cat', chinese: '猫', category: 'animals', letters: ['c', 'a', 't'] },
  { english: 'dog', chinese: '狗', category: 'animals', letters: ['d', 'o', 'g'] },
  { english: 'fish', chinese: '鱼', category: 'animals', letters: ['f', 'i', 's', 'h'] },
  { english: 'bird', chinese: '鸟', category: 'animals', letters: ['b', 'i', 'r', 'd'] },
  { english: 'duck', chinese: '鸭子', category: 'animals', letters: ['d', 'u', 'c', 'k'] },
  { english: 'frog', chinese: '青蛙', category: 'animals', letters: ['f', 'r', 'o', 'g'] },
  { english: 'pig', chinese: '猪', category: 'animals', letters: ['p', 'i', 'g'] },
  { english: 'cow', chinese: '牛', category: 'animals', letters: ['c', 'o', 'w'] },
  { english: 'hen', chinese: '母鸡', category: 'animals', letters: ['h', 'e', 'n'] },
  { english: 'ant', chinese: '蚂蚁', category: 'animals', letters: ['a', 'n', 't'] },
  // 水果
  { english: 'apple', chinese: '苹果', category: 'fruits', letters: ['a', 'p', 'p', 'l', 'e'] },
  { english: 'banana', chinese: '香蕉', category: 'fruits', letters: ['b', 'a', 'n', 'a', 'n', 'a'] },
  { english: 'grape', chinese: '葡萄', category: 'fruits', letters: ['g', 'r', 'a', 'p', 'e'] },
  { english: 'pear', chinese: '梨', category: 'fruits', letters: ['p', 'e', 'a', 'r'] },
  { english: 'plum', chinese: '李子', category: 'fruits', letters: ['p', 'l', 'u', 'm'] },
  // 颜色
  { english: 'red', chinese: '红色', category: 'colors', letters: ['r', 'e', 'd'] },
  { english: 'blue', chinese: '蓝色', category: 'colors', letters: ['b', 'l', 'u', 'e'] },
  { english: 'green', chinese: '绿色', category: 'colors', letters: ['g', 'r', 'e', 'e', 'n'] },
  { english: 'pink', chinese: '粉色', category: 'colors', letters: ['p', 'i', 'n', 'k'] },
  { english: 'black', chinese: '黑色', category: 'colors', letters: ['b', 'l', 'a', 'c', 'k'] },
  // 身体
  { english: 'hand', chinese: '手', category: 'body', letters: ['h', 'a', 'n', 'd'] },
  { english: 'foot', chinese: '脚', category: 'body', letters: ['f', 'o', 'o', 't'] },
  { english: 'head', chinese: '头', category: 'body', letters: ['h', 'e', 'a', 'd'] },
  { english: 'nose', chinese: '鼻子', category: 'body', letters: ['n', 'o', 's', 'e'] },
  { english: 'ear', chinese: '耳朵', category: 'body', letters: ['e', 'a', 'r'] },
  // 食物
  { english: 'cake', chinese: '蛋糕', category: 'food', letters: ['c', 'a', 'k', 'e'] },
  { english: 'milk', chinese: '牛奶', category: 'food', letters: ['m', 'i', 'l', 'k'] },
  { english: 'egg', chinese: '鸡蛋', category: 'food', letters: ['e', 'g', 'g'] },
  { english: 'rice', chinese: '米饭', category: 'food', letters: ['r', 'i', 'c', 'e'] },
  { english: 'soup', chinese: '汤', category: 'food', letters: ['s', 'o', 'u', 'p'] },
  // 数字
  { english: 'one', chinese: '一', category: 'numbers', letters: ['o', 'n', 'e'] },
  { english: 'two', chinese: '二', category: 'numbers', letters: ['t', 'w', 'o'] },
  { english: 'three', chinese: '三', category: 'numbers', letters: ['t', 'h', 'r', 'e', 'e'] },
  { english: 'four', chinese: '四', category: 'numbers', letters: ['f', 'o', 'u', 'r'] },
  { english: 'five', chinese: '五', category: 'numbers', letters: ['f', 'i', 'v', 'e'] },
  // 家庭
  { english: 'mom', chinese: '妈妈', category: 'family', letters: ['m', 'o', 'm'] },
  { english: 'dad', chinese: '爸爸', category: 'family', letters: ['d', 'a', 'd'] },
  { english: 'baby', chinese: '宝宝', category: 'family', letters: ['b', 'a', 'b', 'y'] },
  // 自然
  { english: 'sun', chinese: '太阳', category: 'nature', letters: ['s', 'u', 'n'] },
  { english: 'moon', chinese: '月亮', category: 'nature', letters: ['m', 'o', 'o', 'n'] },
  { english: 'star', chinese: '星星', category: 'nature', letters: ['s', 't', 'a', 'r'] },
  { english: 'rain', chinese: '雨', category: 'nature', letters: ['r', 'a', 'i', 'n'] },
  { english: 'tree', chinese: '树', category: 'nature', letters: ['t', 'r', 'e', 'e'] },
  // 学校
  { english: 'book', chinese: '书', category: 'school', letters: ['b', 'o', 'o', 'k'] },
  { english: 'pen', chinese: '笔', category: 'school', letters: ['p', 'e', 'n'] },
  { english: 'desk', chinese: '桌子', category: 'school', letters: ['d', 'e', 's', 'k'] },
  { english: 'bag', chinese: '书包', category: 'school', letters: ['b', 'a', 'g'] },
  { english: 'bus', chinese: '公共汽车', category: 'school', letters: ['b', 'u', 's'] },
  { english: 'cup', chinese: '杯子', category: 'school', letters: ['c', 'u', 'p'] },
  { english: 'map', chinese: '地图', category: 'school', letters: ['m', 'a', 'p'] },
  { english: 'box', chinese: '盒子', category: 'school', letters: ['b', 'o', 'x'] },
]

export const PHONICS_RULES: PhonicsRule[] = [
  { pattern: 'a', sound: '/æ/', examples: ['cat', 'hat', 'bat'] },
  { pattern: 'e', sound: '/e/', examples: ['red', 'pen', 'hen'] },
  { pattern: 'i', sound: '/ɪ/', examples: ['pig', 'big', 'sit'] },
  { pattern: 'o', sound: '/ɒ/', examples: ['dog', 'hot', 'box'] },
  { pattern: 'u', sound: '/ʌ/', examples: ['cup', 'bus', 'sun'] },
  { pattern: 'a_e', sound: '/eɪ/', examples: ['cake', 'make', 'name'] },
  { pattern: 'i_e', sound: '/aɪ/', examples: ['bike', 'kite', 'five'] },
  { pattern: 'o_e', sound: '/əʊ/', examples: ['nose', 'home', 'bone'] },
  { pattern: 'ee', sound: '/iː/', examples: ['tree', 'three', 'bee'] },
  { pattern: 'oo', sound: '/uː/', examples: ['moon', 'food', 'zoo'] },
  { pattern: 'sh', sound: '/ʃ/', examples: ['ship', 'shop', 'fish'] },
  { pattern: 'ch', sound: '/tʃ/', examples: ['chin', 'chat', 'rich'] },
  { pattern: 'th', sound: '/θ/', examples: ['thin', 'three', 'bath'] },
]

export const DIALOGS: DialogScene[] = [
  {
    id: 'greeting',
    title: 'Meeting a Friend',
    titleChinese: '认识新朋友',
    scene: 'school',
    lines: [
      { speaker: 'A', english: 'Hello! My name is Tom.', chinese: '你好！我叫汤姆。' },
      { speaker: 'B', english: 'Hi Tom! My name is Lily.', chinese: '嗨汤姆！我叫莉莉。', options: ['Hi Tom! My name is Lily.', 'Goodbye Tom!', 'I am fine.'], correctOption: 0 },
      { speaker: 'A', english: 'Nice to meet you!', chinese: '很高兴认识你！' },
      { speaker: 'B', english: 'Nice to meet you too!', chinese: '我也很高兴认识你！', options: ['Nice to meet you too!', 'See you!', 'Thank you.'], correctOption: 0 },
    ],
  },
  {
    id: 'shopping',
    title: 'At the Store',
    titleChinese: '在商店',
    scene: 'store',
    lines: [
      { speaker: 'A', english: 'Can I help you?', chinese: '我能帮你吗？' },
      { speaker: 'B', english: 'Yes, I want an apple, please.', chinese: '是的，我想要一个苹果。', options: ['Yes, I want an apple, please.', 'No, I am a student.', 'Yes, I am happy.'], correctOption: 0 },
      { speaker: 'A', english: 'Here you are!', chinese: '给你！' },
      { speaker: 'B', english: 'Thank you!', chinese: '谢谢！', options: ['Thank you!', 'Sorry!', 'Hello!'], correctOption: 0 },
    ],
  },
  {
    id: 'animals',
    title: 'At the Zoo',
    titleChinese: '在动物园',
    scene: 'zoo',
    lines: [
      { speaker: 'A', english: 'Look! What is that?', chinese: '看！那是什么？' },
      { speaker: 'B', english: 'It is a panda!', chinese: '那是一只熊猫！', options: ['It is a panda!', 'It is a book.', 'I like it.'], correctOption: 0 },
      { speaker: 'A', english: 'Wow, it is so cute!', chinese: '哇，它好可爱！' },
      { speaker: 'B', english: 'Yes, I like pandas very much!', chinese: '是的，我非常喜欢熊猫！', options: ['Yes, I like pandas very much!', 'No, I do not.', 'It is big.'], correctOption: 0 },
    ],
  },
  {
    id: 'family',
    title: 'My Family',
    titleChinese: '我的家人',
    scene: 'home',
    lines: [
      { speaker: 'A', english: 'Who is she?', chinese: '她是谁？' },
      { speaker: 'B', english: 'She is my mom.', chinese: '她是我妈妈。', options: ['She is my mom.', 'He is my dad.', 'It is a cat.'], correctOption: 0 },
      { speaker: 'A', english: 'She is very kind.', chinese: '她很和蔼。' },
      { speaker: 'B', english: 'Yes, she is! And he is my dad.', chinese: '是的！他是我爸爸。', options: ['Yes, she is! And he is my dad.', 'No, she is not.', 'Thank you.'], correctOption: 0 },
    ],
  },
  {
    id: 'food',
    title: 'Lunchtime',
    titleChinese: '午餐时间',
    scene: 'cafeteria',
    lines: [
      { speaker: 'A', english: 'I am hungry! What do you like?', chinese: '我饿了！你喜欢吃什么？' },
      { speaker: 'B', english: 'I like rice and soup.', chinese: '我喜欢米饭和汤。', options: ['I like rice and soup.', 'I like books.', 'I am fine.'], correctOption: 0 },
      { speaker: 'A', english: 'Me too! And I also like milk.', chinese: '我也是！我还喜欢牛奶。' },
      { speaker: 'B', english: 'Let us eat together!', chinese: '我们一起吃吧！', options: ['Let us eat together!', 'Goodbye!', 'I am sorry.'], correctOption: 0 },
    ],
  },
]
