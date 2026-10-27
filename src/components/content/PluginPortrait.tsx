import { cn } from '../../lib/cn'
import { pluginsById } from '../../lib/content'

type Face = 'curve' | 'needle' | 'bands' | 'buttons' | 'dual' | 'eq' | 'bars' | 'synth'

const FACES: Record<string, { face: Face; knobs: string[]; badge?: string }> = {
  'fabfilter-pro-c': { face: 'curve', knobs: ['Thresh', 'Ratio', 'Attack', 'Release'], badge: 'Style' },
  'fabfilter-pro-q': { face: 'eq', knobs: ['Freq', 'Gain', 'Q'] },
  'cytomic-the-glue': { face: 'needle', knobs: ['Thresh', 'Ratio', 'Attack', 'Release'], badge: 'Auto' },
  'arturia-comp-fet-76': { face: 'buttons', knobs: ['Input', 'Output', 'Attack', 'Release'], badge: '4 8 12 20' },
  'arturia-comp-vca-65': { face: 'needle', knobs: ['Thresh', 'Ratio', 'Attack', 'Release'] },
  'arturia-comp-diode-609': { face: 'dual', knobs: ['Comp', 'Limit', 'Recovery'] },
  'arturia-comp-tube-sta': { face: 'needle', knobs: ['Input', 'Output'], badge: 'Link' },
  'klanghelm-dc1a': { face: 'dual', knobs: ['Input', 'Output'] },
  'klanghelm-dc8c': { face: 'curve', knobs: ['Thresh', 'Ratio', 'Attack', 'Release'], badge: 'Clean' },
  'klanghelm-mjuc': { face: 'needle', knobs: ['Amount', 'Timing'], badge: 'Mk1–3' },
  'klanghelm-mjuc-jr': { face: 'needle', knobs: ['Amount', 'Gain'], badge: 'Fast Slow Auto' },
  'tdr-kotelnikov': { face: 'curve', knobs: ['Peak', 'RMS', 'Ratio'], badge: 'Digital' },
  'tdr-molotok': { face: 'bars', knobs: ['Amount', 'Attack', 'Release'], badge: 'Flavor' },
  'tdr-nova': { face: 'eq', knobs: ['Band', 'Thresh', 'Gain'] },
  'melda-mcompressor': { face: 'curve', knobs: ['Thresh', 'Ratio', 'Shape'] },
  'xfer-ott': { face: 'bands', knobs: ['Depth', 'Time', 'Up', 'Down'] },
  'audio-damage-evil-otto': { face: 'bands', knobs: ['Depth', 'Up', 'Down'] },
  'xfer-serum': { face: 'synth', knobs: ['WT', 'Filter', 'Env'] },
}

/** An original control map. It is not a screenshot of the product. */
export function PluginPortrait({ id, className }: { id: string; className?: string }) {
  const plugin = pluginsById.get(id)
  const spec = FACES[id] ?? { face: 'curve' as const, knobs: ['In', 'Out'] }
  const name = plugin?.name ?? id
  return (
    <svg viewBox="0 0 160 96" className={cn('rounded-lg border border-line bg-[#14141c] text-white', className)} role="img" aria-label={`Illustrated control map of ${name}. Not a product screenshot.`}>
      <rect x="0" y="0" width="160" height="18" fill="#0c0c12" />
      <text x="8" y="12" fill="#d4d4d8" fontSize="8" fontFamily="ui-sans-serif, system-ui">
        {name}
      </text>
      {spec.badge && (
        <text x="152" y="12" textAnchor="end" fill="#a5b4fc" fontSize="7" fontFamily="ui-sans-serif, system-ui">
          {spec.badge}
        </text>
      )}
      <Screen face={spec.face} />
      {spec.knobs.map((knob, i) => (
        <g key={knob} transform={`translate(${10 + i * 36} 74)`}>
          <circle cx="8" cy="6" r="5" fill="none" stroke="#e4e4e7" strokeWidth="1" />
          <line x1="8" y1="6" x2="11" y2="3" stroke="#a5b4fc" strokeWidth="1" />
          <text x="8" y="18" textAnchor="middle" fill="#a1a1aa" fontSize="6" fontFamily="ui-sans-serif, system-ui">
            {knob}
          </text>
        </g>
      ))}
    </svg>
  )
}

function Screen({ face }: { face: Face }) {
  if (face === 'needle') {
    return (
      <g>
        <path d="M30 62 A40 40 0 0 1 110 62" fill="none" stroke="#3f3f46" />
        <line x1="70" y1="62" x2="96" y2="40" stroke="#a5b4fc" strokeWidth="1.4" />
        <circle cx="70" cy="62" r="2" fill="#e4e4e7" />
      </g>
    )
  }
  if (face === 'bands' || face === 'bars') {
    return (
      <g>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={28 + i * 28} y={28 + i * 4} width="18" height={32 - i * 6} rx="2" fill={i === 1 ? '#a5b4fc' : '#3f3f46'} />
        ))}
      </g>
    )
  }
  if (face === 'buttons') {
    return (
      <g>
        {['4', '8', '12', '20'].map((label, i) => (
          <g key={label} transform={`translate(${24 + i * 22} 30)`}>
            <rect width="16" height="16" rx="2" fill={i === 0 ? '#a5b4fc' : '#27272a'} />
            <text x="8" y="11" textAnchor="middle" fill={i === 0 ? '#1e1b4b' : '#e4e4e7'} fontSize="7">
              {label}
            </text>
          </g>
        ))}
      </g>
    )
  }
  if (face === 'dual') {
    return (
      <g>
        <rect x="22" y="26" width="52" height="36" rx="4" fill="none" stroke="#52525b" />
        <rect x="84" y="26" width="52" height="36" rx="4" fill="none" stroke="#a5b4fc" />
        <text x="48" y="47" textAnchor="middle" fill="#a1a1aa" fontSize="8">
          A
        </text>
        <text x="110" y="47" textAnchor="middle" fill="#c7d2fe" fontSize="8">
          B
        </text>
      </g>
    )
  }
  if (face === 'eq') {
    return (
      <g>
        <path d="M18 52 C40 52 48 30 70 34 C92 38 100 58 128 48" fill="none" stroke="#a5b4fc" strokeWidth="1.6" />
        {[48, 78, 108].map((x) => (
          <circle key={x} cx={x} cy={x === 78 ? 32 : 48} r="3" fill="#e4e4e7" />
        ))}
      </g>
    )
  }
  if (face === 'synth') {
    return (
      <g>
        {Array.from({ length: 16 }, (_, i) => (
          <rect key={i} x={20 + i * 7} y={58 - (8 + Math.abs(Math.sin(i)) * 22)} width="4" height={8 + Math.abs(Math.sin(i)) * 22} fill={i % 4 === 0 ? '#a5b4fc' : '#3f3f46'} />
        ))}
      </g>
    )
  }
  const d = 'M18 58 C40 58 52 28 74 30 C96 32 104 54 142 40'
  return <path d={d} fill="none" stroke="#a5b4fc" strokeWidth="1.7" />
}
