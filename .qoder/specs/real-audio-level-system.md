# Plan: Real CDN Audio + Score Effects + Level System Redesign

## Context

The KidsLearn children's learning app currently uses browser Web TTS (SpeechSynthesis API) for all pronunciation audio. The user has explicitly rejected this approach — "too rigid, worse than having nothing" — and requires real audio from online CDN. Additionally, the level progression system is too fast (levels up in minutes rather than days), and score increases lack visual feedback to engage children.

**Goals:**
1. Replace ALL Web TTS with Youdao Dictionary CDN real audio
2. Add floating score numbers + star particle effects on score increase
3. Redesign level formula so each level takes 3-5 days at 30 min/day

---

## Phase 1: CDN Audio System (Replace Web TTS)

### New Class: `CDNTTSManager` in `src/utils/audio.ts`

Replace the `TTSManager` class with a `CDNTTSManager` that uses Howler.js to play audio from Youdao CDN:

- **Chinese URL**: `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&type=1`
- **English URL**: `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&type=2`

**Class design:**
```typescript
class CDNTTSManager {
  private _enabled = true
  private _cache: Map<string, Howl> = new Map()  // URL -> Howl instance
  private _maxCache = 50
  private _currentSound: Howl | null = null

  speakChinese(text: string): void    // Play from Chinese CDN
  speakEnglish(text: string): void    // Play from English CDN
  speakSequence(texts: string[], lang: 'zh' | 'en'): void  // Play multiple in order
  preload(texts: string[], lang: 'zh' | 'en'): void        // Pre-fetch audio
  stop(): void                        // Stop current playback
}
```

**Caching:** Map keyed by URL, FIFO eviction at 50 entries. Howler auto-buffers decoded audio.

**Error handling:** `onloaderror` silently skips (no audio is better than broken UI).

**Preloading combo phrases:** Call `cdnTTS.preload(['Good', 'Great', 'Amazing', 'Excellent', 'Crazy', 'Unbelievable'], 'en')` during `audioManager.init()` in App.tsx (line 72).

### Files to Modify

| File | Changes |
|------|---------|
| `src/utils/audio.ts` | Remove `TTSManager` class. Add `CDNTTSManager` class. Export `cdnTTS` instead of `ttsManager`. Update `ComboFeedback.onCorrect()` to use `cdnTTS.speakEnglish(phrase)` |
| `src/pages/pinyin/InitialLearn.tsx` | Import `cdnTTS`, replace `ttsManager.speakChinese(selected.pronounceChar)` with `cdnTTS.speakChinese(selected.pronounceChar)` |
| `src/pages/pinyin/FinalLearn.tsx` | Same as InitialLearn |
| `src/pages/pinyin/SpellingGame.tsx` | Replace `ttsManager.speakChinese(combo.meaning)` with `cdnTTS.speakChinese(combo.meaning)` |
| `src/pages/english/AlphabetLearn.tsx` | Line 18: `cdnTTS.speakSequence([letter.upper, letter.word], 'en')`. Line 45: `cdnTTS.speakEnglish(item.upper)` |
| `src/pages/english/WordBuilder.tsx` | Replace `ttsManager.speakEnglish(word.english)` with `cdnTTS.speakEnglish(word.english)` |
| `src/pages/english/DialogScene.tsx` | Replace `ttsManager.speakEnglish(line.options![idx])` with `cdnTTS.speakEnglish(line.options![idx])` |
| `src/App.tsx` | Add `cdnTTS.preload(...)` call after `audioManager.init()` at line 72 |

---

## Phase 2: Score Visual Effects

### New Component: `src/components/common/ScoreEffect.tsx`

A reusable component that shows:
1. **Floating "+10" number** — rises 40px upward, fades out over 800ms (framer-motion)
2. **Star particle burst** — 6-8 small stars explode radially, fade over 600ms (CSS keyframes)

**Props:**
```typescript
interface ScoreEffectProps {
  trigger: number    // Pass score value; animation fires when this increases
  points: number    // The number to display (e.g., 10 or 15)
}
```

**Implementation:** Uses `useEffect` watching `trigger` to spawn animations. Each animation gets a unique ID and self-removes after completion. Stars use CSS `@keyframes` with `transform: translate()` + `opacity` for GPU-accelerated performance.

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/common/ScoreEffect.tsx` | **NEW** - Reusable score effect component |
| `src/pages/math/AddSubGame.tsx` | Wrap score display (line 173-176) in relative container, add `<ScoreEffect trigger={score} points={streak >= 5 ? 15 : 10} />` |
| `src/pages/math/TimedChallenge.tsx` | Add ScoreEffect near score display (line 106) |
| `src/pages/DailyChallengePage.tsx` | Add ScoreEffect near score area |
| `src/pages/pinyin/PinyinQuiz.tsx` | Add ScoreEffect near score area |

---

## Phase 3: Level Progression Redesign

### New Formula

**Current:** `calcExpNeeded(level) = level * 100 + 50` (too fast - levels up in minutes)

**New:** `calcExpNeeded(level) = 500 * level + 2000`

| Level | XP Required | Days at 30min/day (~750 XP/session) |
|-------|-------------|--------------------------------------|
| 1 | 2500 | ~3.3 days |
| 2 | 3000 | ~4.0 days |
| 3 | 3500 | ~4.7 days |
| 4 | 4000 | ~5.3 days |
| 5 | 4500 | ~6.0 days |

XP awards stay the same: 10 per correct, 15 with streak bonus.

### Migration Strategy

Recalculate `level` from `totalExp` on database load. This is mathematically consistent since `totalExp` is the ground truth.

### Files to Modify

| File | Changes |
|------|---------|
| `src/utils/experience.ts` | Update `calcExpNeeded` to `500 * level + 2000`. Update `calcLevel` to use new formula. |
| `src/store/useUserStore.ts` | Update local `calcExpNeeded` (line 20-22) to `500 * level + 2000`. In `loadFromDB`, recalculate level from totalExp after loading. |
| `src/db/index.ts` | Add `this.version(2)` with upgrade handler that recalculates `level` from `totalExp` for existing profiles. |

---

## Implementation Order

1. **Level system** (pure data, no UI risk)
2. **CDN audio** (core feature, replaces broken TTS)
3. **Score effects** (visual polish, independent)

---

## Verification

1. `npx tsc --noEmit` — no TypeScript errors
2. `npx vite build` — successful production build
3. Manual testing via dev server:
   - Navigate to Pinyin > Initials Learn → click a pinyin → verify real audio plays from CDN (network tab shows Youdao request)
   - Navigate to English > Alphabet → click a letter → verify CDN audio
   - Play a math game → answer correctly → verify floating "+10" with stars, combo voice plays real audio
   - Check level progress bar moves slowly (large XP requirement visible)
4. Verify on mobile (Capacitor): CDN audio works through WebView (Youdao URLs are CORS-friendly)
