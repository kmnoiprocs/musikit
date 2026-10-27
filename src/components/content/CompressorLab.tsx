import { useMemo, useState } from 'react'
import { cn } from '../../lib/cn'
import { DEMO_PRESETS, downwardOutDb, labNote, presetForEffect, renderCompressor, upwardOutDb, type CompressorDemoSettings, type DemoPresetId } from './compressorDemo'
import { EffectDiagram } from './EffectDiagrams'

const W = 560
const H = 168

function wavePath(samples: number[], scale: number): string {
  const mid = H / 2
  return samples
    .map((sample, i) => {
      const x = (i / (samples.length - 1)) * W
      const y = mid - Math.max(-1.15, Math.min(1.15, sample)) * scale
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (value: number) => void
}) {
  return (
    <label className="block min-w-0">
      <span className="flex items-baseline justify-between gap-2 text-xs">
        <span className="font-medium text-fg">{label}</span>
        <span className="font-mono text-[11px] text-accent-ink">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={display}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-fg/15 accent-accent"
      />
    </label>
  )
}

/** An original picture of a compressor: the input wave, the output wave, and the knobs that change it. */
export function CompressorLab({ effectId }: { effectId: string }) {
  const initial = DEMO_PRESETS[presetForEffect(effectId)]
  const [settings, setSettings] = useState<CompressorDemoSettings>({ ...initial, makeup: false })
  const [preset, setPreset] = useState<DemoPresetId | null>(presetForEffect(effectId))
  const frame = useMemo(() => renderCompressor(settings), [settings])
  const scale = H / 2 - 14
  const threshold = 10 ** (settings.thresholdDb / 20)
  const mid = H / 2
  const thresholdY = mid - Math.min(threshold, 1.15) * scale
  const note = labNote(effectId)
  const summary = settings.upward
    ? `Quiet parts are lifted by up to ${frame.maxLiftDb.toFixed(1)} dB.`
    : `The loudest moment is turned down by ${frame.maxReductionDb.toFixed(1)} dB.`

  const apply = (id: DemoPresetId) => {
    setPreset(id)
    setSettings((current) => ({ ...DEMO_PRESETS[id], makeup: current.makeup }))
  }
  const set = (patch: Partial<CompressorDemoSettings>) => {
    setPreset(null)
    setSettings((current) => ({ ...current, ...patch }))
  }

  return (
    <figure className="space-y-3">
      <div className="overflow-hidden rounded-2xl border border-line bg-elevated">
        <div className="flex flex-wrap items-center gap-3 border-b border-line px-3 py-2 text-[11px] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded-full bg-zinc-400" aria-hidden /> Input
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded-full bg-accent" aria-hidden /> Output
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-px w-4 border-t border-dashed border-accent/70" aria-hidden /> Threshold
          </span>
        </div>
        <div className="grid gap-0 lg:grid-cols-[1fr_4.5rem]">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-44 w-full sm:h-52" role="img" aria-label={`Input and output waveforms. ${summary}`}>
            <line x1="0" x2={W} y1={mid} y2={mid} stroke="currentColor" strokeOpacity="0.12" />
            <path d={wavePath(frame.input, scale)} fill="none" stroke="#a1a1aa" strokeWidth="1.35" />
            <path d={wavePath(frame.output, scale)} fill="none" stroke="var(--accent)" strokeWidth="2" />
            <line x1="0" x2={W} y1={thresholdY} y2={thresholdY} stroke="var(--accent)" strokeOpacity="0.7" strokeDasharray="4 4" />
            <line x1="0" x2={W} y1={H - thresholdY} y2={H - thresholdY} stroke="var(--accent)" strokeOpacity="0.35" strokeDasharray="4 4" />
          </svg>
          <GainMeter reduction={frame.maxReductionDb} lift={frame.maxLiftDb} upward={settings.upward} />
        </div>
        <div className="grid items-center gap-4 border-t border-line p-3 sm:grid-cols-[1fr_7.5rem]">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
            <Slider label="Threshold" min={-36} max={-2} step={1} value={settings.thresholdDb} display={`${settings.thresholdDb} dB`} onChange={(thresholdDb) => set({ thresholdDb })} />
            <Slider label="Ratio" min={1} max={12} step={0.5} value={settings.ratio} display={`${settings.ratio.toFixed(1)}:1`} onChange={(ratio) => set({ ratio })} />
            <Slider label="Attack" min={1} max={60} step={1} value={settings.attackMs} display={`${settings.attackMs} ms`} onChange={(attackMs) => set({ attackMs })} />
            <Slider label="Release" min={20} max={400} step={5} value={settings.releaseMs} display={`${settings.releaseMs} ms`} onChange={(releaseMs) => set({ releaseMs })} />
            <Slider label="Knee" min={0} max={18} step={1} value={settings.kneeDb} display={settings.kneeDb === 0 ? 'Hard' : `${settings.kneeDb} dB`} onChange={(kneeDb) => set({ kneeDb })} />
            <label className="flex items-end gap-2 pb-1 text-xs font-medium text-fg">
              <input type="checkbox" checked={settings.makeup} onChange={(e) => set({ makeup: e.target.checked })} className="size-3.5 accent-accent" />
              Makeup
            </label>
          </div>
          <TransferCurve settings={settings} />
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {(Object.keys(DEMO_PRESETS) as DemoPresetId[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => apply(id)}
            aria-pressed={preset === id}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              preset === id ? 'border-accent/50 bg-accent/15 text-accent-ink' : 'border-line bg-surface text-muted hover:text-fg',
            )}
          >
            {DEMO_PRESETS[id].label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => set({ upward: !settings.upward })}
          aria-pressed={settings.upward}
          className={cn(
            'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
            settings.upward ? 'border-accent/50 bg-accent/15 text-accent-ink' : 'border-line bg-surface text-muted hover:text-fg',
          )}
        >
          {settings.upward ? 'Upward' : 'Downward'}
        </button>
      </div>
      <figcaption className="max-w-[68ch] text-[13px] leading-relaxed text-muted">
        The dim line is the sound going in. The colored line is the sound coming out. {summary}{' '}
        {settings.makeup
          ? 'Makeup is on, so the peak is back where it started and the quieter parts sit higher.'
          : 'Makeup is off, so you are seeing only the gain change.'}{' '}
        {note}
      </figcaption>
      <EffectDiagram id={effectId} />
    </figure>
  )
}

function GainMeter({ reduction, lift, upward }: { reduction: number; lift: number; upward: boolean }) {
  const amount = upward ? lift : reduction
  const height = Math.max(6, Math.min(100, amount * 4))
  return (
    <div className="flex items-center justify-center gap-2 border-t border-line px-3 py-3 lg:flex-col lg:border-t-0 lg:border-l lg:py-4" aria-hidden>
      <div className="relative h-28 w-3 overflow-hidden rounded-full bg-fg/10 lg:h-full lg:max-h-40">
        <div className="absolute inset-x-0 bottom-0 rounded-full bg-accent" style={{ height: `${height}%` }} />
      </div>
      <div className="text-center">
        <div className="font-mono text-xs font-semibold text-accent-ink">{amount.toFixed(1)}</div>
        <div className="text-[10px] tracking-wide text-muted uppercase">{upward ? 'Lift' : 'GR'}</div>
      </div>
    </div>
  )
}

function TransferCurve({ settings }: { settings: CompressorDemoSettings }) {
  const size = 120
  const pad = 14
  const toX = (dbValue: number) => pad + ((dbValue + 48) / 48) * (size - pad * 2)
  const toY = (dbValue: number) => size - pad - ((dbValue + 48) / 48) * (size - pad * 2)
  const law = (level: number) =>
    settings.upward
      ? upwardOutDb(level, settings.thresholdDb, settings.ratio, settings.kneeDb)
      : downwardOutDb(level, settings.thresholdDb, settings.ratio, settings.kneeDb)
  const d = Array.from({ length: 25 }, (_, i) => {
    const level = -48 + (i * 48) / 24
    const out = Math.max(-48, Math.min(0, law(level)))
    return `${i === 0 ? 'M' : 'L'}${toX(level).toFixed(1)} ${toY(out).toFixed(1)}`
  }).join(' ')
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto h-24 w-24 shrink-0" role="img" aria-label={settings.upward ? 'Upward compression curve' : 'Downward compression curve'}>
      <line x1={pad} x2={size - pad} y1={size - pad} y2={pad} stroke="currentColor" strokeOpacity="0.18" />
      <path d={d} fill="none" stroke="var(--accent)" strokeWidth="2" />
      <text x={size / 2} y={size - 2} textAnchor="middle" fill="currentColor" opacity="0.55" fontSize="8">
        in
      </text>
      <text x="8" y="10" fill="currentColor" opacity="0.55" fontSize="8">
        out
      </text>
    </svg>
  )
}
