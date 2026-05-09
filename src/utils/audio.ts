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
      this.sounds.set('click', this.generateTone(800, 0.05, 'sine'))
      this.sounds.set('correct', this.createCorrectSound())
      this.sounds.set('wrong', this.createWrongSound())
      this.sounds.set('levelUp', this.createLevelUpSound())
      this.sounds.set('badge', this.generateTone(1200, 0.3, 'sine'))
      this.sounds.set('pop', this.generateTone(600, 0.08, 'sine'))
      this.sounds.set('whoosh', this.generateTone(400, 0.15, 'triangle'))
      this.sounds.set('tick', this.generateTone(1000, 0.03, 'square'))
    }, 100)
  }

  private createCorrectSound(): Howl {
    const audioCtx = Howler.ctx
    if (!audioCtx) return this.generateTone(880, 0.2)
    const sampleRate = audioCtx.sampleRate
    const duration = 0.3
    const numSamples = Math.floor(sampleRate * duration)
    const buffer = audioCtx.createBuffer(1, numSamples, sampleRate)
    const channel = buffer.getChannelData(0)
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate
      const envelope = Math.min(1, (numSamples - i) / (sampleRate * 0.1)) * Math.min(1, i / (sampleRate * 0.005))
      const freq = t < 0.15 ? 523 : 784 // C5 -> G5
      channel[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.3
    }
    const wav = this.encodeWAV(buffer)
    const blob = new Blob([wav], { type: 'audio/wav' })
    return new Howl({ src: [URL.createObjectURL(blob)], format: ['wav'] })
  }

  private createWrongSound(): Howl {
    const audioCtx = Howler.ctx
    if (!audioCtx) return this.generateTone(200, 0.3)
    const sampleRate = audioCtx.sampleRate
    const duration = 0.4
    const numSamples = Math.floor(sampleRate * duration)
    const buffer = audioCtx.createBuffer(1, numSamples, sampleRate)
    const channel = buffer.getChannelData(0)
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate
      const envelope = Math.min(1, (numSamples - i) / (sampleRate * 0.15))
      const freq = 300 - t * 200
      channel[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.25
    }
    const wav = this.encodeWAV(buffer)
    const blob = new Blob([wav], { type: 'audio/wav' })
    return new Howl({ src: [URL.createObjectURL(blob)], format: ['wav'] })
  }

  private createLevelUpSound(): Howl {
    const audioCtx = Howler.ctx
    if (!audioCtx) return this.generateTone(880, 0.5)
    const sampleRate = audioCtx.sampleRate
    const duration = 0.6
    const numSamples = Math.floor(sampleRate * duration)
    const buffer = audioCtx.createBuffer(1, numSamples, sampleRate)
    const channel = buffer.getChannelData(0)
    const notes = [523, 659, 784, 1047] // C5 E5 G5 C6
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate
      const noteIdx = Math.min(Math.floor(t / 0.15), notes.length - 1)
      const envelope = Math.min(1, (numSamples - i) / (sampleRate * 0.1)) * Math.min(1, i / (sampleRate * 0.005))
      channel[i] = Math.sin(2 * Math.PI * notes[noteIdx] * t) * envelope * 0.3
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
