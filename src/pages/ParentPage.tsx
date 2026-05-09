import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { useSettingsStore } from '@/store/useSettingsStore'

export function ParentPage() {
  const { parentPin, setParentPin, dailyTimeLimit, setDailyTimeLimit, todayUsedTime, soundEnabled, setSound, volume, setVolume } = useSettingsStore()
  const [pinInput, setPinInput] = useState('')
  const [verified, setVerified] = useState(false)
  const [settingPin, setSettingPin] = useState(!parentPin)

  const handleVerify = () => {
    if (pinInput === parentPin) {
      setVerified(true)
    }
  }

  const handleSetPin = () => {
    if (pinInput.length === 4) {
      setParentPin(pinInput)
      setSettingPin(false)
      setVerified(true)
    }
  }

  // 家长验证门
  if (!verified) {
    return (
      <div style={{ maxWidth: '400px', margin: '60px auto', textAlign: 'center' }}>
        <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🔒</span>
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>家长模式</h2>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
          {settingPin ? '请设置4位数字PIN码' : '请输入PIN码验证身份'}
        </p>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{
              width: '48px', height: '48px', borderRadius: '12px',
              border: '2px solid #e0e0e0', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '24px', background: '#fafafa',
            }}>
              {pinInput[i] ? '●' : ''}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', maxWidth: '240px', margin: '0 auto 24px' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'del'].map((num, i) => (
            <button
              key={i}
              onClick={() => {
                if (num === 'del') setPinInput(p => p.slice(0, -1))
                else if (num !== null && pinInput.length < 4) setPinInput(p => p + num)
              }}
              style={{
                padding: '14px',
                borderRadius: '12px',
                border: '1px solid #e0e0e0',
                background: num === null ? 'transparent' : '#fff',
                fontSize: '20px',
                cursor: num === null ? 'default' : 'pointer',
                visibility: num === null ? 'hidden' : 'visible',
              }}
            >
              {num === 'del' ? '←' : num}
            </button>
          ))}
        </div>

        <Button
          variant="primary"
          onClick={settingPin ? handleSetPin : handleVerify}
          disabled={pinInput.length < 4}
        >
          {settingPin ? '设置PIN' : '验证'}
        </Button>
      </div>
    )
  }

  // 家长控制面板
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>👨‍👩‍👧 家长控制面板</h2>

        {/* 今日使用 */}
        <Card color="#fff" style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>今日学习时长</h3>
          <p style={{ fontSize: '32px', fontWeight: 700, color: '#4FC3F7' }}>
            {Math.floor(todayUsedTime / 60)} 分钟
          </p>
          {dailyTimeLimit > 0 && (
            <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
              每日限制: {dailyTimeLimit} 分钟
            </p>
          )}
        </Card>

        {/* 时长控制 */}
        <Card color="#fff" style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>时长控制</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[0, 30, 45, 60, 90, 120].map(mins => (
              <button
                key={mins}
                onClick={() => setDailyTimeLimit(mins)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: dailyTimeLimit === mins ? '2px solid #4FC3F7' : '2px solid #e0e0e0',
                  background: dailyTimeLimit === mins ? '#E3F2FD' : '#fff',
                  fontSize: '14px',
                  cursor: 'pointer',
                  color: dailyTimeLimit === mins ? '#0395d6' : '#666',
                }}
              >
                {mins === 0 ? '不限制' : `${mins}分钟`}
              </button>
            ))}
          </div>
        </Card>

        {/* 音量和音效 */}
        <Card color="#fff" style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>声音设置</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', color: '#666', width: '60px' }}>音效</span>
            <button
              onClick={() => setSound(!soundEnabled)}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                border: 'none',
                background: soundEnabled ? '#E8F5E9' : '#FFEBEE',
                color: soundEnabled ? '#2E7D32' : '#C62828',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              {soundEnabled ? '已开启' : '已关闭'}
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '14px', color: '#666', width: '60px' }}>音量</span>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={e => setVolume(Number(e.target.value))}
              style={{ flex: 1 }}
            />
            <span style={{ fontSize: '14px', color: '#666', width: '40px' }}>{volume}%</span>
          </div>
        </Card>

        {/* 修改PIN */}
        <Card color="#fff">
          <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>安全设置</h3>
          <Button variant="ghost" size="sm" onClick={() => { setVerified(false); setPinInput(''); setSettingPin(true) }}>
            修改PIN码
          </Button>
        </Card>

        {/* 版权信息 */}
        <p style={{ textAlign: 'center', fontSize: '11px', color: '#ccc', marginTop: '32px', lineHeight: 1.8 }}>
          &copy; yingxiang.he | 350168448@qq.com
        </p>
      </motion.div>
    </div>
  )
}
