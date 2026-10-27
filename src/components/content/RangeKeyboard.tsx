import { useState } from 'react'
import { accent, cn } from '../../lib/cn'
import { formatHz } from '../../lib/labels'

const NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const BLACK = new Set([1, 3, 6, 8, 10])
const WHITE_W = 12
const WHITE_H = 64
const BLACK_W = 7.5
const BLACK_H = 40

const noteName = (midi: number) => `${NAMES[midi % 12]}${Math.floor(midi / 12) - 1}`
const midiToHz = (midi: number) => 440 * 2 ** ((midi - 69) / 12)

/**
 * A piano keyboard (88 keys, widened when needed) with an instrument's playable range lit in
 * the accent color. Middle C (C4, MIDI 60) is marked with a dot.
 */
export function RangeKeyboard({ low, high, color, className }: { low: number; high: number; color: string; className?: string }) {
  const [hover, setHover] = useState<number | null>(null)
  const start = Math.min(21, low - (low % 12))
  const end = Math.max(108, high)

  const whites: number[] = []
  const blacks: { midi: number; x: number }[] = []
  for (let m = start; m <= end; m++) {
    if (BLACK.has(m % 12)) blacks.push({ midi: m, x: whites.length * WHITE_W - BLACK_W / 2 })
    else whites.push(m)
  }
  const width = whites.length * WHITE_W
  const inRange = (m: number) => m >= low && m <= high
  const shown = hover ?? null

  return (
    <figure style={accent(color)} className={cn('select-none', className)}>
      <div className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <RangeEnd label="Lowest" midi={low} />
        <RangeEnd label="Highest" midi={high} />
        <span className="font-mono text-xs text-muted">
          {high - low} semitones · {((high - low) / 12).toFixed(1)} octaves
        </span>
        <span className="ml-auto h-5 font-mono text-xs">
          {shown !== null && (
            <>
              <span className={cn('font-semibold', inRange(shown) ? 'text-accent-ink' : 'text-fg')}>{noteName(shown)}</span>
              <span className="text-muted">
                {' '}
                · MIDI {shown} · {formatHz(midiToHz(shown))}
              </span>
            </>
          )}
        </span>
      </div>
      <div className="overflow-x-auto rounded-xl border border-line bg-bg/60 p-2">
        <svg viewBox={`0 0 ${width} ${WHITE_H + 16}`} className="block w-full min-w-[640px]" role="img" aria-label={`Range ${noteName(low)} to ${noteName(high)}`} onPointerLeave={() => setHover(null)}>
          {whites.map((m, i) => (
            <g key={m} onPointerEnter={() => setHover(m)}>
              <rect
                x={i * WHITE_W + 0.5}
                y={0}
                width={WHITE_W - 1}
                height={WHITE_H}
                rx={2}
                style={{
                  fill: inRange(m)
                    ? `color-mix(in oklab, var(--accent) ${hover === m ? 100 : 78}%, white)`
                    : hover === m
                      ? 'color-mix(in oklab, var(--mk-text) 30%, var(--mk-surface))'
                      : 'color-mix(in oklab, var(--mk-text) 13%, var(--mk-surface))',
                }}
              />
              {m === 60 && <circle cx={i * WHITE_W + WHITE_W / 2} cy={WHITE_H - 7} r={2} className="fill-black/60" />}
              {m % 12 === 0 && (
                <text x={i * WHITE_W + WHITE_W / 2} y={WHITE_H + 12} textAnchor="middle" className="fill-[var(--mk-muted)] font-mono text-[8px]">
                  {noteName(m)}
                </text>
              )}
            </g>
          ))}
          {blacks.map(({ midi, x }) => (
            <rect
              key={midi}
              x={x}
              y={0}
              width={BLACK_W}
              height={BLACK_H}
              rx={1.5}
              onPointerEnter={() => setHover(midi)}
              style={{
                fill: inRange(midi) ? `color-mix(in oklab, var(--accent) ${hover === midi ? 80 : 62}%, black)` : hover === midi ? '#3f3f50' : '#09090f',
                stroke: 'rgb(0 0 0 / 0.6)',
                strokeWidth: 0.5,
              }}
            />
          ))}
        </svg>
      </div>
    </figure>
  )
}

function RangeEnd({ label, midi }: { label: string; midi: number }) {
  return (
    <span className="flex items-baseline gap-2">
      <span className="eyebrow text-muted">{label}</span>
      <span className="font-mono text-base font-semibold text-accent-ink">{noteName(midi)}</span>
      <span className="font-mono text-xs text-muted">MIDI {midi}</span>
    </span>
  )
}
