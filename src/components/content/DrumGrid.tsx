import { DRUM_LANE_COLORS, DRUM_LANE_FALLBACK, matchColor } from '../../design/tokens'
import { accent, cn } from '../../lib/cn'

const CELL: Record<string, string> = {
  X: 'bg-accent shadow-[0_0_12px_-2px_var(--accent)] ring-1 ring-white/30 ring-inset',
  x: 'bg-accent/70',
  o: 'bg-accent/20 ring-1 ring-accent/60 ring-inset',
  r: 'bg-[repeating-linear-gradient(90deg,var(--accent)_0_2px,transparent_2px_4px)] ring-1 ring-accent/60 ring-inset',
}

const LEGEND: [string, string][] = [
  ['X', 'Accent'],
  ['x', 'Hit'],
  ['o', 'Ghost note'],
  ['r', 'Roll'],
]

/** A step-sequencer view of a drum pattern. Lanes use "X" accent, "x" hit, "o" ghost, "r" roll, "." rest. */
export function DrumGrid({ steps, lanes, swingPercent, className }: { steps: number; lanes: { instrument: string; pattern: string }[]; swingPercent?: number; className?: string }) {
  const stepsPerBeat = steps % 4 === 0 ? (steps >= 16 ? 4 : steps / 4) : steps
  return (
    <figure className={cn('card overflow-hidden', className)}>
      <div className="overflow-x-auto p-4 sm:p-5">
        <div
          className="grid min-w-[34rem] items-center gap-x-1 gap-y-2"
          style={{ gridTemplateColumns: `minmax(5.5rem, 7rem) repeat(${steps}, minmax(0, 1fr))` }}
          role="table"
          aria-label="Drum pattern"
        >
          <div role="columnheader" />
          {Array.from({ length: steps }, (_, i) => (
            <div key={i} role="columnheader" className={cn('text-center font-mono text-[10px]', i % stepsPerBeat === 0 ? 'font-semibold text-fg' : 'text-faint')}>
              {i % stepsPerBeat === 0 ? i / stepsPerBeat + 1 : '·'}
            </div>
          ))}
          {lanes.map((lane) => (
            <Lane key={lane.instrument} {...lane} stepsPerBeat={stepsPerBeat} />
          ))}
        </div>
      </div>
      <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line px-5 py-3 text-xs text-muted" style={accent('#A1A1AA')}>
        {LEGEND.map(([ch, label]) => (
          <span key={ch} className="flex items-center gap-1.5">
            <span className={cn('size-3 rounded-[3px]', CELL[ch])} aria-hidden />
            {label}
          </span>
        ))}
        <span className="font-mono">
          {steps} steps · {steps / stepsPerBeat} beats
        </span>
        {swingPercent && <span className="ml-auto font-mono text-fg/80">Swing {swingPercent}%</span>}
      </figcaption>
    </figure>
  )
}

function Lane({ instrument, pattern, stepsPerBeat }: { instrument: string; pattern: string; stepsPerBeat: number }) {
  const color = matchColor(instrument, DRUM_LANE_COLORS, DRUM_LANE_FALLBACK)
  return (
    <div role="row" className="contents" style={accent(color)}>
      <div role="rowheader" className="flex min-w-0 items-center gap-2 pr-2" style={accent(color)}>
        <span className="size-2 shrink-0 rounded-full bg-accent" aria-hidden />
        <span className="truncate text-[13px] font-medium text-fg">{instrument}</span>
      </div>
      {[...pattern].map((ch, i) => (
        <div
          key={i}
          role="cell"
          aria-label={ch === '.' ? 'rest' : LEGEND.find(([c]) => c === ch)?.[1]}
          style={accent(color)}
          className={cn(
            'aspect-square rounded-[5px] transition-transform hover:scale-110',
            CELL[ch] ?? (Math.floor(i / stepsPerBeat) % 2 === 0 ? 'bg-fg/[0.08]' : 'bg-fg/[0.035]'),
          )}
        />
      ))}
    </div>
  )
}
