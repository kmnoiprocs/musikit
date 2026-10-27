import { RotateCcw, TriangleAlert } from 'lucide-react'
import { isRouteErrorResponse, useRouteError } from 'react-router'
import { IconTile } from '../components/ui/Misc'
import { CALLOUTS } from '../design/tokens'

/** Shown when a page throws while rendering. It renders without the app shell. */
export default function ErrorPage() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : 'Unknown error'
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <IconTile icon={TriangleAlert} color={CALLOUTS.warning.color} size="xl" solid />
      <h1 className="mt-6 font-display text-h2 font-semibold tracking-tight text-fg">Something went wrong</h1>
      <p className="mt-3 max-w-md text-muted">This page hit an error while loading. Reloading usually fixes it.</p>
      <code className="mt-4 max-w-lg rounded-lg border border-line bg-surface px-3 py-2 font-mono text-xs text-muted">{message}</code>
      <div className="mt-8 flex gap-3">
        <button type="button" onClick={() => window.location.reload()} className="inline-flex h-10 items-center gap-2 rounded-xl bg-fg px-4 text-sm font-medium text-bg">
          <RotateCcw className="size-4" aria-hidden /> Reload
        </button>
        <a href="/" className="inline-flex h-10 items-center rounded-xl border border-line bg-surface px-4 text-sm font-medium text-fg">
          Go home
        </a>
      </div>
    </div>
  )
}
