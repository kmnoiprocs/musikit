import { AudioWaveform, Disc3, Globe, Guitar, Hand, Lightbulb, Music, Piano, ShoppingBag, Sparkles, Star, TriangleAlert, Users } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { GroupTile, StaggerGrid, StaggerItem } from '../components/content/Cards'
import { BulletList, Paragraph } from '../components/content/Blocks'
import { CheatSheetCard } from '../components/content/CheatSheetCard'
import { FrequencyChart, type FrequencyOverlay } from '../components/content/FrequencyChart'
import { PluginTierPanel } from '../components/content/PluginTierPanel'
import { RangeKeyboard } from '../components/content/RangeKeyboard'
import { RichText } from '../components/content/RichText'
import { DetailLayout } from '../components/layout/DetailLayout'
import { BookmarkButton } from '../components/layout/PageActions'
import { PageHeader } from '../components/layout/PageHeader'
import { Chip } from '../components/ui/Chip'
import { Tabs, type TabItem } from '../components/ui/Tabs'
import type { Instrument } from '../content/schema'
import { FREQUENCY_BANDS } from '../design/tokens'
import { accent } from '../lib/cn'
import { COLORS, instrumentFamilies, instrumentFamilyById, instrumentsById, library, refForInstrument, resolveRef } from '../lib/content'
import { HS_CLASS_LABELS, POLYPHONY_LABELS } from '../lib/labels'
import { useRecordVisit } from '../lib/prefs'
import { commonSections, entryMeta } from './entryParts'
import NotFoundPage from './NotFoundPage'
import { EntryGrid, GroupPage, PageContainer, PageSection, type CardItem } from './shared'

const C = COLORS.instruments
const band = (id: string) => FREQUENCY_BANDS.find((b) => b.id === id)?.color

const instrumentCard = (i: Instrument): CardItem => {
  const fam = instrumentFamilyById.get(i.family)
  return {
    key: i.id,
    href: `/instruments/${i.id}`,
    title: i.name,
    eyebrow: fam?.name,
    summary: i.summary,
    color: C,
    icon: fam?.icon ?? 'guitar',
    group: i.family,
    searchText: i.aliases.join(' '),
    footer: (
      <>
        <Chip size="xs">
          {i.range.lowest}–{i.range.highest}
        </Chip>
        <Chip size="xs">{POLYPHONY_LABELS[i.polyphony.type]}</Chip>
      </>
    ),
  }
}

export function InstrumentsIndex() {
  return (
    <PageContainer color={C}>
      <PageHeader
        eyebrow="Encyclopedia · Part 19"
        title="Instruments"
        color={C}
        icon={Guitar}
        summary="From grand pianos to the kora: where each instrument comes from, its range and frequency profile, how it is played, and how to make the virtual version sound real."
      />
      <PageSection id="families" title="Families" icon={Sparkles} color={C}>
        <StaggerGrid className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {instrumentFamilies.map((f) => (
            <StaggerItem key={f.id}>
              <GroupTile href={f.href} title={f.name} number={f.section} color={C} icon={f.icon} count={f.entries.length} noun={['entry', 'entries']} planned={f.outline?.topics.length} />
            </StaggerItem>
          ))}
        </StaggerGrid>
        <Link to="/guide/19.0" className="card mt-3 flex items-center gap-3 px-4 py-3 text-sm text-muted transition-colors hover:text-fg">
          <Lightbulb className="size-4 text-accent-ink" aria-hidden />
          <span className="font-mono text-xs">19.0</span>
          <span>Virtual-instrument realism masterclass</span>
        </Link>
      </PageSection>
      <PageSection id="all" title="All instruments" icon={Music} color={C}>
        <EntryGrid
          items={library.instruments.map(instrumentCard)}
          noun={['instrument', 'instruments']}
          groups={instrumentFamilies.map((f) => ({ id: f.id, label: f.name }))}
          emptyIcon={Guitar}
          emptyTitle="No instruments yet"
          emptyText="Instrument entries arrive in the content batches."
          color={C}
        />
      </PageSection>
    </PageContainer>
  )
}

export function InstrumentFamilyPage() {
  const { familyId = '' } = useParams()
  const i = instrumentFamilies.findIndex((f) => f.id === familyId)
  const fam = instrumentFamilies[i]
  if (!fam) return <NotFoundPage />
  const prev = instrumentFamilies[i - 1]
  const next = instrumentFamilies[i + 1]
  return (
    <GroupPage
      key={fam.id}
      title={fam.name}
      eyebrow={<Link to="/instruments" className="hover:underline">Instruments · {fam.section}</Link>}
      color={C}
      icon={fam.icon}
      outline={fam.outline}
      items={fam.entries.map(instrumentCard)}
      noun={['instrument', 'instruments']}
      emptyText={`Entries for ${fam.name.toLowerCase()} are planned. The coverage below shows what is coming.`}
      prev={prev && { href: prev.href, title: prev.name, color: C }}
      next={next && { href: next.href, title: next.name, color: C }}
      label="family"
    />
  )
}

export function InstrumentPage() {
  const { id = '' } = useParams()
  const inst = instrumentsById.get(id)
  const ref = inst && refForInstrument(inst)
  const saved = inst && ref && { href: ref.href, title: inst.name, kind: `Instrument · ${ref.kindLabel}`, color: C }
  useRecordVisit(saved)
  if (!inst || !ref || !saved) return <NotFoundPage />
  const fam = instrumentFamilyById.get(inst.family)
  const fp = inst.frequencyProfile
  const overlays: FrequencyOverlay[] = [
    { label: 'Fundamental', lo: fp.fundamentalHz[0], hi: fp.fundamentalHz[1], color: C },
    ...(fp.bodyHz ? [{ label: 'Body', lo: fp.bodyHz[0], hi: fp.bodyHz[1], color: band('low-mids') }] : []),
    ...(fp.presenceHz ? [{ label: 'Presence', lo: fp.presenceHz[0], hi: fp.presenceHz[1], color: band('presence') }] : []),
    ...(fp.airHz ? [{ label: 'Air', lo: fp.airHz[0], hi: fp.airHz[1], color: band('air') }] : []),
  ]
  const tipTabs: TabItem[] = (
    [
      ['realism', 'Realism', inst.realismTips],
      ['writing', 'Writing', inst.writingTips],
      ['recording', 'Recording', inst.recordingTips],
      ['mixing', 'Mixing', inst.mixingTips],
    ] as const
  )
    .filter(([, , tips]) => tips.length > 0)
    .map(([value, label, tips]) => ({ value, label: `${label} (${tips.length})`, content: <BulletList items={[...tips]} /> }))

  return (
    <DetailLayout
      key={inst.id}
      color={C}
      header={
        <PageHeader
          eyebrow={
            <Link to={`/instruments/family/${inst.family}`} className="hover:underline">
              Instrument · {fam?.name}
            </Link>
          }
          title={inst.name}
          aliases={inst.aliases}
          summary={inst.summary}
          color={C}
          iconName={fam?.icon}
          meta={
            <>
              <Chip color={C} title="Hornbostel–Sachs classification">
                {HS_CLASS_LABELS[inst.hornbostelSachs.class]}
                {inst.hornbostelSachs.number ? ` · ${inst.hornbostelSachs.number}` : ''}
              </Chip>
              <Chip color={C}>{POLYPHONY_LABELS[inst.polyphony.type]}</Chip>
              {entryMeta(inst)}
            </>
          }
          actions={<BookmarkButton page={saved} />}
        />
      }
      cheatSheet={<CheatSheetCard items={inst.cheatSheet} />}
      sections={[
        {
          id: 'range',
          title: 'Range',
          icon: Piano,
          cheat: true,
          content: (
            <div className="space-y-3">
              <RangeKeyboard low={inst.range.midiLow} high={inst.range.midiHigh} color={C} />
              <div className="flex flex-wrap gap-2">
                {inst.range.sweetSpot && <Chip color={C} icon={Star}>Sweet spot {inst.range.sweetSpot}</Chip>}
                {inst.range.transposition && <Chip icon={TriangleAlert}>{inst.range.transposition}</Chip>}
                {inst.tunings.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>
          ),
        },
        {
          id: 'frequency',
          title: 'Frequency Profile',
          icon: AudioWaveform,
          cheat: true,
          content: (
            <div className="space-y-4">
              <div className="card p-5">
                <FrequencyChart overlays={overlays} compact />
              </div>
              {fp.maskingConflicts.length > 0 && (
                <div>
                  <div className="eyebrow mb-2 text-muted">Watch for masking with</div>
                  <BulletList items={fp.maskingConflicts} />
                </div>
              )}
            </div>
          ),
        },
        {
          id: 'sound',
          title: 'Sound & Timbre',
          icon: Music,
          content: (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {inst.timbre.map((t) => (
                  <Chip key={t} color={C}>
                    {t}
                  </Chip>
                ))}
              </div>
              <Paragraph text={inst.soundProduction} />
              <div className="card flex gap-3 p-4" style={accent(C)}>
                <Users className="mt-0.5 size-5 shrink-0 text-accent-ink" aria-hidden />
                <div>
                  <div className="font-semibold text-fg">
                    {POLYPHONY_LABELS[inst.polyphony.type]}
                    {inst.polyphony.maxVoices ? ` · up to ${inst.polyphony.maxVoices} voices` : ''}
                  </div>
                  <p className="mt-0.5 text-[15px] text-fg/80">
                    <RichText text={inst.polyphony.note} />
                  </p>
                </div>
              </div>
            </div>
          ),
        },
        {
          id: 'origin',
          title: 'Origin & History',
          icon: Globe,
          content: (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Chip icon={Globe}>{inst.origin.region}</Chip>
                <Chip>{inst.origin.era}</Chip>
              </div>
              <Paragraph text={inst.origin.history} />
            </div>
          ),
        },
        {
          id: 'playing',
          title: 'Playing It',
          icon: Hand,
          content: (inst.articulations.length > 0 || inst.physicalLimits.length > 0) && (
            <div className="space-y-5">
              {inst.articulations.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {inst.articulations.map((a) => (
                    <div key={a.name} className="card p-4">
                      <div className="font-semibold text-fg">{a.name}</div>
                      <p className="mt-1 text-sm text-fg/75">
                        <RichText text={a.description} />
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {inst.physicalLimits.length > 0 && (
                <div>
                  <div className="eyebrow mb-2 text-muted">Physical limits to respect</div>
                  <BulletList items={inst.physicalLimits} />
                </div>
              )}
            </div>
          ),
        },
        {
          id: 'scales',
          title: 'Scales',
          icon: Music,
          content: inst.scales.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {inst.scales.map((s) => (
                <Chip key={s.name} color={C} title={s.note}>
                  {s.name}
                </Chip>
              ))}
            </div>
          ),
        },
        {
          id: 'genres',
          title: 'In Genres',
          icon: Disc3,
          content: inst.genreUsage.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {inst.genreUsage.map((g) => {
                const r = resolveRef(g.genre)
                return (
                  <div key={g.genre} style={accent(r?.color ?? C)} className="card p-4">
                    {r ? (
                      <Link to={r.href} className="font-semibold text-accent-ink hover:underline">
                        {r.title}
                      </Link>
                    ) : (
                      <span className="font-semibold">{g.genre}</span>
                    )}
                    <p className="mt-1 text-sm text-fg/80">
                      <RichText text={g.role} />
                    </p>
                    {g.exampleSongs.length > 0 && (
                      <ul className="mt-2 space-y-0.5 text-xs text-muted">
                        {g.exampleSongs.map((s) => (
                          <li key={s}>♪ {s}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
          ),
        },
        { id: 'production-tips', title: 'Production Tips', icon: Lightbulb, cheat: true, content: tipTabs.length > 0 && <Tabs items={tipTabs} label="Production tips" /> },
        {
          id: 'players',
          title: 'Notable Players',
          icon: Star,
          content: inst.notablePlayers.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {inst.notablePlayers.map((p) => (
                <Chip key={p}>{p}</Chip>
              ))}
            </div>
          ),
        },
        { id: 'plugins', title: 'Plugins', icon: Sparkles, cheat: true, content: <PluginTierPanel recs={inst.pluginRecs} /> },
        { id: 'buying', title: 'Buying Tips', icon: ShoppingBag, content: inst.buyingTips.length > 0 && <BulletList items={inst.buyingTips} /> },
        ...commonSections(inst, ref.ref),
      ]}
    />
  )
}
