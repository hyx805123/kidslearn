export interface PinyinItem {
  char: string
  pinyin: string
  audio?: string
}

// 23个声母
export const INITIALS: PinyinItem[] = [
  { char: 'b', pinyin: 'bō' }, { char: 'p', pinyin: 'pō' },
  { char: 'm', pinyin: 'mō' }, { char: 'f', pinyin: 'fō' },
  { char: 'd', pinyin: 'dé' }, { char: 't', pinyin: 'tè' },
  { char: 'n', pinyin: 'né' }, { char: 'l', pinyin: 'lè' },
  { char: 'g', pinyin: 'gē' }, { char: 'k', pinyin: 'kē' },
  { char: 'h', pinyin: 'hē' }, { char: 'j', pinyin: 'jī' },
  { char: 'q', pinyin: 'qī' }, { char: 'x', pinyin: 'xī' },
  { char: 'zh', pinyin: 'zhī' }, { char: 'ch', pinyin: 'chī' },
  { char: 'sh', pinyin: 'shī' }, { char: 'r', pinyin: 'rì' },
  { char: 'z', pinyin: 'zī' }, { char: 'c', pinyin: 'cī' },
  { char: 's', pinyin: 'sī' }, { char: 'y', pinyin: 'yī' },
  { char: 'w', pinyin: 'wū' },
]

// 24个韵母
export const FINALS: PinyinItem[] = [
  { char: 'a', pinyin: 'ā' }, { char: 'o', pinyin: 'ō' },
  { char: 'e', pinyin: 'ē' }, { char: 'i', pinyin: 'ī' },
  { char: 'u', pinyin: 'ū' }, { char: 'ü', pinyin: 'ǖ' },
  { char: 'ai', pinyin: 'āi' }, { char: 'ei', pinyin: 'ēi' },
  { char: 'ui', pinyin: 'uī' }, { char: 'ao', pinyin: 'āo' },
  { char: 'ou', pinyin: 'ōu' }, { char: 'iu', pinyin: 'iū' },
  { char: 'ie', pinyin: 'iē' }, { char: 'üe', pinyin: 'üē' },
  { char: 'er', pinyin: 'ēr' }, { char: 'an', pinyin: 'ān' },
  { char: 'en', pinyin: 'ēn' }, { char: 'in', pinyin: 'īn' },
  { char: 'un', pinyin: 'ūn' }, { char: 'ün', pinyin: 'ǖn' },
  { char: 'ang', pinyin: 'āng' }, { char: 'eng', pinyin: 'ēng' },
  { char: 'ing', pinyin: 'īng' }, { char: 'ong', pinyin: 'ōng' },
]

// 16个整体认读音节
export const WHOLE_SYLLABLES: PinyinItem[] = [
  { char: 'zhi', pinyin: 'zhī' }, { char: 'chi', pinyin: 'chī' },
  { char: 'shi', pinyin: 'shī' }, { char: 'ri', pinyin: 'rì' },
  { char: 'zi', pinyin: 'zī' }, { char: 'ci', pinyin: 'cī' },
  { char: 'si', pinyin: 'sī' }, { char: 'yi', pinyin: 'yī' },
  { char: 'wu', pinyin: 'wū' }, { char: 'yu', pinyin: 'yǖ' },
  { char: 'ye', pinyin: 'yē' }, { char: 'yue', pinyin: 'yuē' },
  { char: 'yuan', pinyin: 'yuán' }, { char: 'yin', pinyin: 'yīn' },
  { char: 'yun', pinyin: 'yún' }, { char: 'ying', pinyin: 'yīng' },
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
