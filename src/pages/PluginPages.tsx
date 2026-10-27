import { ExternalLink, Info, Layers, Plug, Repeat, SearchX, Sparkles } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { EntryCard, StaggerGrid, StaggerItem } from '../components/content/Cards'
import { RefChips } from '../components/content/Refs'
import { BookmarkButton } from '../components/layout/PageActions'
import { PageHeader } from '../components/layout/PageHeader'
import { ButtonLink } from '../components/ui/Button'
import { Chip, PriceTag } from '../components/ui/Chip'
import type { Plugin, PriceTier } from '../content/schema'
import { PLUGIN_CATEGORIES } from '../content/schema'
import { PRICE_TIERS, REC_TIERS } from '../design/tokens'
import { accent } from '../lib/cn'
import { COLORS, library, pluginHref, pluginMentionsFor, pluginsById } from '../lib/content'
import { LICENSING_LABELS, OS_LABELS, PLUGIN_CATEGORY_LABELS, plural } from '../lib/labels'
import { useRecordVisit } from '../lib/prefs'
import NotFoundPage from './NotFoundPage'
import { FilterChip, PageContainer, PageSection, SearchField } from './shared'

const C = COLORS.plugins
const TIER_ORDER: PriceTier[] = ['free', 'budget', 'mid', 'premium', 'subscription']

function PluginCard({ p }: { p: Plugin }) {
  return (
    <EntryCard
      href={pluginHref(p.id)}
      title={p.name}
      eyebrow={p.developer}
      summary={p.bestFor}
      color={PRICE_TIERS[p.priceTier].color}
      icon="plug"
      footer={
        <>
          <PriceTag tier={p.priceTier} price={p.approxPriceUsd} />
          {p.categories.slice(0, 2).map((c) => (
            <Chip key={c} size="xs">
              {PLUGIN_CATEGORY_LABELS[c]}
            </Chip>
          ))}
        </>
      }
    />
  )
}

export function PluginsIndex() {
  const [query, setQuery] = useState('')
  const [tiers, setTiers] = useState<Set<PriceTier>>(new Set())
  const [category, setCategory] = useState<string | undefined>()
  const [os, setOs] = useState<string | undefined>()
  const q = query.trim().toLowerCase()
  const usedCategories = PLUGIN_CATEGORIES.filter((c) => library.plugins.some((p) => p.categories.includes(c)))
  const shown = library.plugins
    .filter((p) => tiers.size === 0 || tiers.has(p.priceTier))
    .filter((p) => !category || p.categories.includes(category as Plugin['categories'][number]))
    .filter((p) => !os || p.os.includes(os as Plugin['os'][number]))
    .filter((p) => !q || `${p.name} ${p.developer} ${p.bestFor} ${p.emulates ?? ''}`.toLowerCase().includes(q))
    .sort((a, b) => a.name.localeCompare(b.name))

  const toggleTier = (t: PriceTier) =>
    setTiers((prev) => {
      const next = new Set(prev)
      if (next.has(t)) next.delete(t)
      else next.add(t)
      return next
    })

  return (
    <PageContainer color={C}>
      <PageHeader
        eyebrow="Encyclopedia · Registry"
        title="Plugin Registry"
        color={C}
        icon={Plug}
        summary="Every plugin MusiKit recommends, in one place. Entries recommend plugins in five tiers, and the free and budget tiers always match the prices listed here."
        meta={Object.values(REC_TIERS).map((t) => (
          <Chip key={t.label} color={t.color} icon={t.icon}>
            {t.label}
          </Chip>
        ))}
      />
      <div className="sticky top-14 z-20 -mx-4 space-y-3 border-b border-line bg-bg/85 px-4 py-3 backdrop-blur-xl sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <SearchField value={query} onChange={setQuery} placeholder="Search plugins, developers, or hardware…" className="w-full sm:w-80" />
          <div className="flex flex-wrap gap-1.5">
            {TIER_ORDER.map((t) => (
              <FilterChip key={t} active={tiers.has(t)} color={PRICE_TIERS[t].color} onClick={() => toggleTier(t)}>
                {PRICE_TIERS[t].label}
              </FilterChip>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <FilterChip active={!category} onClick={() => setCategory(undefined)}>
            All categories
          </FilterChip>
          {usedCategories.map((c) => (
            <FilterChip key={c} active={category === c} onClick={() => setCategory(category === c ? undefined : c)}>
              {PLUGIN_CATEGORY_LABELS[c]}
            </FilterChip>
          ))}
          <span className="mx-1 w-px self-stretch bg-line" aria-hidden />
          {Object.entries(OS_LABELS).map(([id, label]) => (
            <FilterChip key={id} active={os === id} onClick={() => setOs(os === id ? undefined : id)}>
              {label}
            </FilterChip>
          ))}
        </div>
      </div>
      <div className="mt-6">
        {shown.length === 0 ? (
          <p className="flex items-center gap-2 py-12 text-sm text-muted">
            <SearchX className="size-4" aria-hidden /> No plugins match these filters.
          </p>
        ) : (
          <StaggerGrid key={`${q}|${[...tiers].join()}|${category}|${os}`} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {shown.map((p) => (
              <StaggerItem key={p.id}>
                <PluginCard p={p} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
        <p className="mt-4 text-xs text-faint">
          Showing {plural(shown.length, 'plugin')} of {library.plugins.length}
        </p>
      </div>
    </PageContainer>
  )
}

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[8.5rem_1fr] gap-4 px-4 py-3">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-sm text-fg">{children}</dd>
    </div>
  )
}

export function PluginPage() {
  const { id = '' } = useParams()
  const plugin = pluginsById.get(id)
  const saved = plugin && { href: pluginHref(plugin.id), title: plugin.name, kind: `Plugin · ${plugin.developer}`, color: C }
  useRecordVisit(saved)
  if (!plugin || !saved) return <NotFoundPage />
  const tier = PRICE_TIERS[plugin.priceTier]
  const mentions = pluginMentionsFor(plugin.id)
  const alternatives = plugin.alternatives.map((a) => pluginsById.get(a)).filter((p): p is Plugin => !!p)

  return (
    <PageContainer color={tier.color} className="max-w-[64rem]">
      <PageHeader
        eyebrow={<Link to="/plugins" className="hover:underline">Plugin · {plugin.developer}</Link>}
        title={plugin.name}
        summary={plugin.bestFor}
        color={tier.color}
        icon={Plug}
        meta={
          <>
            <PriceTag tier={plugin.priceTier} price={plugin.approxPriceUsd} size="sm" />
            {plugin.version && <Chip>Version {plugin.version}</Chip>}
            {plugin.emulates && <Chip icon={Sparkles}>Models {plugin.emulates}</Chip>}
          </>
        }
        actions={
          <>
            <ButtonLink to={plugin.url} target="_blank" rel="noreferrer" variant="secondary" icon={ExternalLink} className="hidden sm:inline-flex">
              Website
            </ButtonLink>
            <BookmarkButton page={saved} />
          </>
        }
      />
      <PageSection id="details" title="Details" icon={Info} color={tier.color}>
        <dl className="card divide-y divide-line">
          <Detail label="Developer">{plugin.developer}</Detail>
          <Detail label="Price">
            <span className="flex flex-wrap items-center gap-2">
              <PriceTag tier={plugin.priceTier} />
              {plugin.approxPriceUsd && <span className="font-mono">about ${plugin.approxPriceUsd}</span>}
            </span>
          </Detail>
          <Detail label="License">{LICENSING_LABELS[plugin.licensing]}</Detail>
          <Detail label="Categories">
            <span className="flex flex-wrap gap-1.5">
              {plugin.categories.map((c) => (
                <Chip key={c} size="xs">
                  {PLUGIN_CATEGORY_LABELS[c]}
                </Chip>
              ))}
            </span>
          </Detail>
          <Detail label="Formats">
            <span className="font-mono text-[13px]">{plugin.formats.join(' · ')}</span>
          </Detail>
          <Detail label="Platforms">{plugin.os.map((o) => OS_LABELS[o]).join(', ')}</Detail>
          <Detail label="Website">
            <a href={plugin.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 break-all text-accent-ink underline decoration-accent/40 underline-offset-2">
              {plugin.url.replace(/^https?:\/\//, '')} <ExternalLink className="size-3" aria-hidden />
            </a>
          </Detail>
          <Detail label="Last verified">
            <span className="font-mono text-[13px]">{plugin.lastVerified}</span>
          </Detail>
        </dl>
        {plugin.notes && (
          <p className="mt-3 flex gap-2.5 rounded-xl border border-line bg-fg/[0.02] px-4 py-3 text-sm text-fg/80">
            <Info className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden />
            {plugin.notes}
          </p>
        )}
      </PageSection>
      <PageSection id="recommended-in" title="Recommended In" icon={Layers} color={tier.color} description="Entries that recommend this plugin, and in which tier.">
        {mentions.length > 0 ? (
          <div className="space-y-2">
            {mentions.map((m) => (
              <div key={`${m.source.ref}-${m.tier}`} className="flex items-center gap-3">
                <span style={accent(REC_TIERS[m.tier].color)} className="w-36 shrink-0">
                  <Chip color={REC_TIERS[m.tier].color} icon={REC_TIERS[m.tier].icon} size="xs">
                    {REC_TIERS[m.tier].label}
                  </Chip>
                </span>
                <RefChips refs={[m.source]} className="flex-1 sm:grid-cols-1" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">No entry recommends this plugin yet.</p>
        )}
      </PageSection>
      {alternatives.length > 0 && (
        <PageSection id="alternatives" title="Alternatives" icon={Repeat} color={tier.color}>
          <div className="grid gap-4 sm:grid-cols-2">
            {alternatives.map((p) => (
              <PluginCard key={p.id} p={p} />
            ))}
          </div>
        </PageSection>
      )}
    </PageContainer>
  )
}
