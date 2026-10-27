import { LazyMotion, MotionConfig, domMax, m } from 'motion/react'
import { Tooltip } from 'radix-ui'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { CALLOUTS } from '../design/tokens'
import { accent } from '../lib/cn'
import { contentResult } from '../lib/content'
import { CommandPalette } from './CommandPalette'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

function ContentErrorBanner() {
  if (!import.meta.env.DEV || contentResult.errors.length === 0) return null
  return (
    <div style={accent(CALLOUTS.mistake.color)} className="border-b border-accent/30 bg-accent/10 px-5 py-2 text-sm text-accent-ink">
      Content has {contentResult.errors.length} validation error(s). Run <code className="font-mono">npm run validate:content</code> for details.
    </div>
  )
}

export function AppShell() {
  const { pathname } = useLocation()
  return (
    <Tooltip.Provider delayDuration={150}>
      <LazyMotion features={domMax} strict>
        <MotionConfig reducedMotion="user">
          <a
            href="#main"
            className="sr-only z-[60] rounded-xl bg-fg px-4 py-2 text-sm font-semibold text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <div className="flex min-h-dvh">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">
              <TopBar />
              <ContentErrorBanner />
              <main id="main" tabIndex={-1} className="flex-1 overflow-x-clip outline-none">
                <m.div key={pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}>
                  <Outlet />
                </m.div>
              </main>
              <footer className="border-t border-line px-5 py-6 text-center text-xs text-faint sm:px-8">
                MusiKit · The music production guide and cheat sheet · Works offline once installed
              </footer>
            </div>
          </div>
          <CommandPalette />
          <ScrollRestoration getKey={(location) => (location.key === 'default' ? location.pathname : location.key)} />
        </MotionConfig>
      </LazyMotion>
    </Tooltip.Provider>
  )
}
