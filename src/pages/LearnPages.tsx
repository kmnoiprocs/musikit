import { ArrowRight, BookOpenText, CircleCheck, CircleDashed, ClipboardList, Construction, Layers, ListTree } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router'
import { StaggerGrid, StaggerItem } from '../components/content/Cards'
import { OutlineTopics } from '../components/content/OutlineTopics'
import { PageHeader } from '../components/layout/PageHeader'
import { BookmarkButton, PrevNext } from '../components/layout/PageActions'
import { Chip } from '../components/ui/Chip'
import { IconTile, ProgressBar } from '../components/ui/Misc'
import { Icon } from '../design/icons'
import { accent, cn } from '../lib/cn'
import { PARTS, neighbors, partByNumber, partsOfPillar, pillarById, pillarHref, pillarStats, type PartInfo, type SectionInfo } from '../lib/content'
import { capitalize, plural } from '../lib/labels'
import { useMode, useRecordVisit } from '../lib/prefs'
import NotFoundPage from './NotFoundPage'
import { PageContainer, PageSection } from './shared'

export function PillarPage() {
  const { pillarId = '' } = useParams()
  const pillar = pillarById.get(pillarId)
  if (!pillar) return <NotFoundPage />
  const parts = partsOfPillar(pillar)
  if (parts.length === 1) return <Navigate to={pillarHref(pillar)} replace />
  const stats = pillarStats(pillar)
  return (
    <PageContainer color={pillar.color}>
      <PageHeader
        eyebrow="Pillar"
        title={pillar.name}
        color={pillar.color}
        iconName={pillar.icon}
        summary={`${plural(parts.length, 'part')} and ${plural(stats.total, stats.unit)}. Pick a part to see everything it covers.`}
        meta={<ProgressMeta ready={stats.ready} total={stats.total} color={pillar.color} />}
      />
      <StaggerGrid className="space-y-5">
        {parts.map((p) => (
          <StaggerItem key={p.part}>
            <PartOverviewCard part={p} />
          </StaggerItem>
        ))}
      </StaggerGrid>
    </PageContainer>
  )
}

/** The trailing "(...)" of an outline title, as a sentence: "Rap (Writing, Flow)" gives "Writing, Flow". */
function parenthetical(title: string, short: string): string | undefined {
  return title === short ? undefined : capitalize(title.slice(short.length).trim().replace(/^\(|\)$/g, ''))
}

function ProgressMeta({ ready, total, color }: { ready: number; total: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <ProgressBar value={ready} total={total} color={color} className="w-40" />
      <span className="font-mono text-xs text-muted">
        {ready} of {total} written
      </span>
    </div>
  )
}

function PartOverviewCard({ part }: { part: PartInfo }) {
  return (
    <div style={accent(part.accent)} className="card overflow-hidden">
      <Link to={part.href} className="group flex items-center gap-4 border-b border-line bg-[linear-gradient(110deg,color-mix(in_oklab,var(--accent)_14%,transparent),transparent_60%)] p-5 transition-colors hover:bg-accent/[0.06]">
        <IconTile name={part.icon} color={part.accent} size="lg" solid />
        <div className="min-w-0 flex-1">
          <div className="eyebrow text-accent-ink">Part {part.part}</div>
          <h2 className="font-display text-h4 font-semibold tracking-tight text-fg">{part.shortTitle}</h2>
        </div>
        <span className="hidden font-mono text-xs text-muted sm:block">
          {part.readyCount}/{part.sections.length}
        </span>
        <ArrowRight className="size-5 text-faint transition-all group-hover:translate-x-1 group-hover:text-accent-ink" aria-hidden />
      </Link>
      <ul className="grid gap-x-6 p-3 sm:grid-cols-2">
        {part.sections.map((s) => (
          <li key={s.number}>
            <SectionLink section={s} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function SectionLink({ section }: { section: SectionInfo }) {
  return (
    <Link to={section.href} style={accent(section.accent)} className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-fg/[0.04]">
      <span className="w-10 shrink-0 font-mono text-xs text-faint">{section.number}</span>
      <span className={cn('min-w-0 flex-1 truncate', section.ready ? 'font-medium text-fg' : 'text-muted')}>{section.pages[0]?.title ?? section.shortTitle}</span>
      {section.ready && <span className="size-1.5 rounded-full bg-accent shadow-[0_0_6px_var(--accent)]" aria-label="written" />}
    </Link>
  )
}

export function PartPage() {
  const { part: partParam = '' } = useParams()
  const part = partByNumber.get(Number(partParam))
  const [mode] = useMode()
  useRecordVisit(part && { href: part.href, title: `Part ${part.part}: ${part.shortTitle}`, kind: part.pillar.name, color: part.accent })
  if (!part || !/^\d+$/.test(partParam)) return <NotFoundPage />
  if (part.href !== `/part/${part.part}`) return <Navigate to={part.href} replace />

  const i = PARTS.indexOf(part)
  const prev = PARTS[i - 1]
  const next = PARTS[i + 1]
  const navTarget = (p?: PartInfo) => p && { href: p.href, title: `Part ${p.part}: ${p.shortTitle}`, color: p.accent }

  return (
    <PageContainer color={part.accent}>
      <PageHeader
        eyebrow={
          <>
            <span>Part {part.part}</span>
            <span className="text-faint">·</span>
            <Link to={pillarHref(part.pillar)} className="hover:underline">
              {part.pillar.name}
            </Link>
          </>
        }
        title={part.shortTitle}
        color={part.accent}
        iconName={part.icon}
        summary={parenthetical(part.title, part.shortTitle)}
        meta={part.sections.length > 0 ? <ProgressMeta ready={part.readyCount} total={part.sections.length} color={part.accent} /> : undefined}
        actions={<BookmarkButton page={{ href: part.href, title: `Part ${part.part}: ${part.shortTitle}`, kind: part.pillar.name, color: part.accent }} />}
      />

      {part.sections.length > 0 ? (
        <PageSection id="sections" title="Sections" icon={ListTree} color={part.accent} description={mode === 'cheat' ? 'Cheat Sheet mode: written sections show their key points.' : `${plural(part.sections.length, 'section')}, in reading order.`}>
          <StaggerGrid className="grid gap-3 md:grid-cols-2">
            {part.sections.map((s) => (
              <StaggerItem key={s.number}>
                <SectionCard section={s} cheat={mode === 'cheat'} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </PageSection>
      ) : (
        <PageSection id="planned" title="Planned coverage" icon={Construction} color={part.accent} description="This part is planned. Here is everything it will cover.">
          <OutlineTopics topics={part.topics} />
        </PageSection>
      )}
      <PrevNext prev={navTarget(prev) && { ...navTarget(prev)!, label: 'Previous part' }} next={navTarget(next) && { ...navTarget(next)!, label: 'Next part' }} />
    </PageContainer>
  )
}

function SectionCard({ section, cheat }: { section: SectionInfo; cheat: boolean }) {
  const page = section.pages[0]
  const topicLabels = section.topics.map((t) => t.label ?? t.text?.replace(/[.;]$/, '')).filter(Boolean).join(' · ')
  const description = page?.summary ?? section.summary ?? topicLabels
  return (
    <Link
      to={section.href}
      style={accent(section.accent)}
      className={cn(
        'group card flex h-full flex-col p-5 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent/50',
        !section.ready && 'bg-surface/60',
      )}
    >
      <div className="flex items-center gap-3">
        <span className={cn('rounded-lg px-2 py-1 font-mono text-xs font-semibold', section.ready ? 'bg-accent/15 text-accent-ink' : 'bg-fg/[0.05] text-muted')}>{section.number}</span>
        {section.ready ? (
          <Chip color={section.accent} size="xs" icon={CircleCheck}>
            {section.kind === 'guide' ? 'Written' : plural(section.entryCount, 'entry', 'entries')}
          </Chip>
        ) : (
          <Chip size="xs" icon={CircleDashed}>
            Planned
          </Chip>
        )}
        {section.kind !== 'guide' && <Icon name="layers" className="ml-auto size-4 text-faint" />}
      </div>
      <h3 className={cn('mt-3 font-display text-[17px] leading-snug font-semibold tracking-tight', section.ready ? 'text-fg' : 'text-fg/80')}>{page?.title ?? section.shortTitle}</h3>
      {cheat && page ? (
        <ul className="mt-2 space-y-1">
          {page.cheatSheet.map((c, i) => (
            <li key={i} className="flex gap-2 text-[13px] leading-snug text-fg/80">
              <span className="mt-[0.45em] size-1 shrink-0 rounded-full bg-accent" />
              {c.replace(/\[\[[^|\]]+\|?([^\]]*)\]\]/g, '$1')}
            </li>
          ))}
        </ul>
      ) : (
        description && <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted">{capitalize(description)}</p>
      )}
      {!page && section.topics.length > 0 && (
        <p className="mt-auto pt-3 text-xs text-faint">
          <Layers className="mr-1 inline size-3" aria-hidden />
          {plural(section.topics.length, 'subtopic')}
        </p>
      )}
    </Link>
  )
}

/** Shown for outline sections that do not have a written page yet. */
export function PlannedSectionView({ section }: { section: SectionInfo }) {
  const part = partByNumber.get(section.part)!
  const siblings = part.sections.filter((s) => s.number !== section.number)
  useRecordVisit({ href: section.href, title: section.shortTitle, kind: `Guide ${section.number} · Planned`, color: section.accent })
  return (
    <PageContainer color={section.accent} className="max-w-[60rem]">
      <PageHeader
        eyebrow={
          <>
            <Link to={part.href} className="hover:underline">
              Part {part.part} · {part.shortTitle}
            </Link>
            <span className="text-faint">·</span>
            <span>Section {section.number}</span>
          </>
        }
        title={section.shortTitle}
        summary={parenthetical(section.title, section.shortTitle)}
        color={section.accent}
        iconName={part.icon}
        actions={<BookmarkButton page={{ href: section.href, title: section.shortTitle, kind: `Guide ${section.number}`, color: section.accent }} />}
        meta={
          <Chip icon={CircleDashed} size="sm">
            Planned page
          </Chip>
        }
      />
      <div className="card relative overflow-hidden p-5 sm:p-6">
        <div className="absolute inset-y-0 left-0 w-1 bg-[repeating-linear-gradient(180deg,var(--accent)_0_8px,transparent_8px_14px)]" aria-hidden />
        <div className="flex gap-4 pl-2">
          <IconTile icon={Construction} color={section.accent} />
          <div>
            <h2 className="font-semibold text-fg">This page is on the roadmap</h2>
            <p className="mt-1 text-[15px] leading-relaxed text-muted">
              It will open with a Cheat Sheet, then go deep with explanations, technique cards, and links to related effects, instruments, and genres. Part {part.part} has {part.readyCount} of {part.sections.length} pages written so far.
            </p>
          </div>
        </div>
      </div>
      <PageSection id="coverage" title="What this page will cover" icon={BookOpenText} color={section.accent}>
        {section.summary || section.topics.length > 0 ? <OutlineTopics topics={section.topics} summary={section.summary} /> : <p className="text-muted">Details for this section are being planned.</p>}
      </PageSection>
      <PageSection id="part" title={`More in Part ${part.part}`} icon={ClipboardList} color={part.accent}>
        <ul className="card grid gap-x-6 p-3 sm:grid-cols-2">
          {siblings.map((s) => (
            <li key={s.number}>
              <SectionLink section={s} />
            </li>
          ))}
        </ul>
      </PageSection>
      <SectionPrevNext number={section.number} />
    </PageContainer>
  )
}

export function SectionPrevNext({ number }: { number: string }) {
  const { prev, next } = neighbors(number)
  const target = (s: SectionInfo | undefined, label: string) => s && { href: s.href, title: `${s.number} ${s.pages[0]?.title ?? s.shortTitle}`, color: s.accent, label }
  return <PrevNext prev={target(prev, 'Previous section')} next={target(next, 'Next section')} />
}
