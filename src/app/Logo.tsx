import { Link } from 'react-router'
import { cn } from '../lib/cn'

const BARS = [0.42, 0.75, 1, 0.6, 0.85]

/** The MusiKit mark: five gradient EQ bars that gently bounce on hover. */
export function LogoMark({ className, animate }: { className?: string; animate?: boolean }) {
  return (
    <span className={cn('relative flex size-9 items-center justify-center rounded-xl bg-[#0B0B12] ring-1 ring-white/10', className)} aria-hidden>
      <span className="flex h-[55%] items-end gap-[2.5px]">
        {BARS.map((h, i) => (
          <span
            key={i}
            className={cn(
              'w-[3px] origin-bottom rounded-full bg-[linear-gradient(180deg,#8B5CF6,#F43F5E_55%,#F97316)] [background-size:100%_250%]',
              animate && 'motion-safe:animate-eq',
            )}
            style={{ height: `${h * 100}%`, animationDelay: `${i * -0.23}s`, backgroundPosition: `0 ${(1 - h) * 100}%` }}
          />
        ))}
      </span>
    </span>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn('group flex items-center gap-2.5 rounded-xl', className)} aria-label="MusiKit home">
      <LogoMark className="transition-transform duration-300 group-hover:scale-105" />
      <span className="font-display text-[19px] font-bold tracking-tight text-fg">
        Musi<span className="bg-[linear-gradient(90deg,#8B5CF6,#F43F5E,#F97316)] bg-clip-text text-transparent">Kit</span>
      </span>
    </Link>
  )
}
