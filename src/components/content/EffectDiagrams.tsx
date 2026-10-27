import type { ReactNode } from 'react'

export function EffectDiagram({ id }: { id: string }) {
  if (id === 'sidechain-compressor') return <SidechainDiagram />
  if (id === 'multiband-compressor') return <MultibandDiagram />
  if (id === 'pwm-compressor') return <PulseDiagram />
  if (id === 'digital-compressor') return <LookaheadDiagram />
  return null
}

function Frame({ label, caption, children }: { label: string; caption: string; children: ReactNode }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-elevated">
      <svg viewBox="0 0 560 150" className="h-36 w-full" role="img" aria-label={label}>
        {children}
      </svg>
      <figcaption className="border-t border-line px-3 py-2 text-[13px] leading-relaxed text-muted">{caption}</figcaption>
    </figure>
  )
}

function SidechainDiagram() {
  return (
    <Frame
      label="Sidechain routing. The kick feeds the detector. The bass is the audio that gets turned down."
      caption="The kick never comes out of this compressor. It only tells the detector when to duck the bass. Press listen if you need to hear the key, then turn listen off before you bounce."
    >
      <rect x="16" y="18" width="96" height="34" rx="8" fill="none" stroke="currentColor" strokeOpacity="0.55" />
      <text x="64" y="40" textAnchor="middle" fill="currentColor" fontSize="13">
        Kick
      </text>
      <path d="M112 35 H168" stroke="var(--accent)" strokeWidth="1.6" />
      <text x="140" y="26" textAnchor="middle" fill="var(--accent)" fontSize="11">
        key only
      </text>
      <rect x="168" y="16" width="176" height="118" rx="12" fill="none" stroke="currentColor" strokeOpacity="0.55" />
      <text x="256" y="48" textAnchor="middle" fill="currentColor" fontSize="14">
        Detector
      </text>
      <text x="256" y="68" textAnchor="middle" fill="currentColor" opacity="0.55" fontSize="11">
        decides the gain
      </text>
      <rect x="16" y="96" width="96" height="34" rx="8" fill="none" stroke="currentColor" strokeOpacity="0.55" />
      <text x="64" y="118" textAnchor="middle" fill="currentColor" fontSize="13">
        Bass
      </text>
      <path d="M112 113 H168" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" />
      <path d="M344 113 H390" stroke="var(--accent)" strokeWidth="1.6" />
      <rect x="390" y="96" width="150" height="34" rx="8" fill="none" stroke="var(--accent)" />
      <text x="465" y="118" textAnchor="middle" fill="currentColor" fontSize="13">
        Bass out
      </text>
    </Frame>
  )
}

function MultibandDiagram() {
  const bands = [
    { y: 18, label: 'High', note: 'esses, cymbals', cut: 0.35 },
    { y: 58, label: 'Mid', note: 'vocal, snare', cut: 0.1 },
    { y: 98, label: 'Low', note: 'kick, bass', cut: 0.55 },
  ]
  return (
    <Frame
      label="Three bands of one sound, each with its own gain reduction."
      caption="Only the band that got loud has to move. If the low band is doing all the work, the vocal in the mid band can stay put. Solo a band before you trust the crossover."
    >
      {bands.map((band) => (
        <g key={band.label}>
          <text x="16" y={band.y + 18} fill="currentColor" fontSize="12">
            {band.label}
          </text>
          <text x="62" y={band.y + 18} fill="currentColor" opacity="0.5" fontSize="11">
            {band.note}
          </text>
          {Array.from({ length: 28 }, (_, i) => {
            const h = 8 + Math.abs(Math.sin(i * 0.7 + band.y)) * 18
            const pulled = i > 16 ? h * (1 - band.cut) : h
            return <rect key={i} x={168 + i * 13} y={band.y + 22 - pulled} width="7" height={pulled} rx="1.5" fill={i > 16 ? 'var(--accent)' : 'currentColor'} opacity={i > 16 ? 0.95 : 0.35} />
          })}
        </g>
      ))}
    </Frame>
  )
}

function PulseDiagram() {
  return (
    <Frame
      label="Pulse width. A wider pulse passes more of the signal. A narrower pulse passes less."
      caption="The Crane Song STC-8 manual names this gain stage PWM. The musical knobs are still threshold, attack, and release. The pulses are how the level is turned down."
    >
      <text x="20" y="28" fill="currentColor" fontSize="12">
        More level
      </text>
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={20 + i * 42} y="40" width="28" height="22" rx="2" fill="var(--accent)" />
      ))}
      <text x="20" y="92" fill="currentColor" fontSize="12">
        Less level
      </text>
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={20 + i * 42} y="104" width="10" height="22" rx="2" fill="var(--accent)" opacity="0.85" />
      ))}
    </Frame>
  )
}

function LookaheadDiagram() {
  const mid = 78
  const peakX = 250
  return (
    <Frame
      label="Lookahead. The detector sees the peak a few milliseconds early, so the gain can move before the click."
      caption="That head start is a delay. It is useful when you are mixing. Turn it off, or use the DAW's zero-latency mode, while you are recording."
    >
      <path
        d={`M20 ${mid} Q80 ${mid} 120 ${mid + 10} T180 ${mid} Q210 ${mid} ${peakX} 28 T320 ${mid} T540 ${mid}`}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
      <path d={`M${peakX - 70} ${mid} L${peakX} 48`} fill="none" stroke="var(--accent)" strokeWidth="2" />
      <line x1={peakX - 70} x2={peakX} y1="118" y2="118" stroke="var(--accent)" strokeDasharray="3 3" />
      <text x={peakX - 35} y="136" textAnchor="middle" fill="var(--accent)" fontSize="11">
        lookahead
      </text>
      <text x={peakX} y="22" textAnchor="middle" fill="currentColor" fontSize="11">
        peak
      </text>
    </Frame>
  )
}
