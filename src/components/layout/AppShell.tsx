import { Outlet, useLocation } from 'react-router-dom'
import { TopBar } from './TopBar'
import { Sidebar } from './Sidebar'
import { BottomNav } from './BottomNav'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function AppShell() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  const location = useLocation()

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar />
      <div style={{ display: 'flex', flex: 1 }}>
        {!isMobile && <Sidebar />}
        <main
          style={{
            flex: 1,
            padding: isMobile ? '16px 16px 80px' : '24px 32px',
            maxWidth: '1200px',
            width: '100%',
            margin: '0 auto',
            minHeight: 'calc(100vh - var(--topbar-height))',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      {isMobile && <BottomNav />}
    </div>
  )
}
