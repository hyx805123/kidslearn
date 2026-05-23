export interface PinyinItem {
  char: string
  pinyin: string
  pronounceChar: string // 用于 TTS 发音的代表汉字
  audio?: string
}

// 23个声母 - pronounceChar 是标准教学中每个声母对应的代表字
export const INITIALS: PinyinItem[] = [
  { char: 'b', pinyin: 'bō', pronounceChar: '波' },
  { char: 'p', pinyin: 'pō', pronounceChar: '坡' },
  { char: 'm', pinyin: 'mō', pronounceChar: '摸' },
  { char: 'f', pinyin: 'fō', pronounceChar: '佛' },
  { char: 'd', pinyin: 'dé', pronounceChar: '得' },
  { char: 't', pinyin: 'tè', pronounceChar: '特' },
  { char: 'n', pinyin: 'né', pronounceChar: '呢' },
  { char: 'l', pinyin: 'lè', pronounceChar: '乐' },
  { char: 'g', pinyin: 'gē', pronounceChar: '哥' },
  { char: 'k', pinyin: 'kē', pronounceChar: '科' },
  { char: 'h', pinyin: 'hē', pronounceChar: '喝' },
  { char: 'j', pinyin: 'jī', pronounceChar: '鸡' },
  { char: 'q', pinyin: 'qī', pronounceChar: '七' },
  { char: 'x', pinyin: 'xī', pronounceChar: '西' },
  { char: 'zh', pinyin: 'zhī', pronounceChar: '知' },
  { char: 'ch', pinyin: 'chī', pronounceChar: '吃' },
  { char: 'sh', pinyin: 'shī', pronounceChar: '诗' },
  { char: 'r', pinyin: 'rì', pronounceChar: '日' },
  { char: 'z', pinyin: 'zī', pronounceChar: '资' },
  { char: 'c', pinyin: 'cī', pronounceChar: '词' },
  { char: 's', pinyin: 'sī', pronounceChar: '丝' },
  { char: 'y', pinyin: 'yī', pronounceChar: '衣' },
  { char: 'w', pinyin: 'wū', pronounceChar: '乌' },
]

// 24个韵母 - pronounceChar 是韵母标准发音对应的汉字
export const FINALS: PinyinItem[] = [
  { char: 'a', pinyin: 'ā', pronounceChar: '啊' },
  { char: 'o', pinyin: 'ō', pronounceChar: '喔' },
  { char: 'e', pinyin: 'ē', pronounceChar: '鹅' },
  { char: 'i', pinyin: 'ī', pronounceChar: '衣' },
  { char: 'u', pinyin: 'ū', pronounceChar: '乌' },
  { char: 'ü', pinyin: 'ǖ', pronounceChar: '鱼' },
  { char: 'ai', pinyin: 'āi', pronounceChar: '哀' },
  { char: 'ei', pinyin: 'ēi', pronounceChar: '诶' },
  { char: 'ui', pinyin: 'uī', pronounceChar: '威' },
  { char: 'ao', pinyin: 'āo', pronounceChar: '凹' },
  { char: 'ou', pinyin: 'ōu', pronounceChar: '欧' },
  { char: 'iu', pinyin: 'iū', pronounceChar: '优' },
  { char: 'ie', pinyin: 'iē', pronounceChar: '耶' },
  { char: 'üe', pinyin: 'üē', pronounceChar: '约' },
  { char: 'er', pinyin: 'ēr', pronounceChar: '耳' },
  { char: 'an', pinyin: 'ān', pronounceChar: '安' },
  { char: 'en', pinyin: 'ēn', pronounceChar: '恩' },
  { char: 'in', pinyin: 'īn', pronounceChar: '因' },
  { char: 'un', pinyin: 'ūn', pronounceChar: '温' },
  { char: 'ün', pinyin: 'ǖn', pronounceChar: '晕' },
  { char: 'ang', pinyin: 'āng', pronounceChar: '昂' },
  { char: 'eng', pinyin: 'ēng', pronounceChar: '鞥' },
  { char: 'ing', pinyin: 'īng', pronounceChar: '英' },
  { char: 'ong', pinyin: 'ōng', pronounceChar: '翁' },
]

// 16个整体认读音节
export const WHOLE_SYLLABLES: PinyinItem[] = [
  { char: 'zhi', pinyin: 'zhī', pronounceChar: '知' },
  { char: 'chi', pinyin: 'chī', pronounceChar: '吃' },
  { char: 'shi', pinyin: 'shī', pronounceChar: '诗' },
  { char: 'ri', pinyin: 'rì', pronounceChar: '日' },
  { char: 'zi', pinyin: 'zī', pronounceChar: '资' },
  { char: 'ci', pinyin: 'cī', pronounceChar: '词' },
  { char: 'si', pinyin: 'sī', pronounceChar: '丝' },
  { char: 'yi', pinyin: 'yī', pronounceChar: '衣' },
  { char: 'wu', pinyin: 'wū', pronounceChar: '乌' },
  { char: 'yu', pinyin: 'yǖ', pronounceChar: '鱼' },
  { char: 'ye', pinyin: 'yē', pronounceChar: '爷' },
  { char: 'yue', pinyin: 'yuē', pronounceChar: '约' },
  { char: 'yuan', pinyin: 'yuán', pronounceChar: '元' },
  { char: 'yin', pinyin: 'yīn', pronounceChar: '因' },
  { char: 'yun', pinyin: 'yún', pronounceChar: '云' },
  { char: 'ying', pinyin: 'yīng', pronounceChar: '英' },
]

// 可拼读组合示例
export const SPELLING_COMBOS = [
  { initial: 'b', final: 'a', result: 'ba', meaning: '八', tone: 1 },
  { initial: 'b', final: 'o', result: 'bo', meaning: '波', tone: 1 },
  { initial: 'm', final: 'a', result: 'ma', meaning: '妈', tone: 1 },
  { initial: 'm', final: 'i', result: 'mi', meaning: '迷', tone: 2 },
  { initial: 'd', final: 'a', result: 'da', meaning: '大', tone: 4 },
  { initial: 'l', final: 'a', result: 'la', meaning: '拉', tone: 1 },
  { initial: 'g', final: 'e', result: 'ge', meaning: '歌', tone: 1 },
  { initial: 'h', final: 'e', result: 'he', meaning: '喝', tone: 1 },
  { initial: 'j', final: 'i', result: 'ji', meaning: '鸡', tone: 1 },
  { initial: 'q', final: 'i', result: 'qi', meaning: '七', tone: 1 },
  { initial: 'x', final: 'i', result: 'xi', meaning: '西', tone: 1 },
  { initial: 'zh', final: 'u', result: 'zhu', meaning: '猪', tone: 1 },
  { initial: 'ch', final: 'a', result: 'cha', meaning: '茶', tone: 2 },
  { initial: 'sh', final: 'u', result: 'shu', meaning: '书', tone: 1 },
  { initial: 'f', final: 'a', result: 'fa', meaning: '发', tone: 1 },
  { initial: 'h', final: 'u', result: 'hu', meaning: '虎', tone: 3 },
  { initial: 't', final: 'u', result: 'tu', meaning: '兔', tone: 4 },
  { initial: 'n', final: 'iu', result: 'niu', meaning: '牛', tone: 2 },
  { initial: 'l', final: 'ong', result: 'long', meaning: '龙', tone: 2 },
  { initial: 'sh', final: 'e', result: 'she', meaning: '蛇', tone: 2 },
]
