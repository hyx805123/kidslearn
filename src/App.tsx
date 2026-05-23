import { Suspense, lazy, useEffect, useState, useCallback, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Howler } from 'howler'
import { AppShell } from '@/components/layout/AppShell'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { useUserStore } from '@/store/useUserStore'
import { useSettingsStore } from '@/store/useSettingsStore'
import { initDefaultData } from '@/db'
import { audioManager, comboFeedback } from '@/utils/audio'

// Lazy loaded pages
const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })))
const ProfilePage = lazy(() => import('@/pages/ProfilePage').then(m => ({ default: m.ProfilePage })))
const DailyChallengePage = lazy(() => import('@/pages/DailyChallengePage').then(m => ({ default: m.DailyChallengePage })))
const ParentPage = lazy(() => import('@/pages/ParentPage').then(m => ({ default: m.ParentPage })))

// Pinyin
const PinyinHome = lazy(() => import('@/pages/pinyin/PinyinHome').then(m => ({ default: m.PinyinHome })))
const InitialLearn = lazy(() => import('@/pages/pinyin/InitialLearn').then(m => ({ default: m.InitialLearn })))
const FinalLearn = lazy(() => import('@/pages/pinyin/FinalLearn').then(m => ({ default: m.FinalLearn })))
const SpellingGame = lazy(() => import('@/pages/pinyin/SpellingGame').then(m => ({ default: m.SpellingGame })))
const PinyinQuiz = lazy(() => import('@/pages/pinyin/PinyinQuiz').then(m => ({ default: m.PinyinQuiz })))

// Math
const MathHome = lazy(() => import('@/pages/math/MathHome').then(m => ({ default: m.MathHome })))
const AddSubGame = lazy(() => import('@/pages/math/AddSubGame').then(m => ({ default: m.AddSubGame })))
const TimedChallenge = lazy(() => import('@/pages/math/TimedChallenge').then(m => ({ default: m.TimedChallenge })))

// Chinese
const ChineseHome = lazy(() => import('@/pages/chinese/ChineseHome').then(m => ({ default: m.ChineseHome })))
const StrokeOrder = lazy(() => import('@/pages/chinese/StrokeOrder').then(m => ({ default: m.StrokeOrder })))
const IdiomStory = lazy(() => import('@/pages/chinese/IdiomStory').then(m => ({ default: m.IdiomStory })))
const PoetryRead = lazy(() => import('@/pages/chinese/PoetryRead').then(m => ({ default: m.PoetryRead })))

// English
const EnglishHome = lazy(() => import('@/pages/english/EnglishHome').then(m => ({ default: m.EnglishHome })))
const AlphabetLearn = lazy(() => import('@/pages/english/AlphabetLearn').then(m => ({ default: m.AlphabetLearn })))
const WordBuilder = lazy(() => import('@/pages/english/WordBuilder').then(m => ({ default: m.WordBuilder })))
const DialogScene = lazy(() => import('@/pages/english/DialogScene').then(m => ({ default: m.DialogScene })))

function Loading() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px', fontSize: '18px', color: '#999' }}>
      <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block', marginRight: '8px' }}>⏳</span>
      加载中...
    </div>
  )
}

export function App() {
  const loadUser = useUserStore(s => s.loadFromDB)
  const loadSettings = useSettingsStore(s => s.loadFromDB)
  const addUsedTime = useSettingsStore(s => s.addUsedTime)
  const [ready, setReady] = useState(false)
  const [audioInited, setAudioInited] = useState(false)
  const usageTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const init = async () => {
      await initDefaultData()
      await loadUser()
      await loadSettings()
      setReady(true)
      // 加载完成后检查基础徽章（首次登录、连续打卡、等级）
      setTimeout(() => {
        import('@/utils/badge-checker').then(({ checkBadges }) => checkBadges())
      }, 500)
    }
    init()
  }, [loadUser, loadSettings])

  // Init audio on first user interaction (required for mobile browsers)
  useEffect(() => {
    const initAudio = () => {
      if (!audioInited) {
        audioManager.unlock()
        audioManager.init()
        comboFeedback.preloadPhrases()
        setAudioInited(true)
      }
    }
    document.addEventListener('click', initAudio, { once: true })
    document.addEventListener('touchstart', initAudio, { once: true })
    return () => {
      document.removeEventListener('click', initAudio)
      document.removeEventListener('touchstart', initAudio)
    }
  }, [audioInited])

  // 使用时长追踪 + 页面可见性管理（防止后台卡顿）
  const startUsageTimer = useCallback(() => {
    if (usageTimerRef.current) return
    usageTimerRef.current = setInterval(() => {
      addUsedTime(10)
    }, 10000) // 每10秒记录一次，提高精度
  }, [addUsedTime])

  const stopUsageTimer = useCallback(() => {
    if (usageTimerRef.current) {
      clearInterval(usageTimerRef.current)
      usageTimerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!ready) return

    startUsageTimer()

    // 页面可见性检测：切到后台时暂停计时和动画，减少资源消耗
    const handleVisibility = () => {
      if (document.hidden) {
        stopUsageTimer()
        try { Howler.ctx?.suspend() } catch (_e) { /* ignore */ }
      } else {
        startUsageTimer()
        try { Howler.ctx?.resume() } catch (_e) { /* ignore */ }
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      stopUsageTimer()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [ready, startUsageTimer, stopUsageTimer])

  if (!ready) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<AppShell />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/challenge" element={<DailyChallengePage />} />
              <Route path="/parent" element={<ParentPage />} />

              {/* 拼音 */}
              <Route path="/pinyin" element={<PinyinHome />} />
              <Route path="/pinyin/initials" element={<InitialLearn />} />
              <Route path="/pinyin/finals" element={<FinalLearn />} />
              {/* TODO: 声调学习页面待实现 */}
              {/* <Route path="/pinyin/tones" element={<ToneLearn />} /> */}
              <Route path="/pinyin/spelling" element={<SpellingGame />} />
              <Route path="/pinyin/quiz" element={<PinyinQuiz />} />

              {/* 数学 */}
              <Route path="/math" element={<MathHome />} />
              <Route path="/math/addsub" element={<AddSubGame />} />
              {/* TODO: 乘除法页面待实现 */}
              {/* <Route path="/math/muldiv" element={<MulDivGame />} /> */}
              <Route path="/math/timed" element={<TimedChallenge />} />

              {/* 语文 */}
              <Route path="/chinese" element={<ChineseHome />} />
              <Route path="/chinese/stroke" element={<StrokeOrder />} />
              <Route path="/chinese/idiom" element={<IdiomStory />} />
              <Route path="/chinese/poetry" element={<PoetryRead />} />
              {/* TODO: 语文测验页面待实现 */}
              {/* <Route path="/chinese/quiz" element={<ChineseQuiz />} /> */}

              {/* 英语 */}
              <Route path="/english" element={<EnglishHome />} />
              <Route path="/english/alphabet" element={<AlphabetLearn />} />
              <Route path="/english/words" element={<WordBuilder />} />
              {/* TODO: 语音学习页面待实现 */}
              {/* <Route path="/english/phonics" element={<PhonicsLearn />} /> */}
              <Route path="/english/dialog" element={<DialogScene />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
