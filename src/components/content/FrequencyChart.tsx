import { useRef, useState, type PointerEvent } from 'react'
import { FREQUENCY_BANDS, type FrequencyBand } from '../../design/tokens'
import { accent, cn } from '../../lib/cn'
import { formatHz } from '../../lib/labels'

const LOG_MIN = Math.log10(20)
const LOG_MAX = Math.log10(20000)
const TICKS = [20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000]

/** Position of a frequency on a 20 Hz to 20 kHz log axis, as a percentage. */
const freqToPct = (hz: number) => ((Math.log10(Math.min(20000, Math.max(20, hz))) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 100
const pctToFreq = (pct: number) => 10 ** (LOG_MIN + (pct / 100) * (LOG_MAX - LOG_MIN))

export interface FrequencyOverlay {
  label: string
  lo: number
  hi: number
  color?: string
}

/** The colored frequency-spectrum chart, with optional range overlays (an instrument's fundamental, body, and so on). */
export function FrequencyChart({ overlays = [], compact, className }: { overlays?: FrequencyOverlay[]; compact?: boolean; className?: string }) {
  const strip = useRef<HTMLDivElement>(null)
  const [cursor, setCursor] = useState<number | null>(null)
  const [hoverBand, setHoverBand] = useState<FrequencyBand | null>(null)

  const onMove = (e: PointerEvent) => {
    const rect = strip.current?.getBoundingClientRect()
    if (!rect) return
    const pct = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100))
    const hz = pctToFreq(pct)
    setCursor(pct)
    setHoverBand(FREQUENCY_BANDS.find((b) => hz >= b.lo && hz < b.hi) ?? FREQUENCY_BANDS[FREQUENCY_BANDS.length - 1])
  }
  const onLeave = () => {
    setCursor(null)
    setHoverBand(null)
  }

  return (
    <figure className={cn('select-none', className)}>
      <div className="mb-2 flex h-6 items-center justify-between gap-3 text-xs">
        <span className="text-muted">{compact ? 'Frequency spectrum' : 'Frequency spectrum · 20 Hz to 20 kHz (log scale)'}</span>
        {cursor !== null && hoverBand ? (
          <span style={accent(hoverBand.color)} className="flex items-center gap-2 font-mono">
            <span className="size-2 rounded-full bg-accent" />
            <span className="font-semibold text-accent-ink">{hoverBand.name}</span>
            <span className="text-fg">{formatHz(pctToFreq(cursor))}</span>
          </span>
        ) : (
          <span className="hidden text-faint sm:inline">Hover to read frequencies</span>
        )}
      </div>

      <div className="relative" onPointerMove={onMove} onPointerLeave={onLeave}>
        {overlays.length > 0 && (
          <div className="mb-2 space-y-1.5">
            {overlays.map((o) => {
              const left = freqToPct(o.lo)
              const width = Math.max(1.5, freqToPct(o.hi) - left)
              const alignRight = left + width > 72
              return (
                <div key={o.label} className="relative h-9" style={accent(o.color ?? '#E5E7EB')}>
                  <div
                    className={cn('absolute top-0 text-[11px] whitespace-nowrap', alignRight ? 'text-right' : 'text-left')}
                    style={alignRight ? { right: `${100 - left - width}%` } : { left: `${left}%` }}
                  >
                    <span className="font-semibold text-accent-ink">{o.label}</span>{' '}
                    <span className="font-mono text-muted">
                      {formatHz(o.lo)}–{formatHz(o.hi)}
                    </span>
                  </div>
                  <div className="absolute bottom-0 h-3 rounded-full border border-accent/60 bg-accent/35" style={{ left: `${left}%`, width: `${width}%` }} />
                </div>
              )
            })}
          </div>
        )}

        <div ref={strip} className={cn('relative overflow-hidden rounded-xl ring-1 ring-line', compact ? 'h-11' : 'h-16')}>
          {FREQUENCY_BANDS.map((b) => {
            const left = freqToPct(b.lo)
            const width = freqToPct(b.hi) - left
            const dim = hoverBand && hoverBand.id !== b.id
            return (
              <div
                key={b.id}
                style={{ ...accent(b.color), left: `${left}%`, width: `${width}%` }}
                className={cn(
                  'absolute inset-y-0 flex flex-col items-center justify-center border-r border-black/25 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--accent)_92%,white),color-mix(in_oklab,var(--accent)_72%,black))] text-white transition-opacity duration-150 last:border-r-0',
                  dim && 'opacity-45',
                )}
              >
                {width > 9 && <span className="text-[11px] font-semibold tracking-wide drop-shadow-sm sm:text-xs">{b.name}</span>}
                {!compact && width > 12 && (
                  <span className="hidden font-mono text-[10px] text-white/80 sm:block">
                    {formatHz(b.lo)}–{formatHz(b.hi)}
                  </span>
                )}
              </div>
            )
          })}
          {cursor !== null && <div className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_8px_white]" style={{ left: `${cursor}%` }} />}
        </div>

        <div className="relative mt-1.5 h-4 font-mono text-[10px] text-muted">
          {TICKS.map((t, i) => (
            <span
              key={t}
              className={cn('absolute', i === 0 ? '' : i === TICKS.length - 1 ? '-translate-x-full' : '-translate-x-1/2', [50, 200, 2000].includes(t) && 'hidden sm:inline')}
              style={{ left: `${freqToPct(t)}%` }}
            >
              {t >= 1000 ? `${t / 1000}k` : t}
            </span>
          ))}
        </div>
      </div>

      {!compact && (
        <figcaption className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {FREQUENCY_BANDS.map((b) => (
            <div key={b.id} style={accent(b.color)} className={cn('rounded-xl border border-line bg-surface px-3 py-2 transition-colors', hoverBand?.id === b.id && 'border-accent/60 bg-accent/10')}>
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-accent" />
                <span className="text-sm font-semibold text-fg">{b.name}</span>
              </div>
              <div className="mt-0.5 font-mono text-[11px] text-muted">
                {formatHz(b.lo)}–{formatHz(b.hi)}
              </div>
            </div>
          ))}
        </figcaption>
      )}
    </figure>
  )
}
