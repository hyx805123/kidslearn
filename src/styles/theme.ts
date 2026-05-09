export const colors = {
  primary: '#4FC3F7',
  primaryDark: '#0395d6',
  primaryLight: '#b3e5fc',
  secondary: '#FFD54F',
  secondaryDark: '#f9a825',
  secondaryLight: '#fff9c4',
  accent: '#81C784',
  accentDark: '#388E3C',
  accentLight: '#c8e6c9',
  success: '#66BB6A',
  error: '#EF5350',
  warning: '#FFA726',
  info: '#42A5F5',
  bg: '#f0f7ff',
  bgCard: '#ffffff',
  text: '#333333',
  textLight: '#666666',
  textMuted: '#999999',
} as const

export const subjectColors = {
  pinyin: { bg: '#E3F2FD', accent: '#42A5F5', icon: '#1976D2' },
  math: { bg: '#FFF3E0', accent: '#FFA726', icon: '#E65100' },
  chinese: { bg: '#FCE4EC', accent: '#EC407A', icon: '#C2185B' },
  english: { bg: '#E8F5E9', accent: '#66BB6A', icon: '#2E7D32' },
} as const

export const breakpoints = {
  tablet: 768,
  desktop: 1024,
  widescreen: 1440,
} as const
