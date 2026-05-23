import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.kidslearn.app',
  appName: 'KidsLearn',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  android: {
    allowMixedContent: false,
    backgroundColor: '#F5F7FA',
    webContentsDebuggingEnabled: false,
  },
  plugins: {},
}

export default config
