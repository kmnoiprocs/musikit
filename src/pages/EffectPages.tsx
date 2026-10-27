import { Check, CircleX, Cpu, Disc3, FlaskConical, Gauge, GitBranch, Layers, Link2, ShieldQuestion, SlidersHorizontal, Sparkles, Target, Wrench, X, Zap } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { StaggerGrid, StaggerItem } from '../components/content/Cards'
import { GroupTile } from '../components/content/Cards'
import { Callout } from '../components/content/Callout'
import { CheatSheetCard } from '../components/content/CheatSheetCard'
import { Paragraph } from '../components/content/Blocks'
import { PluginTierPanel } from '../components/content/PluginTierPanel'
import { RefChips } from '../components/content/Refs'
import { RichText } from '../components/content/RichText'
import { SettingsTable } from '../components/content/Tables'
import { DetailLayout } from '../components/layout/DetailLayout'
import { BookmarkButton } from '../components/layout/PageActions'
import { PageHeader } from '../components/layout/PageHeader'
import { Chip } from '../components/ui/Chip'
import { Expandable } from '../components/ui/Expandable'
import { Tabs } from '../components/ui/Tabs'
import type { Effect, Technique } from '../content/schema'
import { CALLOUTS } from '../design/tokens'
import { accent, cn } from '../lib/cn'
import { COLORS, effectCategories, effectCategoryById, effectsById, library, refForEffect, resolveRefs, sectionByNumber } from '../lib/content'
import { plural } from '../lib/labels'
import { useRecordVisit } from '../lib/prefs'
import { commonSections, entryMeta } from './entryParts'
import NotFoundPage from './NotFoundPage'
import { EntryGrid, GroupPage, PageContainer, PageSection, type CardItem } from './shared'

const C = COLORS.effects

const TYPE_GROUPS = ['Circuit', 'Job', 'Style']

function effectKindLabel(e: Effect): string {
  if (e.kind === 'unit') return 'Hardware unit'
  if (e.kind === 'group') return 'Effect group'
  if (e.parent) return 'Type'
  return 'Effect type'
}

function compareEffects(a: Effect, b: Effect): number {
  const rank = (e: Effect) => (e.kind === 'group' ? -1 : (e.typeOrder ?? 1000))
  const delta = rank(a) - rank(b)
  if (delta !== 0) return delta
  const group = TYPE_GROUPS.indexOf(a.typeGroup ?? '') - TYPE_GROUPS.indexOf(b.typeGroup ?? '')
  if (a.typeGroup !== b.typeGroup && group !== 0) return group
  return a.name.localeCompare(b.name)
}

const effectCard = (e: Effect, group?: string): CardItem => {
  const cat = effectCategoryById.get(e.category)
  const parent = e.parent ? effectsById.get(e.parent) : undefined
  const childCount = library.effects.filter((child) => child.parent === e.id).length
  return {
    key: e.id,
    href: `/effects/${e.id}`,
    title: e.name,
    eyebrow: parent?.name ?? cat?.name,
    summary: e.summary,
    color: C,
    icon: cat?.icon ?? 'zap',
    group: group ?? e.category,
    searchText: [e.aliases.join(' '), e.typeGroup ?? '', parent?.name ?? ''].filter(Boolean).join(' '),
    footer: (
      <>
        <Chip size="xs">{effectKindLabel(e)}</Chip>
        {e.typeGroup && <Chip size="xs">{e.typeGroup}</Chip>}
        {childCount > 0 && <Chip size="xs">{plural(childCount, 'type')}</Chip>}
      </>
    ),
  }
}

export function EffectsIndex() {
  return (
    <PageContainer color={C}>
      <PageHeader
        eyebrow="Encyclopedia · Part 18"
        title="Effects"
        color={C}
        icon={Zap}
        summary="Every analog and digital effect, from compressors to granular freezers. Each entry explains the controls, gives starting settings per source, and recommends plugins at every price."
      />
      <PageSection id="categories" title="Categories" icon={Sparkles} color={C}>
        <StaggerGrid className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {effectCategories.map((c) => (
            <StaggerItem key={c.id}>
              <GroupTile href={c.href} title={c.name} number={c.section} color={C} icon={c.icon} count={c.entries.length} noun={['entry', 'entries']} planned={c.outline?.topics.length} />
            </StaggerItem>
          ))}
        </StaggerGrid>
        {sectionByNumber.get('18.13') && (
          <Link to="/guide/18.13" className="card mt-3 flex items-center gap-3 px-4 py-3 text-sm text-muted transition-colors hover:text-fg">
            <Link2 className="size-4 text-accent-ink" aria-hidden />
            <span className="font-mono text-xs">18.13</span>
            <span>Chain-order theory: why the order of your effects matters</span>
          </Link>
        )}
      </PageSection>
      <PageSection id="all" title="All effects" icon={Zap} color={C}>
        <EntryGrid
          items={[...library.effects].sort(compareEffects).map((e) => effectCard(e))}
          noun={['effect', 'effects']}
          groups={effectCategories.map((c) => ({ id: c.id, label: c.name }))}
          emptyIcon={Zap}
          emptyTitle="No effects yet"
          emptyText="Effect entries arrive in the content batches."
          color={C}
        />
      </PageSection>
    </PageContainer>
  )
}

export function EffectCategoryPage() {
  const { categoryId = '' } = useParams()
  const i = effectCategories.findIndex((c) => c.id === categoryId)
  const cat = effectCategories[i]
  if (!cat) return <NotFoundPage />
  const prev = effectCategories[i - 1]
  const next = effectCategories[i + 1]
  return (
    <GroupPage
      key={cat.id}
      title={cat.name}
      eyebrow={<Link to="/effects" className="hover:underline">Effects · {cat.section}</Link>}
      color={C}
      icon={cat.icon}
      outline={cat.outline}
      items={[...cat.entries].sort(compareEffects).map((e) => effectCard(e))}
      noun={['effect', 'effects']}
      emptyText={`The ${cat.name.toLowerCase()} entries are planned. The coverage below shows what is coming.`}
      prev={prev && { href: prev.href, title: prev.name, color: C }}
      next={next && { href: next.href, title: next.name, color: C }}
      label="category"
    />
  )
}

function TechniqueBlock({ t, color }: { t: Technique; color: string }) {
  return (
    <div style={accent(color)} className="card p-5">
      <h3 className="font-display text-[17px] font-semibold tracking-tight text-fg">{t.name}</h3>
      <p className="mt-1.5 text-[15px] leading-relaxed text-fg/80">
        <RichText text={t.description} />
      </p>
      {t.steps.length > 0 && (
        <ol className="mt-3 space-y-1.5">
          {t.steps.map((s, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-fg/85">
              <span className="font-mono text-xs font-semibold text-accent-ink">{i + 1}.</span>
              <RichText text={s} />
            </li>
          ))}
        </ol>
      )}
      {t.settings.length > 0 && <SettingsTable rows={t.settings} className="mt-4" />}
    </div>
  )
}

export function EffectPage() {
  const { id = '' } = useParams()
  const effect = effectsById.get(id)
  const ref = effect && refForEffect(effect)
  useRecordVisit(effect && ref && { href: ref.href, title: effect.name, kind: `Effect · ${ref.kindLabel}`, color: C })
  if (!effect || !ref) return <NotFoundPage />
  const cat = effectCategoryById.get(effect.category)
  const parent = effect.parent ? effectsById.get(effect.parent) : undefined
  const children = library.effects.filter((e) => e.parent === effect.id).sort(compareEffects)
  const siblings = parent ? library.effects.filter((e) => e.parent === parent.id && e.id !== effect.id).sort(compareEffects) : []
  const genres = resolveRefs(effect.genres)
  const kindIcon = effect.kind === 'unit' ? Cpu : effect.kind === 'group' ? Layers : SlidersHorizontal

  return (
    <DetailLayout
      key={effect.id}
      color={C}
      header={
        <PageHeader
          eyebrow={
            <Link to={`/effects/category/${effect.category}`} className="hover:underline">
              Effect · {cat?.name}
            </Link>
          }
          title={effect.name}
          aliases={effect.aliases}
          summary={effect.summary}
          color={C}
          iconName={cat?.icon}
          meta={
            <>
              <Chip color={C} icon={kindIcon}>
                {effectKindLabel(effect)}
              </Chip>
              {parent && (
                <Chip href={`/effects/${parent.id}`} color={C} icon={GitBranch}>
                  Part of {parent.name}
                </Chip>
              )}
              {effect.typeGroup && <Chip>{effect.typeGroup}</Chip>}
              {entryMeta(effect)}
            </>
          }
          actions={<BookmarkButton page={{ href: ref.href, title: effect.name, kind: `Effect · ${ref.kindLabel}`, color: C }} />}
        />
      }
      cheatSheet={<CheatSheetCard items={effect.cheatSheet} />}
      sections={[
        {
          id: 'types',
          title: 'Types',
          icon: Layers,
          cheat: true,
          description: 'Each card is its own page: what it sounds like, where to start, and which plugins actually do that job.',
          content: children.length > 0 && (
            <EntryGrid
              items={children.map((child) => effectCard(child, child.typeGroup))}
              noun={['type', 'types']}
              groups={TYPE_GROUPS.map((label) => ({ id: label, label }))}
              emptyIcon={Layers}
              emptyTitle="No types yet"
              emptyText="Type pages will appear here."
              color={C}
            />
          ),
        },
        {
          id: 'siblings',
          title: parent ? `More ${parent.name} types` : 'More types',
          icon: Layers,
          content: siblings.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Chip href={`/effects/${parent!.id}`} color={C} icon={Layers}>
                {parent!.name} overview
              </Chip>
              {siblings.map((s) => (
                <Chip key={s.id} href={`/effects/${s.id}`} color={C}>
                  {s.name}
                </Chip>
              ))}
            </div>
          ),
        },
        {
          id: 'how-it-works',
          title: 'How It Works',
          icon: Gauge,
          content: (
            <div className="space-y-4">
              <Paragraph text={effect.howItWorks} />
              <Expandable title="History" summary="Where this effect came from">
                <Paragraph text={effect.history} />
              </Expandable>
            </div>
          ),
        },
        {
          id: 'controls',
          title: 'Controls',
          icon: SlidersHorizontal,
          cheat: true,
          content: (
            <div className="grid gap-3 sm:grid-cols-2">
              {effect.controls.map((c) => (
                <div key={c.name} className="card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-fg">{c.name}</h3>
                    {c.startingValue && (
                      <span className="shrink-0 rounded-lg bg-accent/14 px-2 py-0.5 font-mono text-xs font-semibold text-accent-ink" title="Starting value">
                        {c.startingValue}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg/75">
                    <RichText text={c.description} />
                  </p>
                  {c.typicalRange && (
                    <p className="mt-3 flex items-center gap-2 text-xs text-muted">
                      <span className="eyebrow">Range</span>
                      <span className="font-mono text-fg/80">{c.typicalRange}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          ),
        },
        {
          id: 'meters',
          title: 'Meters',
          icon: Gauge,
          content: effect.meters.length > 0 && <NamedList items={effect.meters} />,
        },
        {
          id: 'variants',
          title: children.length > 0 ? 'Variants' : 'Types & Variants',
          icon: Disc3,
          content: effect.variants.length > 0 && <NamedList items={effect.variants} />,
        },
        {
          id: 'when',
          title: 'When to Use It',
          icon: Target,
          cheat: true,
          content: <WhenToUse yes={effect.whenToUse} no={effect.whenNotToUse} />,
        },
        {
          id: 'starting-settings',
          title: 'Starting Settings',
          icon: SlidersHorizontal,
          cheat: true,
          description: 'Starting points, not rules. Adjust by ear.',
          content: effect.startingSettings.length > 0 && (
            <Tabs
              label="Starting settings by source"
              items={effect.startingSettings.map((s) => ({
                value: s.source,
                label: s.source,
                content: (
                  <div className="space-y-3">
                    <SettingsTable rows={s.settings} />
                    {s.note && (
                      <p className="text-sm text-muted">
                        <RichText text={s.note} />
                      </p>
                    )}
                  </div>
                ),
              }))}
            />
          ),
        },
        {
          id: 'techniques',
          title: 'Techniques',
          icon: Wrench,
          content: (
            <div className="space-y-6">
              <div className="grid gap-3">
                {effect.techniques.map((t) => (
                  <TechniqueBlock key={t.name} t={t} color={C} />
                ))}
              </div>
              {effect.unorthodoxTechniques.length > 0 && (
                <div style={accent(CALLOUTS.unorthodox.color)}>
                  <div className="eyebrow mb-3 flex items-center gap-2 text-accent-ink">
                    <FlaskConical className="size-4" aria-hidden /> Unorthodox techniques
                  </div>
                  <div className="grid gap-3">
                    {effect.unorthodoxTechniques.map((t) => (
                      <TechniqueBlock key={t.name} t={t} color={CALLOUTS.unorthodox.color} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ),
        },
        {
          id: 'mistakes',
          title: 'Mistakes & Myths',
          icon: CircleX,
          content: (effect.mistakes.length > 0 || effect.myths.length > 0) && (
            <div className="space-y-3">
              {effect.mistakes.map((m, i) => (
                <Callout key={i} variant="mistake" body={m} />
              ))}
              {effect.myths.map((m, i) => (
                <MythCard key={i} myth={m.myth} truth={m.truth} />
              ))}
            </div>
          ),
        },
        {
          id: 'chain',
          title: 'Where It Goes in the Chain',
          icon: Link2,
          cheat: true,
          content: (
            <div className="card flex gap-3 p-4">
              <Link2 className="mt-0.5 size-5 shrink-0 text-accent-ink" aria-hidden />
              <p className="text-[15px] leading-relaxed text-fg/85">
                <RichText text={effect.chainPlacement} />
              </p>
            </div>
          ),
        },
        { id: 'plugins', title: 'Plugins', icon: Sparkles, cheat: true, content: <PluginTierPanel recs={effect.pluginRecs} /> },
        {
          id: 'hardware',
          title: 'Classic Hardware',
          icon: Cpu,
          content: effect.hardware.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {effect.hardware.map((h) => (
                <div key={h.name} className="card p-4">
                  <div className="font-semibold text-fg">{h.name}</div>
                  {h.maker && <div className="text-xs text-muted">{h.maker}</div>}
                  {h.note && (
                    <p className="mt-1.5 text-sm text-fg/75">
                      <RichText text={h.note} />
                    </p>
                  )}
                </div>
              ))}
            </div>
          ),
        },
        { id: 'genres', title: 'Used In', icon: Disc3, content: genres.length > 0 && <RefChips refs={genres} /> },
        ...commonSections(effect, ref.ref),
      ]}
    />
  )
}

function NamedList({ items }: { items: { name: string; description: string }[] }) {
  return (
    <dl className="card divide-y divide-line">
      {items.map((it) => (
        <div key={it.name} className="grid gap-1 px-4 py-3 sm:grid-cols-[12rem_1fr] sm:gap-4">
          <dt className="font-semibold text-fg">{it.name}</dt>
          <dd className="text-[15px] leading-relaxed text-fg/80">
            <RichText text={it.description} />
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function WhenToUse({ yes, no }: { yes: string[]; no: string[] }) {
  const col = (items: string[], good: boolean) => (
    <div style={accent(good ? CALLOUTS.tip.color : CALLOUTS.mistake.color)} className="card p-4">
      <div className="eyebrow mb-3 flex items-center gap-2 text-accent-ink">
        {good ? <Check className="size-4" aria-hidden /> : <X className="size-4" aria-hidden />}
        {good ? 'Reach for it when' : 'Skip it when'}
      </div>
      <ul className="space-y-2">
        {items.map((t, i) => (
          <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-fg/85">
            <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            <RichText text={t} />
          </li>
        ))}
      </ul>
    </div>
  )
  return (
    <div className={cn('grid gap-3', no.length > 0 && 'md:grid-cols-2')}>
      {col(yes, true)}
      {no.length > 0 && col(no, false)}
    </div>
  )
}

function MythCard({ myth, truth }: { myth: string; truth: string }) {
  return (
    <div style={accent(CALLOUTS.myth.color)} className="overflow-hidden rounded-2xl border border-accent/25">
      <div className="flex gap-3 bg-accent/[0.08] px-4 py-3">
        <ShieldQuestion className="mt-0.5 size-5 shrink-0 text-accent-ink" aria-hidden />
        <div>
          <div className="eyebrow text-accent-ink">Myth</div>
          <p className="mt-0.5 text-[15px] text-fg/85 line-through decoration-accent/50">
            <RichText text={myth} />
          </p>
        </div>
      </div>
      <div className="flex gap-3 px-4 py-3" style={accent(CALLOUTS.tip.color)}>
        <Check className="mt-0.5 size-5 shrink-0 text-accent-ink" aria-hidden />
        <div>
          <div className="eyebrow text-muted">Truth</div>
          <p className="mt-0.5 text-[15px] text-fg/90">
            <RichText text={truth} />
          </p>
        </div>
      </div>
    </div>
  )
}
