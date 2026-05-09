export interface ChineseCharacter {
  char: string
  pinyin: string
  strokes: number
  meaning: string
  strokeOrder: string[]  // SVG path descriptions for each stroke
}

export interface Idiom {
  idiom: string
  pinyin: string
  meaning: string
  story: string
  example: string
}

export interface Poem {
  title: string
  author: string
  dynasty: string
  lines: string[]
  pinyin: string[]
  translation: string
}

// 常用汉字（带笔顺描述）
export const CHARACTERS: ChineseCharacter[] = [
  { char: '一', pinyin: 'yī', strokes: 1, meaning: '数字一', strokeOrder: ['横'] },
  { char: '二', pinyin: 'èr', strokes: 2, meaning: '数字二', strokeOrder: ['横', '横'] },
  { char: '三', pinyin: 'sān', strokes: 3, meaning: '数字三', strokeOrder: ['横', '横', '横'] },
  { char: '人', pinyin: 'rén', strokes: 2, meaning: '人类', strokeOrder: ['撇', '捺'] },
  { char: '大', pinyin: 'dà', strokes: 3, meaning: '大的', strokeOrder: ['横', '撇', '捺'] },
  { char: '小', pinyin: 'xiǎo', strokes: 3, meaning: '小的', strokeOrder: ['竖钩', '撇', '点'] },
  { char: '上', pinyin: 'shàng', strokes: 3, meaning: '上面', strokeOrder: ['竖', '横', '横'] },
  { char: '下', pinyin: 'xià', strokes: 3, meaning: '下面', strokeOrder: ['横', '竖', '点'] },
  { char: '山', pinyin: 'shān', strokes: 3, meaning: '山峰', strokeOrder: ['竖', '竖折', '竖'] },
  { char: '水', pinyin: 'shuǐ', strokes: 4, meaning: '水', strokeOrder: ['竖钩', '横撇', '撇', '捺'] },
  { char: '火', pinyin: 'huǒ', strokes: 4, meaning: '火焰', strokeOrder: ['点', '撇', '撇', '捺'] },
  { char: '土', pinyin: 'tǔ', strokes: 3, meaning: '泥土', strokeOrder: ['横', '竖', '横'] },
  { char: '日', pinyin: 'rì', strokes: 4, meaning: '太阳', strokeOrder: ['竖', '横折', '横', '横'] },
  { char: '月', pinyin: 'yuè', strokes: 4, meaning: '月亮', strokeOrder: ['撇', '横折钩', '横', '横'] },
  { char: '天', pinyin: 'tiān', strokes: 4, meaning: '天空', strokeOrder: ['横', '横', '撇', '捺'] },
  { char: '地', pinyin: 'dì', strokes: 6, meaning: '大地', strokeOrder: ['横', '竖', '提', '横折钩', '竖', '竖弯钩'] },
  { char: '口', pinyin: 'kǒu', strokes: 3, meaning: '嘴巴', strokeOrder: ['竖', '横折', '横'] },
  { char: '目', pinyin: 'mù', strokes: 5, meaning: '眼睛', strokeOrder: ['竖', '横折', '横', '横', '横'] },
  { char: '手', pinyin: 'shǒu', strokes: 4, meaning: '手', strokeOrder: ['撇', '横', '横', '竖钩'] },
  { char: '足', pinyin: 'zú', strokes: 7, meaning: '脚', strokeOrder: ['竖', '横折', '横', '竖', '横', '撇', '捺'] },
  { char: '花', pinyin: 'huā', strokes: 7, meaning: '花朵', strokeOrder: ['横', '竖', '竖', '撇', '竖', '撇', '竖弯钩'] },
  { char: '草', pinyin: 'cǎo', strokes: 9, meaning: '小草', strokeOrder: ['横', '竖', '竖', '竖', '横折', '横', '竖', '横折', '横'] },
  { char: '木', pinyin: 'mù', strokes: 4, meaning: '树木', strokeOrder: ['横', '竖', '撇', '捺'] },
  { char: '林', pinyin: 'lín', strokes: 8, meaning: '树林', strokeOrder: ['横', '竖', '撇', '捺', '横', '竖', '撇', '捺'] },
  { char: '风', pinyin: 'fēng', strokes: 4, meaning: '风', strokeOrder: ['撇', '横折弯钩', '撇', '点'] },
  { char: '雨', pinyin: 'yǔ', strokes: 8, meaning: '下雨', strokeOrder: ['横', '竖', '横折钩', '竖', '点', '点', '点', '点'] },
  { char: '云', pinyin: 'yún', strokes: 4, meaning: '云朵', strokeOrder: ['横', '横', '撇折', '点'] },
  { char: '石', pinyin: 'shí', strokes: 5, meaning: '石头', strokeOrder: ['横', '撇', '竖', '横折', '横'] },
  { char: '田', pinyin: 'tián', strokes: 5, meaning: '田地', strokeOrder: ['竖', '横折', '横', '竖', '横'] },
  { char: '禾', pinyin: 'hé', strokes: 5, meaning: '禾苗', strokeOrder: ['撇', '横', '竖', '撇', '捺'] },
]

// 成语故事
export const IDIOMS: Idiom[] = [
  {
    idiom: '守株待兔',
    pinyin: 'shǒu zhū dài tù',
    meaning: '比喻不努力而希望获得成功，或死守狭隘经验，不知变通。',
    story: '从前有个农夫在田里干活，突然一只兔子撞到树桩上死了。农夫白白捡了一只兔子，非常高兴。从此他不再干活，天天守在树桩旁等兔子，结果再也没等到。',
    example: '我们不能守株待兔，要靠自己努力才能成功。',
  },
  {
    idiom: '画蛇添足',
    pinyin: 'huà shé tiān zú',
    meaning: '比喻做了多余的事，反而不恰当。',
    story: '古时候几个人比赛画蛇，谁先画完谁喝酒。一个人最先画完，看别人还没画好，就给蛇添上了脚。结果别人说蛇没有脚，他画的不算蛇，酒就被别人喝了。',
    example: '作文写得已经很好了，再加那段话就是画蛇添足。',
  },
  {
    idiom: '掩耳盗铃',
    pinyin: 'yǎn ěr dào líng',
    meaning: '比喻自己欺骗自己。',
    story: '有个小偷想偷邻居家门上的铃铛，他怕铃铛响被人发现，就捂住自己的耳朵去偷。他以为自己听不见，别人也听不见，结果当然被发现了。',
    example: '考试不复习，以为不看成绩就没问题，这不是掩耳盗铃吗？',
  },
  {
    idiom: '亡羊补牢',
    pinyin: 'wáng yáng bǔ láo',
    meaning: '比喻出了问题后及时补救，还不算晚。',
    story: '从前有个人养了一群羊，羊圈破了个洞。狼从洞里钻进去叼走了一只羊。邻居劝他修补羊圈，他不听。第二天又丢了一只羊，他赶紧修好了羊圈，从此再也没丢过羊。',
    example: '虽然这次考试没考好，但亡羊补牢，现在开始认真学习还来得及。',
  },
  {
    idiom: '拔苗助长',
    pinyin: 'bá miáo zhù zhǎng',
    meaning: '比喻违反事物发展规律，急于求成，反而坏事。',
    story: '古时候有个农夫嫌禾苗长得太慢，就把每棵禾苗都往上拔了拔。他回家高兴地告诉家人禾苗长高了。第二天去看，禾苗全都枯死了。',
    example: '学习要循序渐进，不能拔苗助长。',
  },
  {
    idiom: '刻舟求剑',
    pinyin: 'kè zhōu qiú jiàn',
    meaning: '比喻办事刻板，不知变通。',
    story: '有个楚国人坐船过江，不小心把剑掉到水里了。他赶紧在船帮上刻了个记号，说等船靠岸后从刻记号的地方下水找剑。可是船已经走了，剑还在原处，怎么找得到呢？',
    example: '时代在变化，我们不能刻舟求剑，要与时俱进。',
  },
  {
    idiom: '井底之蛙',
    pinyin: 'jǐng dǐ zhī wā',
    meaning: '比喻见识短浅的人。',
    story: '一只青蛙住在井里，它觉得天空就只有井口那么大。有一天一只海龟告诉它大海有多么辽阔，青蛙不敢相信。',
    example: '我们要多读书多旅行，不要做井底之蛙。',
  },
  {
    idiom: '对牛弹琴',
    pinyin: 'duì niú tán qín',
    meaning: '比喻对不懂道理的人讲道理，白费力气。',
    story: '古时候有个琴师弹琴弹得很好，有一次他对着一头牛弹琴，可是牛只顾低头吃草，根本不听。',
    example: '跟他解释这些高深的理论，简直是对牛弹琴。',
  },
  {
    idiom: '狐假虎威',
    pinyin: 'hú jiǎ hǔ wēi',
    meaning: '比喻借别人的势力来欺压人。',
    story: '老虎抓住了狐狸，狐狸说自己是百兽之王，不信的话跟它走一趟。老虎跟在狐狸后面走，其他动物看到老虎都吓跑了，老虎以为它们是怕狐狸。',
    example: '他只不过是狐假虎威，仗着经理的势力欺负人。',
  },
  {
    idiom: '叶公好龙',
    pinyin: 'yè gōng hào lóng',
    meaning: '比喻口头上说喜欢，实际上并不真的喜欢。',
    story: '叶公非常喜欢龙，家里到处画满了龙。天上的真龙听说后很感动，亲自去看他。叶公一看到真龙，吓得魂飞魄散，赶紧逃跑了。',
    example: '他说喜欢运动，但从来不锻炼，真是叶公好龙。',
  },
]

// 古诗词
export const POEMS: Poem[] = [
  {
    title: '静夜思',
    author: '李白',
    dynasty: '唐',
    lines: ['床前明月光，', '疑是地上霜。', '举头望明月，', '低头思故乡。'],
    pinyin: ['chuáng qián míng yuè guāng，', 'yí shì dì shàng shuāng。', 'jǔ tóu wàng míng yuè，', 'dī tóu sī gù xiāng。'],
    translation: '床前洒着明亮的月光，好像地上铺了一层白霜。抬头看天上的明月，低头思念远方的家乡。',
  },
  {
    title: '春晓',
    author: '孟浩然',
    dynasty: '唐',
    lines: ['春眠不觉晓，', '处处闻啼鸟。', '夜来风雨声，', '花落知多少。'],
    pinyin: ['chūn mián bù jué xiǎo，', 'chù chù wén tí niǎo。', 'yè lái fēng yǔ shēng，', 'huā luò zhī duō shǎo。'],
    translation: '春天的夜晚睡得真香，不知不觉天就亮了。到处都能听到鸟儿在叫。昨夜刮风下雨，不知道花儿掉了多少。',
  },
  {
    title: '咏鹅',
    author: '骆宾王',
    dynasty: '唐',
    lines: ['鹅鹅鹅，', '曲项向天歌。', '白毛浮绿水，', '红掌拨清波。'],
    pinyin: ['é é é，', 'qū xiàng xiàng tiān gē。', 'bái máo fú lǜ shuǐ，', 'hóng zhǎng bō qīng bō。'],
    translation: '鹅鹅鹅，弯曲着脖子朝天唱歌。白色的羽毛浮在绿色的水面上，红色的脚掌拨动着清澈的水波。',
  },
  {
    title: '悯农（其二）',
    author: '李绅',
    dynasty: '唐',
    lines: ['锄禾日当午，', '汗滴禾下土。', '谁知盘中餐，', '粒粒皆辛苦。'],
    pinyin: ['chú hé rì dāng wǔ，', 'hàn dī hé xià tǔ。', 'shuí zhī pán zhōng cān，', 'lì lì jiē xīn kǔ。'],
    translation: '农民在烈日下锄禾，汗水滴到泥土里。谁知道盘子里的饭，每一粒都是农民辛苦劳动得来的。',
  },
  {
    title: '登鹳雀楼',
    author: '王之涣',
    dynasty: '唐',
    lines: ['白日依山尽，', '黄河入海流。', '欲穷千里目，', '更上一层楼。'],
    pinyin: ['bái rì yī shān jìn，', 'huáng hé rù hǎi liú。', 'yù qióng qiān lǐ mù，', 'gèng shàng yī céng lóu。'],
    translation: '太阳依着山慢慢落下去，黄河朝着大海奔流而去。想要看到更远的地方，就要再登上一层楼。',
  },
  {
    title: '望庐山瀑布',
    author: '李白',
    dynasty: '唐',
    lines: ['日照香炉生紫烟，', '遥看瀑布挂前川。', '飞流直下三千尺，', '疑是银河落九天。'],
    pinyin: ['rì zhào xiāng lú shēng zǐ yān，', 'yáo kàn pù bù guà qián chuān。', 'fēi liú zhí xià sān qiān chǐ，', 'yí shì yín hé luò jiǔ tiān。'],
    translation: '阳光照耀着香炉峰升起紫色的烟雾，远远看去瀑布像一条白练挂在山前。飞速流下的水好像有三千尺，好像是银河从天上落下来一样。',
  },
  {
    title: '早发白帝城',
    author: '李白',
    dynasty: '唐',
    lines: ['朝辞白帝彩云间，', '千里江陵一日还。', '两岸猿声啼不住，', '轻舟已过万重山。'],
    pinyin: ['zhāo cí bái dì cǎi yún jiān，', 'qiān lǐ jiāng líng yī rì huán。', 'liǎng àn yuán shēng tí bú zhù，', 'qīng zhōu yǐ guò wàn chóng shān。'],
    translation: '早晨告别白帝城，它好像在彩云中间。千里远的江陵一天就到了。两岸猿猴的叫声不停，小船已经飞过了万重山岭。',
  },
  {
    title: '绝句',
    author: '杜甫',
    dynasty: '唐',
    lines: ['两个黄鹂鸣翠柳，', '一行白鹭上青天。', '窗含西岭千秋雪，', '门泊东吴万里船。'],
    pinyin: ['liǎng gè huáng lí míng cuì liǔ，', 'yī háng bái lù shàng qīng tiān。', 'chuāng hán xī lǐng qiān qiū xuě，', 'mén bó dōng wú wàn lǐ chuán。'],
    translation: '两只黄鹂在翠绿的柳树上歌唱，一行白鹭飞上蔚蓝的天空。窗户对着西岭的千年积雪，门前停着从万里之外来的船。',
  },
  {
    title: '江南',
    author: '汉乐府',
    dynasty: '汉',
    lines: ['江南可采莲，', '莲叶何田田。', '鱼戏莲叶间，', '鱼戏莲叶东，', '鱼戏莲叶西，', '鱼戏莲叶南，', '鱼戏莲叶北。'],
    pinyin: ['jiāng nán kě cǎi lián，', 'lián yè hé tián tián。', 'yú xì lián yè jiān，', 'yú xì lián yè dōng，', 'yú xì lián yè xī，', 'yú xì lián yè nán，', 'yú xì lián yè běi。'],
    translation: '江南是采莲的好地方，莲叶长得多么茂盛。鱼儿在莲叶间嬉戏，一会儿游到东边，一会儿游到西边，一会儿游到南边，一会儿游到北边。',
  },
  {
    title: '赋得古原草送别',
    author: '白居易',
    dynasty: '唐',
    lines: ['离离原上草，', '一岁一枯荣。', '野火烧不尽，', '春风吹又生。'],
    pinyin: ['lí lí yuán shàng cǎo，', 'yī suì yī kū róng。', 'yě huǒ shāo bú jìn，', 'chūn fēng chuī yòu shēng。'],
    translation: '原野上的草长得很茂盛，每年都会枯萎和重新生长。野火也烧不完它，春风一吹又会长出来。',
  },
]
