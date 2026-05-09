import type { BadgeDefinition } from '@/types'

export const BADGES: BadgeDefinition[] = [
  // 通用
  { id: 'first_login', name: '初次登场', description: '第一次进入学习平台', icon: '🌟', subject: 'general', condition: 'first_login' },
  { id: 'streak_3', name: '三天打卡', description: '连续学习3天', icon: '🔥', subject: 'general', condition: 'streak_3' },
  { id: 'streak_7', name: '一周坚持', description: '连续学习7天', icon: '💪', subject: 'general', condition: 'streak_7' },
  { id: 'streak_30', name: '月度之星', description: '连续学习30天', icon: '⭐', subject: 'general', condition: 'streak_30' },
  { id: 'level_5', name: '小小学霸', description: '达到5级', icon: '🎓', subject: 'general', condition: 'level_5' },
  { id: 'level_10', name: '学习达人', description: '达到10级', icon: '🏆', subject: 'general', condition: 'level_10' },
  { id: 'challenge_first', name: '挑战新手', description: '完成第一次每日挑战', icon: '🎯', subject: 'general', condition: 'challenge_first' },
  { id: 'challenge_perfect', name: '满分挑战', description: '每日挑战全部答对', icon: '💯', subject: 'general', condition: 'challenge_perfect' },

  // 拼音
  { id: 'pinyin_initials', name: '声母达人', description: '学完全部声母', icon: '🅰️', subject: 'pinyin', condition: 'pinyin_initials_complete' },
  { id: 'pinyin_finals', name: '韵母达人', description: '学完全部韵母', icon: '🅱️', subject: 'pinyin', condition: 'pinyin_finals_complete' },
  { id: 'pinyin_spelling', name: '拼读小能手', description: '成功拼读50个音节', icon: '🔤', subject: 'pinyin', condition: 'pinyin_spelling_50' },
  { id: 'pinyin_master', name: '拼音大师', description: '拼音测验正确率达到90%', icon: '👑', subject: 'pinyin', condition: 'pinyin_accuracy_90' },

  // 数学
  { id: 'math_addsub', name: '加减法小将', description: '完成加减法闯关', icon: '➕', subject: 'math', condition: 'math_addsub_complete' },
  { id: 'math_muldiv', name: '乘除法达人', description: '完成乘除法闯关', icon: '✖️', subject: 'math', condition: 'math_muldiv_complete' },
  { id: 'math_speed', name: '速算王', description: '计时挑战得分超过80', icon: '⚡', subject: 'math', condition: 'math_speed_80' },
  { id: 'math_streak10', name: '十连对', description: '连续答对10道数学题', icon: '🎯', subject: 'math', condition: 'math_streak_10' },
  { id: 'math_master', name: '数学大师', description: '完成全部数学关卡', icon: '🧮', subject: 'math', condition: 'math_all_complete' },

  // 语文
  { id: 'chinese_stroke10', name: '书写新手', description: '学习10个汉字的笔顺', icon: '✍️', subject: 'chinese', condition: 'chinese_stroke_10' },
  { id: 'chinese_stroke50', name: '书法家', description: '学习50个汉字的笔顺', icon: '🖊️', subject: 'chinese', condition: 'chinese_stroke_50' },
  { id: 'chinese_idiom10', name: '成语通', description: '学习10个成语故事', icon: '📖', subject: 'chinese', condition: 'chinese_idiom_10' },
  { id: 'chinese_poem10', name: '诗词达人', description: '学习10首古诗', icon: '📜', subject: 'chinese', condition: 'chinese_poem_10' },
  { id: 'chinese_master', name: '语文大师', description: '语文测验正确率达到90%', icon: '🏅', subject: 'chinese', condition: 'chinese_accuracy_90' },

  // 英语
  { id: 'english_alphabet', name: 'ABC达人', description: '学完全部26个字母', icon: '🔡', subject: 'english', condition: 'english_alphabet_complete' },
  { id: 'english_words20', name: '单词小能手', description: '成功拼出20个单词', icon: '📝', subject: 'english', condition: 'english_words_20' },
  { id: 'english_words50', name: '词汇达人', description: '成功拼出50个单词', icon: '📚', subject: 'english', condition: 'english_words_50' },
  { id: 'english_phonics', name: '拼读高手', description: '完成自然拼读学习', icon: '🗣️', subject: 'english', condition: 'english_phonics_complete' },
  { id: 'english_dialog', name: '对话之星', description: '完成5个情景对话', icon: '💬', subject: 'english', condition: 'english_dialog_5' },
  { id: 'english_master', name: '英语大师', description: '英语测验正确率达到90%', icon: '🌍', subject: 'english', condition: 'english_accuracy_90' },
]
