import { ArrowUpRight, Info } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import type { PluginRecs } from '../../content/schema'
import { REC_TIERS, type RecTier } from '../../design/tokens'
import { accent, cn } from '../../lib/cn'
import { pluginHref, pluginsById } from '../../lib/content'
import { DAW_LABELS } from '../../lib/labels'
import { PriceTag } from '../ui/Chip'
import { RichText } from './RichText'

/** Plugin recommendations by tier: Industry, Pro, Budget, Free, and Stock. Empty tiers are hidden. */
export function PluginTierPanel({ recs, className }: { recs: PluginRecs; className?: string }) {
  const tiers = (['industryStandard', 'proAlternatives', 'budget', 'free'] as const).filter((t) => recs[t].length > 0)
  return (
    <div className={cn('space-y-3', className)}>
      <div className="grid gap-3 md:grid-cols-2">
        {tiers.map((tier) => (
          <TierCard key={tier} tier={tier}>
            {recs[tier].map((id) => {
              const p = pluginsById.get(id)
              if (!p) return null
              return (
                <Link key={id} to={pluginHref(id)} className="group -mx-2 flex items-start gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-fg/[0.04]">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="font-semibold text-fg">{p.name}</span>
                      <PriceTag tier={p.priceTier} />
                    </div>
                    <div className="mt-0.5 text-xs text-muted">{p.developer}</div>
                    <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-fg/75">{p.bestFor}</p>
                  </div>
                  <ArrowUpRight className="mt-1 size-4 shrink-0 text-faint transition-colors group-hover:text-fg" aria-hidden />
                </Link>
              )
            })}
          </TierCard>
        ))}
        {recs.stock.length > 0 && (
          <TierCard tier="stock">
            <dl className="divide-y divide-line">
              {recs.stock.map((s) => (
                <div key={s.daw} className="flex items-baseline justify-between gap-3 py-2">
                  <dt className="text-sm text-muted">{DAW_LABELS[s.daw]}</dt>
                  <dd className="text-right text-sm font-semibold text-fg">
                    {s.name}
                    {s.note && <span className="block text-xs font-normal text-muted">{s.note}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </TierCard>
        )}
      </div>
      {recs.notes && (
        <p className="flex gap-2.5 rounded-xl border border-line bg-fg/[0.02] px-4 py-3 text-sm text-fg/80">
          <Info className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden />
          <RichText text={recs.notes} />
        </p>
      )}
    </div>
  )
}

function TierCard({ tier, children }: { tier: RecTier; children: ReactNode }) {
  const t = REC_TIERS[tier]
  return (
    <section style={accent(t.color)} className="card relative overflow-hidden p-4" aria-label={t.label}>
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent to-accent/0" aria-hidden />
      <header className="mb-2 flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent-ink">
          <t.icon className="size-4" aria-hidden />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-fg">{t.label}</h3>
          <p className="text-xs text-muted">{t.blurb}</p>
        </div>
      </header>
      {children}
    </section>
  )
}
