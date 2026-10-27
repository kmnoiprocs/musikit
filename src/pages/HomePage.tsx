import { ArrowRight, BookOpen, ClipboardList, Clock, Compass, Palette, Search, Sparkles } from 'lucide-react'
import { m } from 'motion/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { openPalette } from '../app/palette'
import { StaggerGrid, StaggerItem } from '../components/content/Cards'
import { FrequencyChart } from '../components/content/FrequencyChart'
import { ButtonLink } from '../components/ui/Button'
import { IconTile, ProgressBar, ShortcutKeys } from '../components/ui/Misc'
import { PILLARS, type Pillar } from '../content/registry/pillars'
import { Icon } from '../design/icons'
import { REC_TIERS, ROLES } from '../design/tokens'
import { accent, cn } from '../lib/cn'
import { COLORS, TOTALS, effectCategories, genreFamilies, instrumentFamilies, partsOfPillar, pillarHref, pillarStats } from '../lib/content'
import { plural } from '../lib/labels'
import { useRecent } from '../lib/prefs'
import { PageContainer, PageSection } from './shared'

const LEARN_PILLARS = PILLARS.filter((p) => !['effects', 'instruments', 'genres', 'reference', 'interactive'].includes(p.id))

function Aurora() {
  const blobs = [
    { color: '#8B5CF6', className: 'left-[-10%] top-[-30%] size-[34rem]' },
    { color: '#F43F5E', className: 'right-[-8%] top-[-20%] size-[30rem] [animation-delay:-6s]' },
    { color: '#F97316', className: 'right-[25%] top-[30%] size-[22rem] [animation-delay:-12s]' },
    { color: '#06B6D4', className: 'left-[20%] top-[40%] size-[24rem] [animation-delay:-3s]' },
  ]
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {blobs.map((b, i) => (
        <div key={i} className={cn('absolute rounded-full opacity-[0.22] blur-[90px] motion-safe:animate-aurora light:opacity-[0.16]', b.className)} style={{ background: b.color }} />
      ))}
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,black,transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg" />
    </div>
  )
}

function Hero() {
  const stats: [number, string][] = [
    [TOTALS.parts, 'Parts'],
    [TOTALS.sections, 'Guide sections'],
    [TOTALS.genreFamilies, 'Genre families'],
    [TOTALS.instrumentFamilies, 'Instrument families'],
    [TOTALS.effectCategories, 'Effect categories'],
  ]
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <Aurora />
      <div className="mx-auto max-w-[80rem] px-4 pt-14 pb-14 sm:px-8 sm:pt-20 sm:pb-16">
        <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
            <Sparkles className="size-3.5 text-[#F5C542]" aria-hidden />
            The music production guide and cheat sheet
          </span>
          <h1 className="mt-6 max-w-4xl font-display text-[2.6rem] leading-[1.04] font-bold tracking-tight text-balance text-fg sm:text-display">
            Everything you need to{' '}
            <span className="bg-[linear-gradient(95deg,#8B5CF6,#F43F5E_45%,#F97316_75%,#EAB308)] bg-clip-text text-transparent">make great music</span>, in one place.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-fg/75">
            A color-coded guide for beatmakers, songwriters, singers, rappers, and engineers. Go from theory and songwriting to mixing and mastering, with encyclopedias of genres, instruments, effects, and plugins.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={openPalette}
              className="group flex h-12 w-full items-center gap-3 rounded-2xl border border-line bg-surface/80 px-4 text-left text-[15px] text-muted shadow-[var(--mk-card-shadow)] backdrop-blur transition-colors hover:border-faint hover:text-fg sm:w-[26rem]"
            >
              <Search className="size-5 shrink-0" aria-hidden />
              <span className="flex-1 truncate">Search genres, effects, techniques…</span>
              <ShortcutKeys className="hidden sm:flex" />
            </button>
            <ButtonLink to="/part/0" variant="primary" size="lg" icon={Compass}>
              Start here
            </ButtonLink>
          </div>
        </m.div>

        <StaggerGrid className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map(([n, label]) => (
            <StaggerItem key={label} className="rounded-2xl border border-line bg-surface/60 px-4 py-3 backdrop-blur">
              <div className="font-display text-2xl font-semibold text-fg tabular-nums">{n}</div>
              <div className="text-xs text-muted">{label}</div>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1 text-faint">Built for</span>
          {Object.entries(ROLES).map(([id, r]) => (
            <span key={id} className="inline-flex h-7 items-center gap-1.5 rounded-full border border-line bg-surface/60 px-2.5 text-xs text-muted backdrop-blur">
              <r.icon className="size-3.5" aria-hidden />
              {r.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function PillarCard({ pillar }: { pillar: Pillar }) {
  const parts = partsOfPillar(pillar)
  const stats = pillarStats(pillar)
  const only = parts.length === 1 ? parts[0] : undefined
  const highlights = !only
    ? parts.map((p) => ({ key: String(p.part), label: p.shortTitle, color: p.accent }))
    : only.sections.length
      ? only.sections.slice(0, 3).map((s) => ({ key: s.number, label: s.shortTitle, color: s.accent }))
      : only.topics.slice(0, 3).map((t) => ({ key: t.label ?? '', label: t.label ?? '', color: pillar.color }))
  return (
    <Link
      to={pillarHref(pillar)}
      style={accent(pillar.color)}
      className="group card relative flex h-full flex-col overflow-hidden p-5 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_20px_44px_-26px_var(--accent)]"
    >
      <div className="pointer-events-none absolute -top-20 -right-20 size-48 rounded-full bg-accent/15 blur-3xl transition-colors duration-300 group-hover:bg-accent/30" aria-hidden />
      <div className="relative flex items-start justify-between">
        <IconTile name={pillar.icon} color={pillar.color} size="lg" solid />
        <ArrowRight className="size-4 text-faint transition-all group-hover:translate-x-0.5 group-hover:text-accent-ink" aria-hidden />
      </div>
      <h3 className="relative mt-4 font-display text-lg font-semibold tracking-tight text-fg">{pillar.name}</h3>
      <ul className="relative mt-2 flex flex-wrap gap-x-3 gap-y-1">
        {highlights.map((h) => (
          <li key={h.key} style={accent(h.color)} className="flex items-center gap-1.5 text-[13px] text-muted">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            {h.label}
          </li>
        ))}
      </ul>
      <div className="relative mt-auto pt-5">
        <div className="mb-1.5 flex justify-between font-mono text-[11px] text-muted">
          <span>{plural(stats.total, stats.unit)}</span>
          <span>{stats.ready} written</span>
        </div>
        <ProgressBar value={stats.ready} total={stats.total} color={pillar.color} />
      </div>
    </Link>
  )
}

function EncyclopediaCard({ href, title, color, icon, stat, children }: { href: string; title: string; color: string; icon: string; stat: string; children: ReactNode }) {
  return (
    <Link
      to={href}
      style={accent(color)}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-[linear-gradient(150deg,color-mix(in_oklab,var(--accent)_18%,var(--mk-surface)),var(--mk-surface)_60%)] p-6 shadow-[var(--mk-card-shadow)] transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-accent/55"
    >
      <div className="flex items-center gap-3">
        <IconTile name={icon} color={color} size="lg" solid />
        <div>
          <h3 className="font-display text-h4 font-semibold tracking-tight text-fg">{title}</h3>
          <p className="font-mono text-xs text-accent-ink">{stat}</p>
        </div>
      </div>
      <div className="mt-5 flex-1">{children}</div>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink">
        Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  )
}

function Encyclopedias() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <EncyclopediaCard href="/genres" title="Genres" color={COLORS.genres} icon="disc-3" stat={`${TOTALS.genreFamilies} families · hundreds of styles`}>
        <div className="flex flex-wrap gap-1.5">
          {genreFamilies.map((f) => (
            <span key={f.id} title={f.name} className="h-6 flex-1 basis-6 rounded-md transition-transform hover:scale-110" style={{ background: f.color }} />
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">BPM, progressions, drum grids, arrangement, mix targets, and a 10-step recipe for every style.</p>
      </EncyclopediaCard>
      <EncyclopediaCard href="/instruments" title="Instruments" color={COLORS.instruments} icon="guitar" stat={`${TOTALS.instrumentFamilies} families · from piano to kora`}>
        <div className="flex flex-wrap gap-2">
          {instrumentFamilies.slice(0, 14).map((f) => (
            <span key={f.id} title={f.name} className="flex size-9 items-center justify-center rounded-xl bg-accent/12 text-accent-ink">
              <Icon name={f.icon} className="size-4" />
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">Ranges, frequency profiles, articulations, and how to make each virtual instrument sound real.</p>
      </EncyclopediaCard>
      <EncyclopediaCard href="/effects" title="Effects" color={COLORS.effects} icon="zap" stat={`${TOTALS.effectCategories} categories · analog and digital`}>
        <div className="flex flex-wrap gap-2">
          {effectCategories.map((c) => (
            <span key={c.id} title={c.name} className="flex size-9 items-center justify-center rounded-xl bg-accent/12 text-accent-ink">
              <Icon name={c.icon} className="size-4" />
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">Every control explained, starting settings per source, techniques, and the classic hardware behind it.</p>
      </EncyclopediaCard>
      <EncyclopediaCard href="/plugins" title="Plugin Registry" color={COLORS.plugins} icon="plug" stat={`${TOTALS.plugins} plugins and growing`}>
        <div className="flex flex-wrap gap-2">
          {Object.values(REC_TIERS).map((t) => (
            <span key={t.label} style={accent(t.color)} className="inline-flex h-8 items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 text-xs font-medium text-accent-ink">
              <t.icon className="size-3.5" aria-hidden /> {t.label}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">Industry, pro, budget, free, and stock options for every job, with formats, platforms, and prices.</p>
      </EncyclopediaCard>
    </div>
  )
}

function HowItWorks() {
  const items = [
    { icon: Palette, color: '#F43F5E', title: 'Color is navigation', body: 'Every pillar, part, genre family, and callout has one fixed color, so you always know where you are.' },
    { icon: ClipboardList, color: '#EAB308', title: 'Guide or Cheat Sheet', body: 'Flip the switch in the top bar: read the full explanation, or just the essentials when you are mid-session.' },
    { icon: Search, color: '#06B6D4', title: 'Find anything fast', body: 'Press Ctrl+K or / from any page to jump to a genre, effect, instrument, plugin, or guide section.' },
  ]
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((i) => (
        <div key={i.title} className="card flex gap-4 p-5">
          <IconTile icon={i.icon} color={i.color} />
          <div>
            <h3 className="font-semibold text-fg">{i.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{i.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function JumpBackIn() {
  const recent = useRecent()
  if (recent.length === 0) return null
  return (
    <PageSection id="recent" title="Jump back in" icon={Clock} color="#A1A1AA">
      <div className="flex gap-3 overflow-x-auto pb-2">
        {recent.map((r) => (
          <Link key={r.href} to={r.href} style={accent(r.color)} className="card flex min-w-56 shrink-0 items-center gap-3 px-4 py-3 transition-colors hover:border-accent/50">
            <span className="size-2.5 shrink-0 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-fg">{r.title}</span>
              <span className="block truncate text-xs text-muted">{r.kind}</span>
            </span>
          </Link>
        ))}
      </div>
    </PageSection>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <PageContainer>
        <JumpBackIn />
        <PageSection id="learn" title="Learn by pillar" icon={BookOpen} color="#8B5CF6" description="Ten learning pillars, from studio basics to the business of music. Each one is split into numbered parts and sections.">
          <StaggerGrid className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {LEARN_PILLARS.map((p) => (
              <StaggerItem key={p.id}>
                <PillarCard pillar={p} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </PageSection>
        <PageSection id="encyclopedias" title="Encyclopedias" icon={Sparkles} color={COLORS.genres} description="Deep reference entries you can browse, filter, and cross-link.">
          <Encyclopedias />
        </PageSection>
        <PageSection
          id="reference"
          title="Quick reference"
          icon={ClipboardList}
          color="#EAB308"
          description="Charts and cheat sheets you will reach for mid-session."
          action={
            <ButtonLink to="/reference" variant="secondary" size="sm" iconRight={ArrowRight}>
              Open the hub
            </ButtonLink>
          }
        >
          <div className="card p-5 sm:p-6">
            <FrequencyChart />
          </div>
        </PageSection>
        <PageSection id="how" title="How MusiKit works" icon={Compass} color="#06B6D4">
          <HowItWorks />
        </PageSection>
      </PageContainer>
    </>
  )
}
