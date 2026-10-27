import { Clock3 } from 'lucide-react'
import type { Genre } from '../../content/schema'
import { ARRANGEMENT_COLORS, ARRANGEMENT_FALLBACK, MODE_COLORS, matchColor } from '../../design/tokens'
import { accent, cn } from '../../lib/cn'
import { FEEL_LABELS, capitalize, formatSeconds } from '../../lib/labels'
import { Chip } from '../ui/Chip'
import { RichText } from './RichText'

/** "120 BPM" badge with the range and feel. */
export function TempoBadge({ tempo, color }: { tempo: Genre['tempo']; color: string }) {
  return (
    <span style={accent(color)} className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 py-1 pr-3 pl-1">
      <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-xs font-bold text-black/85">{tempo.typical}</span>
      <span className="font-mono text-xs text-accent-ink">
        BPM · {tempo.min}–{tempo.max}
      </span>
      <span className="text-xs text-muted">{FEEL_LABELS[tempo.feel]}</span>
    </span>
  )
}

/** A horizontal scale with a highlighted range and an optional marker. */
function Scale({ min, max, lo, hi, mark, ticks, unit, color, format = String }: { min: number; max: number; lo: number; hi: number; mark?: number; ticks: number[]; unit: string; color: string; format?: (n: number) => string }) {
  const pct = (v: number) => ((v - min) / (max - min)) * 100
  return (
    <div style={accent(color)}>
      <div className="relative h-10">
        <div className="absolute inset-x-0 top-4 h-2 rounded-full bg-fg/[0.07]" />
        <div className="absolute top-4 h-2 rounded-full bg-gradient-to-r from-accent/60 to-accent" style={{ left: `${pct(lo)}%`, width: `${Math.max(1, pct(hi) - pct(lo))}%` }} />
        {mark !== undefined && (
          <div className="absolute top-2 -translate-x-1/2" style={{ left: `${pct(mark)}%` }}>
            <div className="size-6 rounded-full border-[3px] border-bg bg-accent shadow-[0_0_14px_-2px_var(--accent)]" />
          </div>
        )}
      </div>
      <div className="relative h-4 font-mono text-[10px] text-muted">
        {ticks.map((t) => (
          <span key={t} className="absolute -translate-x-1/2" style={{ left: `${pct(t)}%` }}>
            {format(t)}
          </span>
        ))}
      </div>
      <div className="mt-2 font-mono text-sm text-fg">
        <span className="font-semibold text-accent-ink">
          {format(lo)} to {format(hi)} {unit}
        </span>
        {mark !== undefined && (
          <span className="text-muted">
            {' '}
            · typical {format(mark)} {unit}
          </span>
        )}
      </div>
    </div>
  )
}

export function BpmScale({ tempo, color }: { tempo: Genre['tempo']; color: string }) {
  const min = Math.min(60, Math.floor(tempo.min / 20) * 20)
  const max = Math.max(200, Math.ceil(tempo.max / 20) * 20)
  const ticks = Array.from({ length: (max - min) / 20 + 1 }, (_, i) => min + i * 20)
  return <Scale min={min} max={max} lo={tempo.min} hi={tempo.max} mark={tempo.typical} ticks={ticks} unit="BPM" color={color} />
}

export function LufsScale({ range, color }: { range: [number, number]; color: string }) {
  return <Scale min={-24} max={-4} lo={range[0]} hi={range[1]} ticks={[-24, -20, -16, -12, -8, -4]} unit="LUFS integrated" color={color} />
}

const splitChords = (s: string) => s.split(/\s*[-–—]\s*/).filter(Boolean)

export function ProgressionCard({ p }: { p: Genre['progressions'][number] }) {
  const numerals = splitChords(p.numerals)
  const chords = splitChords(p.exampleChords)
  const paired = numerals.length === chords.length
  return (
    <div style={accent(MODE_COLORS[p.mode])} className="card p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Chip color={MODE_COLORS[p.mode]} size="xs" dot>
          {capitalize(p.mode)}
        </Chip>
        <span className="text-xs text-muted">in {p.exampleKey}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {numerals.map((n, i) => (
          <div key={i} className="flex min-w-14 flex-col items-center rounded-xl border border-accent/25 bg-accent/[0.08] px-3 py-2">
            <span className="font-display text-lg font-semibold text-fg">{n}</span>
            {paired && <span className="font-mono text-xs text-accent-ink">{chords[i]}</span>}
          </div>
        ))}
      </div>
      {!paired && <div className="mt-2 font-mono text-xs text-accent-ink">{p.exampleChords}</div>}
      {p.usage && (
        <p className="mt-3 text-sm text-muted">
          <RichText text={p.usage} />
        </p>
      )}
    </div>
  )
}

export function ArrangementTimeline({ arrangement }: { arrangement: Genre['arrangement'] }) {
  const total = arrangement.sections.reduce((n, s) => n + s.bars, 0)
  const [lo, hi] = arrangement.typicalLengthSeconds
  const startBars = arrangement.sections.map((_, i) => 1 + arrangement.sections.slice(0, i).reduce((n, s) => n + s.bars, 0))
  return (
    <figure>
      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-[36rem] gap-1">
          {arrangement.sections.map((s, i) => {
            const color = matchColor(s.name, ARRANGEMENT_COLORS, ARRANGEMENT_FALLBACK)
            return (
              <div key={i} style={{ ...accent(color), flexGrow: s.bars, flexBasis: 0 }} className="group min-w-12">
                <div className="flex h-16 flex-col justify-between rounded-lg border border-accent/40 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--accent)_30%,transparent),color-mix(in_oklab,var(--accent)_12%,transparent))] px-2 py-1.5 transition-colors group-hover:border-accent">
                  <span className="truncate text-xs font-semibold text-fg">{s.name}</span>
                  <span className="font-mono text-[10px] text-accent-ink">{s.bars} bars</span>
                </div>
                <div className="mt-1 font-mono text-[10px] text-faint">{startBars[i]}</div>
              </div>
            )
          })}
        </div>
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
        <span className="font-mono">
          <span className="font-semibold text-fg">{total}</span> bars total
        </span>
        <span className="flex items-center gap-1.5 font-mono">
          <Clock3 className="size-3.5" aria-hidden />
          Typical length {formatSeconds(lo)} to {formatSeconds(hi)}
        </span>
      </figcaption>
    </figure>
  )
}

export function KeyMoments({ moments, color }: { moments: { year: string; event: string }[]; color: string }) {
  return (
    <ol style={accent(color)} className="relative space-y-4 border-l border-accent/30 pl-6">
      {moments.map((m, i) => (
        <li key={i} className="relative">
          <span className="absolute top-1.5 -left-[29px] size-2.5 rounded-full bg-accent ring-4 ring-bg" aria-hidden />
          <span className="font-mono text-sm font-semibold text-accent-ink">{m.year}</span>
          <p className={cn('mt-0.5 text-[15px] text-fg/85')}>
            <RichText text={m.event} />
          </p>
        </li>
      ))}
    </ol>
  )
}
