import type { LucideIcon } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'accent'
type Size = 'sm' | 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-fg text-bg hover:bg-fg/90 shadow-sm',
  secondary: 'border border-line bg-surface text-fg hover:bg-elevated hover:border-faint/60',
  ghost: 'text-muted hover:text-fg hover:bg-fg/[0.06]',
  accent: 'border border-accent/30 bg-accent/12 text-accent-ink hover:bg-accent/20 hover:border-accent/50',
}

const SIZES: Record<Size, string> = {
  sm: 'h-8 gap-1.5 rounded-lg px-2.5 text-[13px]',
  md: 'h-10 gap-2 rounded-xl px-3.5 text-sm',
  lg: 'h-12 gap-2.5 rounded-2xl px-5 text-[15px]',
}

const base =
  'inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

interface CommonProps {
  variant?: Variant
  size?: Size
  icon?: LucideIcon
  iconRight?: LucideIcon
  children?: ReactNode
}

export function Button({ variant = 'secondary', size = 'md', icon: IconLeft, iconRight: IconRight, className, children, ...props }: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={cn(base, VARIANTS[variant], SIZES[size], className)} {...props}>
      {IconLeft && <IconLeft className="size-4" aria-hidden />}
      {children}
      {IconRight && <IconRight className="size-4" aria-hidden />}
    </button>
  )
}

export function ButtonLink({ variant = 'secondary', size = 'md', icon: IconLeft, iconRight: IconRight, className, children, ...props }: CommonProps & LinkProps) {
  return (
    <Link className={cn(base, VARIANTS[variant], SIZES[size], className)} {...props}>
      {IconLeft && <IconLeft className="size-4" aria-hidden />}
      {children}
      {IconRight && <IconRight className="size-4" aria-hidden />}
    </Link>
  )
}

export function IconButton({ label, icon: IconC, className, ...props }: { label: string; icon: LucideIcon } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn('inline-flex size-9 items-center justify-center rounded-xl text-muted transition-colors hover:bg-fg/[0.06] hover:text-fg', className)}
      {...props}
    >
      <IconC className="size-[18px]" aria-hidden />
    </button>
  )
}
