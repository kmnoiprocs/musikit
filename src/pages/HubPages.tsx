import { AudioWaveform, Bookmark, BookMarked, CircleDashed, Clock, ClipboardList, Construction, MousePointerClick, Palette, ScrollText, Search, Tags, Trash2, Zap } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { openPalette } from '../app/palette'
import { StaggerGrid, StaggerItem } from '../components/content/Cards'
import { Callout } from '../components/content/Callout'
import { FrequencyChart } from '../components/content/FrequencyChart'
import { OutlineTopics } from '../components/content/OutlineTopics'
import { RefChips } from '../components/content/Refs'
import { PageHeader } from '../components/layout/PageHeader'
import { Button } from '../components/ui/Button'
import { Chip, RoleChip, SkillTag } from '../components/ui/Chip'
import { EmptyState, IconTile } from '../components/ui/Misc'
import type { Role, SkillLevel } from '../content/schema'
import { CALLOUTS, ROLES, SKILL_LEVELS, TRACK_COLORS } from '../design/tokens'
import { accent, cn } from '../lib/cn'
import { COLORS, glossaryColor, library, partByNumber, pillarById, resolveRefs } from '../lib/content'
import { capitalize } from '../lib/labels'
import { useBookmarks, useRecent } from '../lib/prefs'
import { PageContainer, PageSection, SearchField } from './shared'

const GLOSSARY_COLOR = '#5EEAD4'

export function GlossaryPage() {
  const { hash } = useLocation()
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const terms = [...library.glossary]
    .sort((a, b) => a.term.localeCompare(b.term))
    .filter((t) => !q || `${t.term} ${t.aliases.join(' ')} ${t.short}`.toLowerCase().includes(q))
  const letters = [...new Set(terms.map((t) => t.term[0].toUpperCase()))]
  const target = decodeURIComponent(hash.slice(1))

  return (
    <PageContainer color={GLOSSARY_COLOR} className="max-w-[64rem]">
      <PageHeader
        eyebrow="Reference"
        title="Glossary"
        color={GLOSSARY_COLOR}
        icon={ScrollText}
        summary="Plain-language definitions for every term in MusiKit. Underlined terms anywhere in the guide show these definitions on hover."
      />
      <div className="sticky top-14 z-20 -mx-4 flex flex-wrap items-center gap-3 border-b border-line bg-bg/85 px-4 py-3 backdrop-blur-xl sm:-mx-8 sm:px-8">
        <SearchField value={query} onChange={setQuery} placeholder="Filter terms…" className="w-full sm:w-64" />
        <nav aria-label="Letters" className="flex flex-wrap gap-1">
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((l) => {
            const has = letters.includes(l)
            return has ? (
              <a key={l} href={`#letter-${l}`} className="flex size-7 items-center justify-center rounded-md font-mono text-xs font-semibold text-accent-ink transition-colors hover:bg-accent/15">
                {l}
              </a>
            ) : (
              <span key={l} className="flex size-7 items-center justify-center font-mono text-xs text-faint/60">
                {l}
              </span>
            )
          })}
        </nav>
      </div>
      {terms.length === 0 ? (
        <p className="py-12 text-sm text-muted">No terms match “{query}”.</p>
      ) : (
        letters.map((letter) => (
          <section key={letter} className="mt-10" aria-labelledby={`letter-${letter}`}>
            <h2 id={`letter-${letter}`} className="mb-3 font-display text-h3 font-semibold text-accent-ink">
              {letter}
            </h2>
            <div className="space-y-3">
              {terms
                .filter((t) => t.term[0].toUpperCase() === letter)
                .map((t) => {
                  const color = glossaryColor(t)
                  const related = resolveRefs(t.related)
                  return (
                    <article
                      key={t.id}
                      id={t.id}
                      style={accent(color)}
                      className={cn('card relative overflow-hidden p-5 transition-shadow', target === t.id && 'ring-2 ring-accent shadow-[0_0_0_6px_color-mix(in_oklab,var(--accent)_15%,transparent)]')}
                    >
                      <div className="absolute inset-y-0 left-0 w-1 bg-accent" aria-hidden />
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="font-display text-lg font-semibold text-fg">{t.term}</h3>
                        {t.aliases.length > 0 && <span className="text-sm text-muted">{t.aliases.join(' · ')}</span>}
                        <Chip size="xs" color={color} className="ml-auto">
                          {pillarById.get(t.pillar)?.name}
                        </Chip>
                      </div>
                      <p className="mt-2 text-[15px] leading-relaxed text-fg/85">{t.short}</p>
                      {t.long && <p className="mt-2 text-[15px] leading-relaxed text-muted">{t.long}</p>}
                      {related.length > 0 && <RefChips refs={related} className="mt-4" />}
                    </article>
                  )
                })}
            </div>
          </section>
        ))
      )}
    </PageContainer>
  )
}

function SkillsAndRoles() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="card p-5">
        <div className="eyebrow mb-3 text-muted">Skill level</div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(SKILL_LEVELS) as SkillLevel[]).map((s) => (
            <SkillTag key={s} level={s} />
          ))}
        </div>
      </div>
      <div className="card p-5">
        <div className="eyebrow mb-3 text-muted">Roles</div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(ROLES) as Role[]).map((r) => (
            <RoleChip key={r} role={r} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function TrackColors() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {TRACK_COLORS.map((t) => (
        <div key={t.name} className="card flex items-center gap-3 overflow-hidden p-2 pr-3">
          <span className="h-9 w-2 shrink-0 rounded-full" style={{ background: t.color }} />
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-medium text-fg">{t.name}</span>
            <span className="font-mono text-[11px] text-muted">{t.color}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

export function CalloutLegend() {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {Object.entries(CALLOUTS).map(([id, c]) => (
        <div key={id} style={accent(c.color)} className="flex items-center gap-3 rounded-xl border border-accent/25 bg-accent/[0.07] px-3 py-2.5">
          <c.icon className="size-5 shrink-0 text-accent-ink" aria-hidden />
          <span className="text-sm font-medium text-fg">{c.label}</span>
        </div>
      ))}
    </div>
  )
}

export function ReferencePage() {
  const part = partByNumber.get(27)
  return (
    <PageContainer color={COLORS.reference}>
      <PageHeader
        eyebrow="Part 27"
        title="Quick Reference Hub"
        color={COLORS.reference}
        icon={BookMarked}
        summary="Every chart, table, and checklist in one place, for when you are mid-session and just need the number."
      />
      <PageSection id="spectrum" title="Frequency Spectrum" icon={AudioWaveform} color="#EC4899" description="The seven bands used in every EQ chart and instrument profile in MusiKit. Hover to read exact frequencies.">
        <div className="card p-5 sm:p-6">
          <FrequencyChart />
        </div>
      </PageSection>
      <PageSection id="track-colors" title="DAW Track Color Standard" icon={Palette} color="#F97316" description="Color-code your sessions the same way every time, and you will find any track at a glance.">
        <TrackColors />
      </PageSection>
      <PageSection id="callouts" title="Callout Legend" icon={ClipboardList} color="#EAB308" description="What each colored box in the guide means.">
        <CalloutLegend />
      </PageSection>
      <PageSection id="tags" title="Skill and Role Tags" icon={Tags} color="#22C55E">
        <SkillsAndRoles />
      </PageSection>
      {part && part.topics.length > 0 && (
        <PageSection id="planned" title="Coming to the hub" icon={Construction} color={COLORS.reference} description="Cheat sheets planned for this hub, from the master outline.">
          <OutlineTopics topics={part.topics} />
        </PageSection>
      )}
    </PageContainer>
  )
}

const AVAILABLE_TOOLS = [
  { icon: Search, title: 'Global search', body: 'Press Ctrl+K or / from any page.', color: '#06B6D4', action: openPalette },
  { icon: ClipboardList, title: 'Cheat Sheet mode', body: 'Toggle in the top bar to show only the essentials.', color: '#EAB308' },
  { icon: Bookmark, title: 'Bookmarks', body: 'Save any page with the bookmark button.', color: '#F5C542', href: '/bookmarks' },
  { icon: AudioWaveform, title: 'Frequency chart', body: 'Hover the spectrum to read frequencies.', color: '#EC4899', href: '/reference' },
]

export function ToolsPage() {
  const part = partByNumber.get(28)
  return (
    <PageContainer color={COLORS.tools}>
      <PageHeader
        eyebrow="Part 28"
        title="Interactive Tools"
        color={COLORS.tools}
        icon={MousePointerClick}
        summary="Calculators, explorers, players, and ear trainers built into MusiKit. The first tools are live now; the rest arrive one or two at a time in Stage 6."
      />
      <PageSection id="available" title="Available now" icon={Zap} color="#22C55E">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {AVAILABLE_TOOLS.map((t) => {
            const body = (
              <>
                <IconTile icon={t.icon} color={t.color} />
                <h3 className="mt-3 font-semibold text-fg">{t.title}</h3>
                <p className="mt-1 text-sm text-muted">{t.body}</p>
              </>
            )
            const cls = 'card block h-full p-5 text-left transition-colors hover:border-faint'
            return t.href ? (
              <Link key={t.title} to={t.href} className={cls}>
                {body}
              </Link>
            ) : t.action ? (
              <button key={t.title} type="button" onClick={t.action} className={cls}>
                {body}
              </button>
            ) : (
              <div key={t.title} className={cls}>
                {body}
              </div>
            )
          })}
        </div>
      </PageSection>
      {part && (
        <PageSection id="planned" title="Coming in Stage 6" icon={Construction} color={COLORS.tools}>
          <StaggerGrid className="grid gap-3 sm:grid-cols-2">
            {part.topics.map((t) => (
              <StaggerItem key={t.label} className="card p-5">
                <div className="flex items-center gap-2">
                  <CircleDashed className="size-4 text-accent-ink" aria-hidden />
                  <h3 className="font-semibold text-fg">{t.label}</h3>
                </div>
                {t.text && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {t.text
                      .replace(/\.$/, '')
                      .split(/;\s*/)
                      .map((tool) => (
                        <li key={tool}>
                          <Chip size="xs">{capitalize(tool)}</Chip>
                        </li>
                      ))}
                  </ul>
                )}
              </StaggerItem>
            ))}
          </StaggerGrid>
        </PageSection>
      )}
    </PageContainer>
  )
}

export function BookmarksPage() {
  const { bookmarks, remove } = useBookmarks()
  const recent = useRecent()
  const gold = '#F5C542'
  return (
    <PageContainer color={gold} className="max-w-[64rem]">
      <PageHeader eyebrow="Your library" title="Bookmarks" color={gold} icon={Bookmark} summary="Pages you saved, stored on this device. Use the bookmark button at the top of any page." />
      {bookmarks.length === 0 ? (
        <EmptyState icon={Bookmark} title="No bookmarks yet" color={gold}>
          Tap the bookmark icon on any guide section, genre, instrument, effect, or plugin to keep it here.
        </EmptyState>
      ) : (
        <ul className="space-y-2">
          {bookmarks.map((b) => (
            <li key={b.href} style={accent(b.color)} className="card flex items-center gap-3 p-2 pl-4">
              <span className="size-2.5 shrink-0 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
              <Link to={b.href} className="min-w-0 flex-1 py-1.5">
                <span className="block truncate font-semibold text-fg hover:underline">{b.title}</span>
                <span className="block truncate text-xs text-muted">{b.kind}</span>
              </Link>
              <Button variant="ghost" size="sm" icon={Trash2} onClick={() => remove(b.href)} aria-label={`Remove ${b.title}`}>
                <span className="hidden sm:inline">Remove</span>
              </Button>
            </li>
          ))}
        </ul>
      )}
      {recent.length > 0 && (
        <PageSection id="recent" title="Recently viewed" icon={Clock} color="#A1A1AA">
          <ul className="grid gap-2 sm:grid-cols-2">
            {recent.map((r) => (
              <li key={r.href}>
                <Link to={r.href} style={accent(r.color)} className="card flex items-center gap-3 px-4 py-3 transition-colors hover:border-accent/50">
                  <span className="size-2 shrink-0 rounded-full bg-accent" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-fg">{r.title}</span>
                    <span className="block truncate text-xs text-muted">{r.kind}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </PageSection>
      )}
      <Callout variant="tip" className="mt-12" body="Bookmarks and recent pages live in this browser only, so they work offline and are never uploaded anywhere." />
    </PageContainer>
  )
}
