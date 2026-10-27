import { Compass, Search } from 'lucide-react'
import { openPalette } from '../app/palette'
import { Button, ButtonLink } from '../components/ui/Button'
import { IconTile } from '../components/ui/Misc'
import { PageContainer } from './shared'

export default function NotFoundPage() {
  return (
    <PageContainer className="flex min-h-[70vh] max-w-xl flex-col items-center justify-center text-center">
      <IconTile icon={Compass} color="#8B5CF6" size="xl" solid />
      <p className="mt-6 font-mono text-sm text-muted">404</p>
      <h1 className="mt-1 font-display text-h2 font-semibold tracking-tight">This page is off the map</h1>
      <p className="mt-3 text-muted">The link may be old, or the page has not been written yet. Search for what you need, or head back home.</p>
      <div className="mt-8 flex gap-3">
        <Button variant="secondary" icon={Search} onClick={openPalette}>
          Search
        </Button>
        <ButtonLink to="/" variant="primary">
          Go home
        </ButtonLink>
      </div>
    </PageContainer>
  )
}
