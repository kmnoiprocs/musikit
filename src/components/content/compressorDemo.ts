/** A drawn phrase the compressor lab can react to. One sample stands for one millisecond. */

export type CompressorDemoSettings = {
  thresholdDb: number
  ratio: number
  attackMs: number
  releaseMs: number
  kneeDb: number
  upward: boolean
  makeup: boolean
}

export type CompressorDemoFrame = {
  input: number[]
  output: number[]
  /** Gain applied to each sample, in dB, before makeup. Negative means turned down. */
  gainDb: number[]
  maxReductionDb: number
  maxLiftDb: number
}

export type DemoPresetId = 'level' | 'punch' | 'fast' | 'glue' | 'upward'

export const DEMO_PRESETS: Record<DemoPresetId, { label: string } & Omit<CompressorDemoSettings, 'makeup'>> = {
  level: { label: 'Level a phrase', thresholdDb: -18, ratio: 4, attackMs: 12, releaseMs: 120, kneeDb: 6, upward: false },
  punch: { label: 'Keep the hit', thresholdDb: -16, ratio: 4, attackMs: 25, releaseMs: 140, kneeDb: 4, upward: false },
  fast: { label: 'Catch the peak', thresholdDb: -14, ratio: 8, attackMs: 1, releaseMs: 80, kneeDb: 0, upward: false },
  glue: { label: 'Bus glue', thresholdDb: -20, ratio: 2, attackMs: 20, releaseMs: 180, kneeDb: 8, upward: false },
  upward: { label: 'Lift the quiet', thresholdDb: -16, ratio: 4, attackMs: 8, releaseMs: 140, kneeDb: 6, upward: true },
}

const PHRASES = [
  { start: 36, sustain: 130, peak: 1 },
  { start: 230, sustain: 100, peak: 0.82 },
  { start: 400, sustain: 80, peak: 0.4 },
]

export function demoInput(n = 560): number[] {
  const x: number[] = []
  for (let i = 0; i < n; i++) {
    let s = 0.055 * Math.sin(i / 13)
    for (const p of PHRASES) {
      const dt = i - p.start
      if (dt < 0 || dt > p.sustain + 90) continue
      const env = dt < 10 ? p.peak : dt < p.sustain ? p.peak * 0.58 : p.peak * 0.58 * Math.exp(-(dt - p.sustain) / 36)
      s += env * Math.sin(dt * 0.62)
    }
    x.push(Math.max(-1.15, Math.min(1.15, s)))
  }
  return x
}

const INPUT = demoInput()

function db(linear: number): number {
  return 20 * Math.log10(Math.max(Math.abs(linear), 1e-5))
}

function linear(dbValue: number): number {
  return 10 ** (dbValue / 20)
}

/** Static downward law, in dB. Soft knee uses the usual quadratic join. */
export function downwardOutDb(levelDb: number, thresholdDb: number, ratio: number, kneeDb: number): number {
  const slope = 1 / Math.max(1, ratio)
  if (kneeDb <= 0) {
    if (levelDb <= thresholdDb) return levelDb
    return thresholdDb + (levelDb - thresholdDb) * slope
  }
  const half = kneeDb / 2
  if (levelDb <= thresholdDb - half) return levelDb
  if (levelDb >= thresholdDb + half) return thresholdDb + (levelDb - thresholdDb) * slope
  const x = levelDb - thresholdDb + half
  return levelDb + (slope - 1) * ((x * x) / (2 * kneeDb))
}

/** Static upward law: levels under the threshold are lifted toward it. */
export function upwardOutDb(levelDb: number, thresholdDb: number, ratio: number, kneeDb: number): number {
  const slope = 1 / Math.max(1, ratio)
  if (kneeDb <= 0) {
    if (levelDb >= thresholdDb) return levelDb
    return thresholdDb - (thresholdDb - levelDb) * slope
  }
  const half = kneeDb / 2
  if (levelDb >= thresholdDb + half) return levelDb
  if (levelDb <= thresholdDb - half) return thresholdDb - (thresholdDb - levelDb) * slope
  const x = thresholdDb + half - levelDb
  return levelDb + (1 - slope) * ((x * x) / (2 * kneeDb))
}

export function renderCompressor(settings: CompressorDemoSettings, input: number[] = INPUT): CompressorDemoFrame {
  const attack = 1 - Math.exp(-1 / Math.max(0.4, settings.attackMs))
  const release = 1 - Math.exp(-1 / Math.max(1, settings.releaseMs))
  let env = Math.max(Math.abs(input[0] ?? 0), 1e-3)
  const gainDb: number[] = []
  for (const sample of input) {
    const level = Math.max(Math.abs(sample), 1e-3)
    env += (level - env) * (level > env ? attack : release)
    const levelDb = Math.max(-48, db(env))
    const outDb = settings.upward
      ? upwardOutDb(levelDb, settings.thresholdDb, settings.ratio, settings.kneeDb)
      : downwardOutDb(levelDb, settings.thresholdDb, settings.ratio, settings.kneeDb)
    gainDb.push(outDb - levelDb)
  }
  let output = input.map((sample, i) => sample * linear(gainDb[i]!))
  if (settings.makeup) {
    const peakIn = Math.max(...input.map(Math.abs), 1e-6)
    const peakOut = Math.max(...output.map(Math.abs), 1e-6)
    const match = peakIn / peakOut
    output = output.map((sample) => Math.max(-1.15, Math.min(1.15, sample * match)))
  }
  const heard = (dir: 'down' | 'up') => {
    let best = 0
    for (let i = 0; i < gainDb.length; i++) {
      if (Math.abs(input[i] ?? 0) < 0.04) continue
      const gain = gainDb[i] ?? 0
      best = Math.max(best, dir === 'down' ? -gain : gain)
    }
    return best
  }
  return {
    input,
    output,
    gainDb,
    maxReductionDb: heard('down'),
    maxLiftDb: heard('up'),
  }
}

export function presetForEffect(id: string): DemoPresetId {
  if (id === 'fet-compressor' || id === 'sidechain-compressor' || id === 'diode-bridge-compressor') return 'fast'
  if (id === 'bus-compressor' || id === 'vca-compressor') return 'glue'
  if (id === 'upward-compressor') return 'upward'
  if (id === 'optical-compressor' || id === 'tube-compressor' || id === 'vintage-compressor') return 'level'
  return 'punch'
}

export function labNote(id: string): string | undefined {
  switch (id) {
    case 'fet-compressor':
      return 'A real 1176 attack knob runs in microseconds and turns backwards (clockwise is faster). This picture uses a normal millisecond knob so the transient is easy to see. Fast is the left end.'
    case 'optical-compressor':
      return 'An optical cell does not have one release time. The slow release here is the idea: after a loud note, the gain comes back gradually.'
    case 'bus-compressor':
      return 'Glue is a slow attack and a low ratio. The spike of the hit stays tall. The body of the phrase comes down a little.'
    case 'upward-compressor':
      return 'Upward leaves the peaks alone and lifts what is under the line. Makeup after ordinary compression is the other button: it lifts the peaks too.'
    case 'sidechain-compressor':
      return 'A sidechain compressor uses this same gain move. The difference is which sound the detector listens to. The routing picture is under the graph.'
    case 'multiband-compressor':
      return 'This graph is one band. A multiband compressor runs a separate copy on the low end, the mids, and the top. The split is drawn underneath.'
    case 'digital-compressor':
      return 'Lookahead lets the gain move just before the peak arrives, instead of after the click has already passed. The picture under the graph shows that head start.'
    case 'pwm-compressor':
      return 'Pulse width is a different way to build the gain, not a different set of musical knobs. Wide pulses pass more level. Narrow pulses pass less.'
    default:
      return undefined
  }
}
