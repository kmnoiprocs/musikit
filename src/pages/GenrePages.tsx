import { AudioWaveform, BookOpen, Disc3, Drum, Gauge, GitBranch, History, LayoutList, ListOrdered, Mic, Music, Music2, Sparkles, SlidersVertical, Users } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { GroupTile, StaggerGrid, StaggerItem } from '../components/content/Cards'
import { BulletList, Paragraph, StepList } from '../components/content/Blocks'
import { Callout } from '../components/content/Callout'
import { CheatSheetCard } from '../components/content/CheatSheetCard'
import { DrumGrid } from '../components/content/DrumGrid'
import { ArrangementTimeline, BpmScale, KeyMoments, LufsScale, ProgressionCard, TempoBadge } from '../components/content/Music'
import { PluginTierPanel } from '../components/content/PluginTierPanel'
import { RefChips } from '../components/content/Refs'
import { DetailLayout } from '../components/layout/DetailLayout'
import { BookmarkButton } from '../components/layout/PageActions'
import { PageHeader } from '../components/layout/PageHeader'
import { Chip } from '../components/ui/Chip'
import type { Genre } from '../content/schema'
import { accent, cn } from '../lib/cn'
import { COLORS, genreColor, genreFamilies, genreFamilyById, genresById, library, refForGenre, resolveRefs } from '../lib/content'
import { FEEL_LABELS } from '../lib/labels'
import { useRecordVisit } from '../lib/prefs'
import { commonSections, entryMeta } from './entryParts'
import NotFoundPage from './NotFoundPage'
import { EntryGrid, GroupPage, PageContainer, PageSection, type CardItem } from './shared'

const genreCard = (g: Genre): CardItem => ({
  key: g.id,
  href: `/genres/${g.id}`,
  title: g.name,
  eyebrow: genreFamilyById.get(g.family)?.name,
  summary: g.description,
  color: genreColor(g),
  icon: 'disc-3',
  group: g.family,
  searchText: [...g.aliases, ...g.soundsLike].join(' '),
  footer: (
    <>
      <Chip size="xs" color={genreColor(g)}>
        {g.tempo.min}–{g.tempo.max} BPM
      </Chip>
      <Chip size="xs">{FEEL_LABELS[g.tempo.feel]}</Chip>
    </>
  ),
})

export function GenresIndex() {
  return (
    <PageContainer color={COLORS.genres}>
      <PageHeader
        eyebrow="Encyclopedia · Part 20"
        title="Genres"
        color={COLORS.genres}
        icon={Disc3}
        summary="Every genre and sub-genre still made today, sorted into 31 color-coded families. Each entry gives you the BPM, progressions, drum patterns, arrangement, mix targets, and a step-by-step recipe."
      />
      <PageSection id="families" title="Families" icon={Sparkles} color={COLORS.genres} description="Each family has its own color, used on every genre page inside it.">
        <StaggerGrid className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {genreFamilies.map((f) => (
            <StaggerItem key={f.id}>
              <GroupTile href={f.href} title={f.name} number={f.section} color={f.color} count={f.entries.length} noun={['genre', 'genres']} planned={f.outline?.topics.length} />
            </StaggerItem>
          ))}
        </StaggerGrid>
        <Link to="/guide/20.0" className="card mt-3 flex items-center gap-3 px-4 py-3 text-sm text-muted transition-colors hover:text-fg">
          <GitBranch className="size-4 text-accent-ink" aria-hidden />
          <span className="font-mono text-xs">20.0</span>
          <span>How genres work: families, fusions, microgenres, and scenes</span>
        </Link>
      </PageSection>
      <PageSection id="all" title="All genres" icon={Music} color={COLORS.genres}>
        <EntryGrid
          items={library.genres.map(genreCard)}
          noun={['genre', 'genres']}
          groups={genreFamilies.map((f) => ({ id: f.id, label: f.name, color: f.color }))}
          emptyIcon={Disc3}
          emptyTitle="No genres yet"
          emptyText="Genre entries arrive in the content batches."
          color={COLORS.genres}
        />
      </PageSection>
    </PageContainer>
  )
}

export function GenreFamilyPage() {
  const { familyId = '' } = useParams()
  const i = genreFamilies.findIndex((f) => f.id === familyId)
  const fam = genreFamilies[i]
  if (!fam) return <NotFoundPage />
  const prev = genreFamilies[i - 1]
  const next = genreFamilies[i + 1]
  return (
    <GroupPage
      key={fam.id}
      title={fam.name}
      eyebrow={<Link to="/genres" className="hover:underline">Genres · {fam.section}</Link>}
      color={fam.color}
      icon="disc-3"
      outline={fam.outline}
      items={fam.entries.map(genreCard)}
      noun={['genre', 'genres']}
      emptyText={`The ${fam.name} entries are planned. The coverage below lists every style that is coming.`}
      prev={prev && { href: prev.href, title: prev.name, color: prev.color }}
      next={next && { href: next.href, title: next.name, color: next.color }}
      label="family"
    />
  )
}

function ChipGroup({ label, items, color }: { label: string; items: string[]; color?: string }) {
  if (items.length === 0) return null
  return (
    <div>
      <div className="eyebrow mb-2 text-muted">{label}</div>
      <div className="flex flex-wrap gap-2">
        {items.map((i) => (
          <Chip key={i} color={color}>
            {i}
          </Chip>
        ))}
      </div>
    </div>
  )
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="card px-4 py-3">
      <div className="eyebrow text-muted">{label}</div>
      <div className="mt-1 text-[15px] text-fg">{children}</div>
    </div>
  )
}

export function GenrePage() {
  const { id = '' } = useParams()
  const genre = genresById.get(id)
  const ref = genre && refForGenre(genre)
  const saved = genre && ref && { href: ref.href, title: genre.name, kind: `Genre · ${ref.kindLabel}`, color: ref.color }
  useRecordVisit(saved)
  if (!genre || !ref || !saved) return <NotFoundPage />
  const color = genreColor(genre)
  const fam = genreFamilyById.get(genre.family)
  const parent = genre.parent ? genresById.get(genre.parent) : undefined
  const children = library.genres.filter((g) => g.parent === genre.id)
  const instruments = resolveRefs(genre.instrumentation.instrumentRefs)
  const artistCols = (
    [
      ['Pioneers', genre.artists.pioneers],
      ['Classic', genre.artists.classic],
      ['Modern', genre.artists.modern],
      ['Rising', genre.artists.rising],
    ] as const
  ).filter(([, list]) => list.length > 0)

  return (
    <DetailLayout
      key={genre.id}
      color={color}
      header={
        <PageHeader
          eyebrow={
            <Link to={`/genres/family/${genre.family}`} className="hover:underline">
              Genre · {fam?.name}
            </Link>
          }
          title={genre.name}
          aliases={genre.aliases}
          summary={genre.description}
          color={color}
          icon={Disc3}
          meta={
            <>
              <TempoBadge tempo={genre.tempo} color={color} />
              {parent && (
                <Chip href={`/genres/${parent.id}`} color={genreColor(parent)} icon={GitBranch}>
                  Sub-genre of {parent.name}
                </Chip>
              )}
              {entryMeta(genre)}
            </>
          }
          actions={<BookmarkButton page={saved} />}
        />
      }
      cheatSheet={<CheatSheetCard items={genre.cheatSheet} />}
      sections={[
        {
          id: 'sound',
          title: 'The Sound',
          icon: AudioWaveform,
          cheat: true,
          content: <ChipGroup label="Sounds like" items={genre.soundsLike} color={color} />,
        },
        {
          id: 'tempo',
          title: 'Tempo & Feel',
          icon: Gauge,
          cheat: true,
          content: (
            <div className="grid gap-3 md:grid-cols-[1fr_auto]">
              <div className="card p-5">
                <BpmScale tempo={genre.tempo} color={color} />
              </div>
              <div className="grid grid-cols-2 gap-3 md:w-56 md:grid-cols-1">
                <Fact label="Feel">{FEEL_LABELS[genre.tempo.feel]}</Fact>
                <Fact label="Time signatures">
                  <span className="font-mono">{genre.tempo.timeSignatures.join(', ')}</span>
                </Fact>
              </div>
            </div>
          ),
        },
        {
          id: 'harmony',
          title: 'Keys & Progressions',
          icon: Music2,
          cheat: true,
          content: (
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <ChipGroup label="Scales and modes" items={genre.keys.scalesModes} color={color} />
                <ChipGroup label="Common keys" items={genre.keys.common} />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {genre.progressions.map((p, i) => (
                  <ProgressionCard key={i} p={p} />
                ))}
              </div>
              {genre.melodyTraits.length > 0 && (
                <div>
                  <div className="eyebrow mb-2 text-muted">Melody traits</div>
                  <BulletList items={genre.melodyTraits} />
                </div>
              )}
            </div>
          ),
        },
        {
          id: 'drums',
          title: 'Drums & Groove',
          icon: Drum,
          cheat: true,
          content: (
            <div className="space-y-4">
              <Paragraph text={genre.drums.description} />
              {genre.drums.grid && <DrumGrid steps={genre.drums.grid.steps} lanes={genre.drums.grid.lanes} swingPercent={genre.drums.swingPercent} />}
            </div>
          ),
        },
        { id: 'bass', title: 'Bass', icon: AudioWaveform, content: <Paragraph text={genre.bassApproach} /> },
        {
          id: 'instrumentation',
          title: 'Instrumentation & Sound Design',
          icon: SlidersVertical,
          content: (
            <div className="space-y-5">
              <ChipGroup label="Core" items={genre.instrumentation.core} color={color} />
              <ChipGroup label="Optional" items={genre.instrumentation.optional} />
              <ChipGroup label="Signature sounds" items={genre.instrumentation.signatureSounds} color={color} />
              {instruments.length > 0 && (
                <div>
                  <div className="eyebrow mb-2 text-muted">Instrument entries</div>
                  <RefChips refs={instruments} />
                </div>
              )}
              {genre.soundDesign.length > 0 && (
                <div>
                  <div className="eyebrow mb-2 text-muted">Sound design</div>
                  <BulletList items={genre.soundDesign} />
                </div>
              )}
            </div>
          ),
        },
        {
          id: 'vocals',
          title: 'Vocals',
          icon: Mic,
          content: (
            <div className="space-y-4">
              <Paragraph text={genre.vocals.style} />
              {genre.vocals.delivery && <Paragraph text={genre.vocals.delivery} />}
              <div className="grid gap-4 sm:grid-cols-2">
                <ChipGroup label="Processing" items={genre.vocals.processing} />
                <ChipGroup label="Lyric themes" items={genre.vocals.lyricThemes} />
              </div>
            </div>
          ),
        },
        { id: 'arrangement', title: 'Arrangement', icon: LayoutList, cheat: true, content: <ArrangementTimeline arrangement={genre.arrangement} /> },
        {
          id: 'mix',
          title: 'Mix & Master',
          icon: SlidersVertical,
          cheat: true,
          content: (
            <div className="space-y-4">
              <Paragraph text={genre.mix.aesthetic} />
              {genre.mix.priorities.length > 0 && <BulletList items={genre.mix.priorities} numbered />}
              {genre.master.integratedLufs && (
                <div className="card p-5">
                  <div className="eyebrow mb-2 text-muted">Typical master loudness</div>
                  <LufsScale range={genre.master.integratedLufs} color={color} />
                </div>
              )}
              {genre.master.notes && <Callout variant="pro" title="Mastering" body={genre.master.notes} />}
            </div>
          ),
        },
        {
          id: 'recipe',
          title: genre.recipe.length >= 8 ? `Make It in ${genre.recipe.length} Steps` : 'Make It',
          icon: ListOrdered,
          cheat: true,
          content: (
            <div className="card p-5 sm:p-6">
              <StepList items={genre.recipe.map((r) => ({ title: r }))} />
            </div>
          ),
        },
        {
          id: 'authenticity',
          title: 'Authenticity & Mistakes',
          icon: Sparkles,
          content: (genre.authenticityTips.length > 0 || genre.mistakes.length > 0) && (
            <div className="space-y-3">
              {genre.authenticityTips.map((t, i) => (
                <Callout key={`t${i}`} variant="tip" body={t} />
              ))}
              {genre.mistakes.map((m, i) => (
                <Callout key={`m${i}`} variant="mistake" body={m} />
              ))}
            </div>
          ),
        },
        {
          id: 'plugins',
          title: 'Plugins & Sounds',
          icon: Sparkles,
          cheat: true,
          content: (
            <div className="space-y-4">
              <PluginTierPanel recs={genre.pluginRecs} />
              <ChipGroup label="Sample pack types" items={genre.samplePackTypes} />
            </div>
          ),
        },
        {
          id: 'history',
          title: 'History',
          icon: History,
          content: (
            <div className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <Fact label="Era">{genre.history.era}</Fact>
                <Fact label="Place">{genre.history.place}</Fact>
              </div>
              <Paragraph text={genre.history.origins} />
              {genre.history.keyMoments.length > 0 && <KeyMoments moments={genre.history.keyMoments} color={color} />}
              <Paragraph text={genre.history.evolution} />
              <Paragraph text={genre.history.today} />
            </div>
          ),
        },
        {
          id: 'artists',
          title: 'Artists',
          icon: Users,
          content: artistCols.length > 0 && (
            <div className={cn('grid gap-3', artistCols.length > 1 && 'sm:grid-cols-2', artistCols.length > 2 && 'lg:grid-cols-4')}>
              {artistCols.map(([label, list]) => (
                <div key={label} className="card p-4">
                  <div className="eyebrow mb-2 text-accent-ink">{label}</div>
                  <ul className="space-y-1">
                    {list.map((a) => (
                      <li key={a} className="text-sm text-fg/85">
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ),
        },
        {
          id: 'listening',
          title: 'Essential Listening',
          icon: BookOpen,
          content: (
            <ol className="card divide-y divide-line">
              {genre.essentialListening.map((l, i) => (
                <li key={i} className="flex items-center gap-4 px-4 py-3" style={accent(color)}>
                  <span className="w-6 font-mono text-xs text-faint">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/14 text-accent-ink">{l.type === 'album' ? <Disc3 className="size-4" /> : <Music className="size-4" />}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-fg">{l.title}</span>
                    <span className="block truncate text-sm text-muted">{l.artist}</span>
                  </span>
                  {l.year && <span className="font-mono text-sm text-muted">{l.year}</span>}
                  <Chip size="xs">{l.type === 'album' ? 'Album' : 'Song'}</Chip>
                </li>
              ))}
            </ol>
          ),
        },
        {
          id: 'connections',
          title: 'Fusions & Variants',
          icon: GitBranch,
          content: (genre.fusions.length > 0 || genre.regionalVariants.length > 0 || children.length > 0) && (
            <div className="space-y-4">
              {children.length > 0 && (
                <div>
                  <div className="eyebrow mb-2 text-muted">Sub-genres</div>
                  <div className="flex flex-wrap gap-2">
                    {children.map((c) => (
                      <Chip key={c.id} href={`/genres/${c.id}`} color={genreColor(c)}>
                        {c.name}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}
              <ChipGroup label="Fusions" items={genre.fusions} />
              <ChipGroup label="Regional variants" items={genre.regionalVariants} />
            </div>
          ),
        },
        ...commonSections(genre, ref.ref),
      ]}
    />
  )
}
