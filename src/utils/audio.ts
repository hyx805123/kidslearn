import { Howl, Howler } from 'howler'

type SoundName =
  | 'click'
  | 'correct'
  | 'wrong'
  | 'levelUp'
  | 'badge'
  | 'pop'
  | 'whoosh'
  | 'tick'

// ========== CDN 真实发音系统（有道词典 API）==========
class CDNTTSManager {
  private _enabled = true
  private _cache: Map<string, Howl> = new Map()
  private _maxCache = 50
  private _currentSound: Howl | null = null
  private _cacheOrder: string[] = []

  get enabled() { return this._enabled }
  set enabled(v: boolean) { this._enabled = v }

  private getUrl(text: string, lang: 'zh' | 'en'): string {
    if (lang === 'zh') {
      // 中文使用 le=zh 参数确保中文发音
      return `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&le=zh`
    }
    // 英文使用 type=2 美式发音
    return `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&le=en&type=2`
  }

  private getOrCreate(url: string): Howl {
    const cached = this._cache.get(url)
    if (cached) return cached

    // FIFO 缓存淘汰
    if (this._cache.size >= this._maxCache) {
      const oldest = this._cacheOrder.shift()
      if (oldest) {
        const old = this._cache.get(oldest)
        old?.unload()
        this._cache.delete(oldest)
      }
    }

    const howl = new Howl({
      src: [url],
      html5: true, // 使用 HTML5 Audio 避免 CORS 问题
      volume: 1.0,
    })
    this._cache.set(url, howl)
    this._cacheOrder.push(url)
    return howl
  }

  private play(url: string) {
    if (!this._enabled) return
    // 停止当前正在播放的
    if (this._currentSound) {
      this._currentSound.stop()
    }
    const howl = this.getOrCreate(url)
    this._currentSound = howl
    howl.play()
  }

  speakChinese(text: string) {
    if (!text) return
    const url = this.getUrl(text, 'zh')
    this.play(url)
  }

  speakEnglish(text: string) {
    if (!text) return
    const url = this.getUrl(text, 'en')
    this.play(url)
  }

  /**
   * 按顺序播放多个音频（如先读字母再读单词）
   */
  speakSequence(texts: string[], lang: 'zh' | 'en') {
    if (!this._enabled || texts.length === 0) return
    if (this._currentSound) {
      this._currentSound.stop()
    }

    let index = 0
    const playNext = () => {
      if (index >= texts.length) return
      const url = this.getUrl(texts[index], lang)
      const howl = this.getOrCreate(url)
      this._currentSound = howl
      howl.once('end', () => {
        index++
        playNext()
      })
      howl.once('loaderror', () => {
        index++
        playNext()
      })
      howl.play()
    }
    playNext()
  }

  /**
   * 预加载音频（用于需要即时播放的场景）
   */
  preload(texts: string[], lang: 'zh' | 'en') {
    texts.forEach(text => {
      const url = this.getUrl(text, lang)
      if (!this._cache.has(url)) {
        this.getOrCreate(url) // Howl 创建时会自动开始加载
      }
    })
  }

  stop() {
    if (this._currentSound) {
      this._currentSound.stop()
      this._currentSound = null
    }
  }
}

export const cdnTTS = new CDNTTSManager()

// ========== 本地拼音音频播放器（使用 digmandarin.com 标准发音）==========
class PinyinAudioPlayer {
  private _cache: Map<string, Howl> = new Map()
  private _currentSound: Howl | null = null
  private _enabled = true

  get enabled() { return this._enabled }
  set enabled(v: boolean) { this._enabled = v }

  /**
   * 将拼音字符转为安全文件名（处理 ü → v 映射）
   */
  private toFileName(name: string): string {
    return name.replace(/ü/g, 'v')
  }

  /**
   * 播放拼音音频（如 'b', 'a', 'zh', 'ang', 'zhi', 'ü' 等）
   * 音频文件存储在 /audio/pinyin/{name}.mp3
   */
  playPinyin(name: string) {
    if (!this._enabled || !name) return
    const fileName = this.toFileName(name)
    const url = `/audio/pinyin/${fileName}.mp3`
    this.playUrl(url)
  }

  /**
   * 播放拼读组合的结果音频（如 'ba', 'ma', 'zhu' 等）
   */
  playCombo(result: string) {
    if (!this._enabled || !result) return
    const fileName = this.toFileName(result)
    const url = `/audio/pinyin/${fileName}.mp3`
    this.playUrl(url)
  }

  private playUrl(url: string) {
    if (this._currentSound) {
      this._currentSound.stop()
    }
    let howl = this._cache.get(url)
    if (!howl) {
      howl = new Howl({
        src: [url],
        html5: true,
        volume: 1.0,
      })
      this._cache.set(url, howl)
    }
    this._currentSound = howl
    howl.play()
  }

  stop() {
    if (this._currentSound) {
      this._currentSound.stop()
      this._currentSound = null
    }
  }
}

export const pinyinAudio = new PinyinAudioPlayer()

class AudioManager {
  private sounds: Map<string, Howl> = new Map()
  private _enabled = true
  private _volume = 0.8
  private _unlocked = false

  get enabled() { return this._enabled }
  set enabled(v: boolean) {
    this._enabled = v
    if (!v) Howler.volume(0)
    else Howler.volume(this._volume)
  }

  get volume() { return this._volume }
  set volume(v: number) {
    this._volume = Math.max(0, Math.min(1, v))
    if (this._enabled) Howler.volume(this._volume)
  }

  unlock() {
    if (this._unlocked) return
    // Create a silent sound to unlock audio context on iOS
    const s = new Howl({ src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA='], volume: 0 })
    s.play()
    this._unlocked = true
  }

  // Generate simple tones using Web Audio API
  private generateTone(frequency: number, duration: number, type: OscillatorType = 'sine'): Howl {
    const audioCtx = Howler.ctx
    if (!audioCtx) {
      return new Howl({ src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA='] })
    }

    const sampleRate = audioCtx.sampleRate
    const numSamples = Math.floor(sampleRate * duration)
    const buffer = audioCtx.createBuffer(1, numSamples, sampleRate)
    const channel = buffer.getChannelData(0)

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate
      const envelope = Math.min(1, (numSamples - i) / (sampleRate * 0.1)) * Math.min(1, i / (sampleRate * 0.01))
      let sample = 0
      if (type === 'sine') sample = Math.sin(2 * Math.PI * frequency * t)
      else if (type === 'square') sample = Math.sign(Math.sin(2 * Math.PI * frequency * t))
      else if (type === 'triangle') sample = 2 * Math.abs(2 * (t * frequency - Math.floor(t * frequency + 0.5))) - 1
      channel[i] = sample * envelope * 0.3
    }

    // Encode to WAV
    const wav = this.encodeWAV(buffer)
    const blob = new Blob([wav], { type: 'audio/wav' })
    const url = URL.createObjectURL(blob)
    return new Howl({ src: [url], format: ['wav'] })
  }

  private encodeWAV(buffer: AudioBuffer): ArrayBuffer {
    const numChannels = 1
    const sampleRate = buffer.sampleRate
    const data = buffer.getChannelData(0)
    const dataLength = data.length * 2
    const arrayBuffer = new ArrayBuffer(44 + dataLength)
    const view = new DataView(arrayBuffer)

    const writeString = (offset: number, str: string) => {
      for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i))
    }

    writeString(0, 'RIFF')
    view.setUint32(4, 36 + dataLength, true)
    writeString(8, 'WAVE')
    writeString(12, 'fmt ')
    view.setUint32(16, 16, true)
    view.setUint16(20, 1, true)
    view.setUint16(22, numChannels, true)
    view.setUint32(24, sampleRate, true)
    view.setUint32(28, sampleRate * numChannels * 2, true)
    view.setUint16(32, numChannels * 2, true)
    view.setUint16(34, 16, true)
    writeString(36, 'data')
    view.setUint32(40, dataLength, true)

    let offset = 44
    for (let i = 0; i < data.length; i++) {
      const sample = Math.max(-1, Math.min(1, data[i]))
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true)
      offset += 2
    }
    return arrayBuffer
  }

  init() {
    // Force Howler to create AudioContext by instantiating a dummy Howl
    const dummy = new Howl({
      src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA='],
      volume: 0,
    })
    dummy.play()
    dummy.stop()

    // Wait a tick for AudioContext to be ready, then generate sounds
    setTimeout(() => {
      this.sounds.set('click', this.createClickSound())
      this.sounds.set('correct', this.createCorrectSound())
      this.sounds.set('wrong', this.createWrongSound())
      this.sounds.set('levelUp', this.createLevelUpSound())
      this.sounds.set('badge', this.createBadgeSound())
      this.sounds.set('pop', this.createPopSound())
      this.sounds.set('whoosh', this.createWhooshSound())
      this.sounds.set('tick', this.createTickSound())
    }, 100)
  }

  // 轻快的点击音 - 像气泡弹出
  private createClickSound(): Howl {
    const audioCtx = Howler.ctx
    if (!audioCtx) return this.generateTone(800, 0.05)
    const sampleRate = audioCtx.sampleRate
    const duration = 0.08
    const numSamples = Math.floor(sampleRate * duration)
    const buffer = audioCtx.createBuffer(1, numSamples, sampleRate)
    const channel = buffer.getChannelData(0)
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate
      const envelope = Math.exp(-t * 40) * Math.min(1, i / (sampleRate * 0.002))
      const freq = 1200 - t * 3000
      channel[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.3
    }
    const wav = this.encodeWAV(buffer)
    const blob = new Blob([wav], { type: 'audio/wav' })
    return new Howl({ src: [URL.createObjectURL(blob)], format: ['wav'] })
  }

  // 欢快的气泡弹出声
  private createPopSound(): Howl {
    const audioCtx = Howler.ctx
    if (!audioCtx) return this.generateTone(600, 0.08)
    const sampleRate = audioCtx.sampleRate
    const duration = 0.15
    const numSamples = Math.floor(sampleRate * duration)
    const buffer = audioCtx.createBuffer(1, numSamples, sampleRate)
    const channel = buffer.getChannelData(0)
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate
      const envelope = Math.exp(-t * 25) * Math.min(1, i / (sampleRate * 0.001))
      const f1 = 800 + Math.sin(t * 30) * 200
      const f2 = 1200 + Math.sin(t * 50) * 100
      channel[i] = (Math.sin(2 * Math.PI * f1 * t) * 0.5 + Math.sin(2 * Math.PI * f2 * t) * 0.3) * envelope * 0.3
    }
    const wav = this.encodeWAV(buffer)
    const blob = new Blob([wav], { type: 'audio/wav' })
    return new Howl({ src: [URL.createObjectURL(blob)], format: ['wav'] })
  }

  // 轻柔的划过声
  private createWhooshSound(): Howl {
    const audioCtx = Howler.ctx
    if (!audioCtx) return this.generateTone(400, 0.15)
    const sampleRate = audioCtx.sampleRate
    const duration = 0.2
    const numSamples = Math.floor(sampleRate * duration)
    const buffer = audioCtx.createBuffer(1, numSamples, sampleRate)
    const channel = buffer.getChannelData(0)
    // 使用确定性噪声避免每次不同
    let noiseState = 12345
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate
      const envelope = Math.sin(Math.PI * t / duration) * 0.2
      noiseState = (noiseState * 1103515245 + 12345) & 0x7fffffff
      const noise = (noiseState / 0x7fffffff) * 2 - 1
      const sweep = Math.sin(2 * Math.PI * (300 + t * 2000) * t)
      channel[i] = (noise * 0.4 + sweep * 0.6) * envelope
    }
    const wav = this.encodeWAV(buffer)
    const blob = new Blob([wav], { type: 'audio/wav' })
    return new Howl({ src: [URL.createObjectURL(blob)], format: ['wav'] })
  }

  // 轻巧的滴答声
  private createTickSound(): Howl {
    const audioCtx = Howler.ctx
    if (!audioCtx) return this.generateTone(1000, 0.03)
    const sampleRate = audioCtx.sampleRate
    const duration = 0.05
    const numSamples = Math.floor(sampleRate * duration)
    const buffer = audioCtx.createBuffer(1, numSamples, sampleRate)
    const channel = buffer.getChannelData(0)
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate
      const envelope = Math.exp(-t * 80)
      channel[i] = Math.sin(2 * Math.PI * 2400 * t) * envelope * 0.2
    }
    const wav = this.encodeWAV(buffer)
    const blob = new Blob([wav], { type: 'audio/wav' })
    return new Howl({ src: [URL.createObjectURL(blob)], format: ['wav'] })
  }

  // 徽章获得 - 魔法铃铛声
  private createBadgeSound(): Howl {
    const audioCtx = Howler.ctx
    if (!audioCtx) return this.generateTone(1200, 0.3)
    const sampleRate = audioCtx.sampleRate
    const duration = 0.6
    const numSamples = Math.floor(sampleRate * duration)
    const buffer = audioCtx.createBuffer(1, numSamples, sampleRate)
    const channel = buffer.getChannelData(0)
    const freqs = [1047, 1319, 1568, 2093]
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate
      const envelope = Math.exp(-t * 4) * Math.min(1, i / (sampleRate * 0.005))
      let sample = 0
      for (let f = 0; f < freqs.length; f++) {
        const delay = f * 0.08
        if (t > delay) {
          const localT = t - delay
          const localEnv = Math.exp(-localT * 5)
          sample += Math.sin(2 * Math.PI * freqs[f] * localT) * localEnv * 0.25
        }
      }
      channel[i] = sample * envelope * 0.3
    }
    const wav = this.encodeWAV(buffer)
    const blob = new Blob([wav], { type: 'audio/wav' })
    return new Howl({ src: [URL.createObjectURL(blob)], format: ['wav'] })
  }

  // 答对了！欢快的上升琶音 + 小星星闪烁感
  private createCorrectSound(): Howl {
    const audioCtx = Howler.ctx
    if (!audioCtx) return this.generateTone(880, 0.2)
    const sampleRate = audioCtx.sampleRate
    const duration = 0.45
    const numSamples = Math.floor(sampleRate * duration)
    const buffer = audioCtx.createBuffer(1, numSamples, sampleRate)
    const channel = buffer.getChannelData(0)
    // 快速上升琶音: C5 -> E5 -> G5 -> C6，带闪烁泛音
    const notes = [523, 659, 784, 1047]
    const noteLen = 0.09
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate
      let sample = 0
      for (let n = 0; n < notes.length; n++) {
        const start = n * noteLen
        if (t >= start) {
          const localT = t - start
          const env = Math.exp(-localT * 8) * Math.min(1, localT / 0.003)
          // 主音 + 高八度泛音
          sample += Math.sin(2 * Math.PI * notes[n] * localT) * env * 0.25
          sample += Math.sin(2 * Math.PI * notes[n] * 2 * localT) * env * 0.1
        }
      }
      // 结尾加一点"闪烁"
      if (t > 0.35) {
        const sparkle = Math.sin(2 * Math.PI * 2093 * t) * Math.exp(-(t - 0.35) * 15) * 0.08
        sample += sparkle
      }
      channel[i] = sample * 0.4
    }
    const wav = this.encodeWAV(buffer)
    const blob = new Blob([wav], { type: 'audio/wav' })
    return new Howl({ src: [URL.createObjectURL(blob)], format: ['wav'] })
  }

  // 答错了 - 温柔的"嗯哦"下降音，不吓到孩子
  private createWrongSound(): Howl {
    const audioCtx = Howler.ctx
    if (!audioCtx) return this.generateTone(200, 0.3)
    const sampleRate = audioCtx.sampleRate
    const duration = 0.35
    const numSamples = Math.floor(sampleRate * duration)
    const buffer = audioCtx.createBuffer(1, numSamples, sampleRate)
    const channel = buffer.getChannelData(0)
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate
      // 柔和的包络，快起慢落
      const envelope = Math.min(1, i / (sampleRate * 0.01)) * Math.exp(-t * 5)
      // 从E4下滑到C4，温柔的小三度下行
      const freq = 330 - t * 70
      // 圆润的音色（正弦+少量二次谐波）
      const sample = Math.sin(2 * Math.PI * freq * t) * 0.7 +
        Math.sin(2 * Math.PI * freq * 2 * t) * 0.15
      channel[i] = sample * envelope * 0.25
    }
    const wav = this.encodeWAV(buffer)
    const blob = new Blob([wav], { type: 'audio/wav' })
    return new Howl({ src: [URL.createObjectURL(blob)], format: ['wav'] })
  }

  // 升级！华丽的上行音阶 + 星光
  private createLevelUpSound(): Howl {
    const audioCtx = Howler.ctx
    if (!audioCtx) return this.generateTone(880, 0.5)
    const sampleRate = audioCtx.sampleRate
    const duration = 0.8
    const numSamples = Math.floor(sampleRate * duration)
    const buffer = audioCtx.createBuffer(1, numSamples, sampleRate)
    const channel = buffer.getChannelData(0)
    // C5 D5 E5 G5 C6 - 五声音阶上行
    const notes = [523, 587, 659, 784, 1047]
    const noteLen = 0.12
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate
      let sample = 0
      for (let n = 0; n < notes.length; n++) {
        const start = n * noteLen
        if (t >= start) {
          const localT = t - start
          const env = Math.exp(-localT * 4) * Math.min(1, localT / 0.005)
          sample += Math.sin(2 * Math.PI * notes[n] * localT) * env * 0.2
          sample += Math.sin(2 * Math.PI * notes[n] * 2 * localT) * env * 0.08
          sample += Math.sin(2 * Math.PI * notes[n] * 3 * localT) * env * 0.04
        }
      }
      // 结尾辉煌和弦
      if (t > 0.6) {
        const chordT = t - 0.6
        const chordEnv = Math.exp(-chordT * 5) * Math.min(1, chordT / 0.005)
        sample += Math.sin(2 * Math.PI * 1047 * chordT) * chordEnv * 0.15
        sample += Math.sin(2 * Math.PI * 1319 * chordT) * chordEnv * 0.12
        sample += Math.sin(2 * Math.PI * 1568 * chordT) * chordEnv * 0.1
      }
      channel[i] = sample * 0.4
    }
    const wav = this.encodeWAV(buffer)
    const blob = new Blob([wav], { type: 'audio/wav' })
    return new Howl({ src: [URL.createObjectURL(blob)], format: ['wav'] })
  }

  play(name: SoundName) {
    if (!this._enabled) return
    const sound = this.sounds.get(name)
    if (sound) sound.play()
  }
}

export const audioManager = new AudioManager()

// ========== 消消乐风格连击反馈系统（本地欢快音频）==========
const COMBO_PHRASES = ['Good', 'Great', 'Amazing', 'Excellent', 'Crazy', 'Unbelievable'] as const

class ComboFeedback {
  private streak = 0
  private _preloaded = false
  private _phraseAudios: Map<string, Howl> = new Map()

  /**
   * 预加载本地 combo 语音短语
   */
  preloadPhrases() {
    if (this._preloaded) return
    COMBO_PHRASES.forEach(phrase => {
      const key = phrase.toLowerCase()
      const howl = new Howl({
        src: [`/audio/combo/${key}.mp3`],
        volume: 1.0,
        preload: true,
      })
      this._phraseAudios.set(key, howl)
    })
    this._preloaded = true
  }

  /**
   * 答对时调用 - 根据连续答对次数播放不同级别的语音鼓励
   */
  onCorrect() {
    this.streak++
    const level = Math.min(this.streak, COMBO_PHRASES.length) - 1
    const phrase = COMBO_PHRASES[level]

    // 先播放音效
    audioManager.play('correct')

    // 延迟播放本地欢快语音鼓励（等音效放完）
    setTimeout(() => {
      const howl = this._phraseAudios.get(phrase.toLowerCase())
      if (howl) {
        howl.play()
      }
    }, 450)

    return { phrase, level: level + 1, streak: this.streak }
  }

  /**
   * 答错时调用 - 重置连击
   */
  onWrong() {
    this.streak = 0
    audioManager.play('wrong')
  }

  /**
   * 重置连击
   */
  reset() {
    this.streak = 0
  }

  getStreak() {
    return this.streak
  }
}

export const comboFeedback = new ComboFeedback()

