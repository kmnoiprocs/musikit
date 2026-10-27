import { Activity, BookOpen, ClipboardList, Drum, Layers, MousePointerClick, Palette, Rows3, Sparkles, Type } from 'lucide-react'
import { BulletList, Paragraph, StepList } from '../components/content/Blocks'
import { Callout } from '../components/content/Callout'
import { EntryCard, GroupTile } from '../components/content/Cards'
import { CheatSheetCard } from '../components/content/CheatSheetCard'
import { DrumGrid } from '../components/content/DrumGrid'
import { FrequencyChart } from '../components/content/FrequencyChart'
import { ArrangementTimeline, BpmScale, LufsScale, ProgressionCard, TempoBadge } from '../components/content/Music'
import { PluginTierPanel } from '../components/content/PluginTierPanel'
import { RangeKeyboard } from '../components/content/RangeKeyboard'
import { RichText } from '../components/content/RichText'
import { DataTable, SettingsTable } from '../components/content/Tables'
import { TechniqueCard } from '../components/content/TechniqueCard'
import { PageHeader } from '../components/layout/PageHeader'
import { Button } from '../components/ui/Button'
import { Chip, PriceTag, RoleChip, SkillTag, StatusBadge } from '../components/ui/Chip'
import { Expandable } from '../components/ui/Expandable'
import { Kbd, ProgressBar } from '../components/ui/Misc'
import { Tabs } from '../components/ui/Tabs'
import { GENRE_FAMILIES } from '../content/registry/genreFamilies'
import { PILLARS } from '../content/registry/pillars'
import type { CalloutType, PriceTier, Role, SkillLevel, Status } from '../content/schema'
import { CALLOUTS, FREQUENCY_BANDS, MODE_COLORS, PRICE_TIERS, REC_TIERS, ROLES, SKILL_LEVELS, STATUS_COLORS } from '../design/tokens'
import { accent } from '../lib/cn'
import { effectsById, genresById, instrumentsById, library } from '../lib/content'
import { CalloutLegend, TrackColors } from './HubPages'
import { PageContainer, PageSection } from './shared'

const VIOLET = '#8B5CF6'

function Swatch({ color, label, sub }: { color: string; label: string; sub?: string }) {
  return (
    <div className="min-w-0">
      <div className="h-14 rounded-xl ring-1 ring-line ring-inset" style={{ background: color }} />
      <div className="mt-1.5 truncate text-[13px] font-medium text-fg">{label}</div>
      <div className="truncate font-mono text-[11px] text-muted">{sub ?? color}</div>
    </div>
  )
}

function Subhead({ children }: { children: string }) {
  return <h3 className="eyebrow mt-8 mb-3 text-muted first:mt-0">{children}</h3>
}

const SURFACES = [
  ['Background', 'var(--mk-bg)', 'bg'],
  ['Surface', 'var(--mk-surface)', 'surface'],
  ['Elevated', 'var(--mk-elevated)', 'elevated'],
  ['Border', 'var(--mk-border)', 'line'],
  ['Text', 'var(--mk-text)', 'fg'],
  ['Muted', 'var(--mk-muted)', 'muted'],
  ['Faint', 'var(--mk-faint)', 'faint'],
] as const

export default function DesignPage() {
  const compressor = effectsById.get('compressor')
  const trap = genresById.get('trap')
  const flute = instrumentsById.get('flute')
  const guide = library.guide[0]

  return (
    <PageContainer color={VIOLET}>
      <PageHeader
        eyebrow="Reference"
        title="Design System"
        color={VIOLET}
        icon={Palette}
        summary="The tokens and components MusiKit is built from, rendered live. Change a value in docs/DESIGN_SYSTEM.md first, then in code."
      />

      <PageSection id="color" title="Color" icon={Palette} color={VIOLET} description="Surfaces follow the theme. Accents are fixed, and color is navigation: every pillar, part, family, callout, and band keeps one color.">
        <Subhead>Surfaces and text (current theme)</Subhead>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {SURFACES.map(([label, value, token]) => (
            <Swatch key={label} color={value} label={label} sub={token} />
          ))}
        </div>
        <Subhead>Pillars and parts</Subhead>
        <div className="space-y-2">
          {PILLARS.map((p) => (
            <div key={p.id} className="flex items-center gap-3">
              <span className="w-44 shrink-0 truncate text-[13px] text-fg">{p.name}</span>
              <div className="flex flex-1 gap-1.5">
                {p.parts.map((x) => (
                  <div key={x.part} className="flex h-8 flex-1 items-center justify-center rounded-lg font-mono text-[11px] font-semibold text-black/70" style={{ background: x.accent }} title={`Part ${x.part}: ${x.accent}`}>
                    {x.part}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Subhead>Genre families</Subhead>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-8 lg:grid-cols-11">
          {GENRE_FAMILIES.map((f) => (
            <div key={f.id} title={f.name}>
              <div className="h-10 rounded-lg" style={{ background: f.color }} />
              <div className="mt-1 truncate text-[10px] text-muted">{f.name}</div>
            </div>
          ))}
        </div>
        <Subhead>Frequency bands</Subhead>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
          {FREQUENCY_BANDS.map((b) => (
            <Swatch key={b.id} color={b.color} label={b.name} />
          ))}
        </div>
        <Subhead>Callouts, tiers, and modes</Subhead>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-8">
          {(Object.keys(CALLOUTS) as CalloutType[]).map((k) => (
            <Swatch key={k} color={CALLOUTS[k].color} label={CALLOUTS[k].label} />
          ))}
          {(Object.keys(PRICE_TIERS) as PriceTier[]).map((k) => (
            <Swatch key={k} color={PRICE_TIERS[k].color} label={`Price: ${PRICE_TIERS[k].label}`} />
          ))}
          {Object.values(REC_TIERS).map((t) => (
            <Swatch key={t.label} color={t.color} label={t.label} />
          ))}
          {Object.entries(MODE_COLORS).map(([k, c]) => (
            <Swatch key={k} color={c} label={`Mode: ${k}`} />
          ))}
        </div>
        <Subhead>DAW track colors</Subhead>
        <TrackColors />
      </PageSection>

      <PageSection id="type" title="Typography" icon={Type} color={VIOLET} description="Space Grotesk for display, Inter for reading, JetBrains Mono for numbers and settings. Headings step on a 1.25 ratio.">
        <div className="card space-y-4 p-6">
          <div className="font-display text-display font-bold tracking-tight">Display</div>
          <div className="font-display text-h1 font-semibold tracking-tight">Heading 1 · Mixing Engineering</div>
          <div className="font-display text-h2 font-semibold tracking-tight">Heading 2 · Starting Settings</div>
          <div className="font-display text-h3 font-semibold tracking-tight">Heading 3 · Parallel Compression</div>
          <div className="font-display text-h4 font-semibold">Heading 4 · Attack and release</div>
          <Paragraph text="Body text uses Inter at 16 px with generous line height and a measure near 72 characters, so long explanations stay comfortable. It supports **bold**, *italics*, `inline code`, and cross-references like [[effect:compressor|a compressor]] or a glossary term such as [[glossary:gain-reduction]]." />
          <div className="flex flex-wrap gap-4 font-mono text-sm text-accent-ink">
            <span>4:1</span>
            <span>-14 LUFS</span>
            <span>10 ms</span>
            <span>140 BPM</span>
            <span>C4 · MIDI 60</span>
          </div>
        </div>
      </PageSection>

      <PageSection id="callouts" title="Callouts" icon={ClipboardList} color={VIOLET}>
        <CalloutLegend />
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {(Object.keys(CALLOUTS) as CalloutType[]).map((k) => (
            <Callout key={k} variant={k} title={`${CALLOUTS[k].label} callout`} body={`Used for ${CALLOUTS[k].label.toLowerCase()} content. Each type keeps one color and one icon everywhere in the app.`} />
          ))}
        </div>
      </PageSection>

      <PageSection id="tags" title="Tags and buttons" icon={Sparkles} color={VIOLET}>
        <div className="card space-y-5 p-5">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(SKILL_LEVELS) as SkillLevel[]).map((s) => (
              <SkillTag key={s} level={s} />
            ))}
            {(Object.keys(PRICE_TIERS) as PriceTier[]).map((t) => (
              <PriceTag key={t} tier={t} size="sm" />
            ))}
            {(Object.keys(STATUS_COLORS) as Status[]).map((s) => (
              <StatusBadge key={s} status={s} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(ROLES) as Role[]).map((r) => (
              <RoleChip key={r} role={r} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {GENRE_FAMILIES.slice(0, 6).map((f) => (
              <Chip key={f.id} color={f.color} dot>
                {f.name}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent" icon={Sparkles}>
              Accent
            </Button>
            <Button variant="ghost">Ghost</Button>
            <span className="ml-2 flex items-center gap-1 text-sm text-muted">
              <Kbd>Ctrl</Kbd>
              <Kbd>K</Kbd>
            </span>
            <ProgressBar value={7} total={19} color={VIOLET} className="w-40" />
          </div>
        </div>
      </PageSection>

      <PageSection id="cards" title="Cards" icon={Layers} color={VIOLET}>
        {guide && <CheatSheetCard items={guide.cheatSheet.length >= 4 ? guide.cheatSheet : [...guide.cheatSheet, 'Cheat Sheet bullets lead every page and stand on their own.', 'In Cheat Sheet mode, pages show only these and other essentials.']} />}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {compressor && <EntryCard href="/effects/compressor" title={compressor.name} eyebrow="Dynamics" summary={compressor.summary} color="#EF4444" icon="activity" footer={<Chip size="xs">{compressor.kind === 'group' ? 'Effect group' : 'Effect type'}</Chip>} />}
          {flute && <EntryCard href="/instruments/flute" title={flute.name} eyebrow="Flutes & Whistles" summary={flute.summary} color="#22C55E" icon="wind" footer={<Chip size="xs">C4–C7</Chip>} />}
          {trap && <EntryCard href="/genres/trap" title={trap.name} eyebrow="Hip-Hop & Rap" summary={trap.description} color="#F97316" icon="disc-3" footer={<Chip size="xs">130–170 BPM</Chip>} />}
          <GroupTile href="/genres/family/house" title="House" number="20.6" color="#06B6D4" count={0} noun={['genre', 'genres']} planned={13} />
        </div>
        {guide?.techniqueCards[0] && (
          <div className="mt-4">
            <TechniqueCard card={guide.techniqueCards[0]} index={0} defaultOpen />
          </div>
        )}
      </PageSection>

      <PageSection id="disclosure" title="Disclosure" icon={Rows3} color={VIOLET}>
        <div className="space-y-4">
          <Expandable title="Expandable section" summary="Click to reveal deeper detail" icon={BookOpen}>
            <BulletList items={['Expandables keep pages short and scannable.', 'They can nest other blocks, including tables and callouts.', 'Height animates on open and close, and respects reduced motion.']} />
          </Expandable>
          <div className="card p-5">
            <Tabs
              label="Example tabs"
              items={[
                { value: 'a', label: 'Lead vocal', content: <SettingsTable rows={[{ param: 'Ratio', value: '3:1 to 4:1' }, { param: 'Attack', value: '5 to 15 ms' }, { param: 'Release', value: '50 to 100 ms', note: 'Starting points, not rules.' }]} /> },
                { value: 'b', label: 'Drum bus', content: <SettingsTable rows={[{ param: 'Ratio', value: '2:1 to 4:1' }, { param: 'Attack', value: '10 to 30 ms' }]} /> },
                { value: 'c', label: 'Steps', content: <StepList items={[{ title: 'Send the drum bus to an aux', body: 'Keep the original untouched.' }, { title: 'Compress the aux hard' }, { title: 'Blend it underneath' }]} /> },
              ]}
            />
          </div>
        </div>
      </PageSection>

      <PageSection id="data" title="Data displays" icon={Activity} color={VIOLET}>
        <Subhead>Frequency chart</Subhead>
        <div className="card p-5">
          <FrequencyChart overlays={flute ? [{ label: 'Fundamental', lo: flute.frequencyProfile.fundamentalHz[0], hi: flute.frequencyProfile.fundamentalHz[1], color: '#22C55E' }] : []} />
        </div>
        {flute && (
          <>
            <Subhead>Instrument range keyboard</Subhead>
            <RangeKeyboard low={flute.range.midiLow} high={flute.range.midiHigh} color="#22C55E" />
          </>
        )}
        {trap?.drums.grid && (
          <>
            <Subhead>Drum grid</Subhead>
            <DrumGrid steps={trap.drums.grid.steps} lanes={trap.drums.grid.lanes} />
          </>
        )}
        {trap && (
          <>
            <Subhead>Tempo, progressions, arrangement, loudness (the loudness range is a display sample)</Subhead>
            <div className="mb-3">
              <TempoBadge tempo={trap.tempo} color="#F97316" />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="card p-5">
                <BpmScale tempo={trap.tempo} color="#F97316" />
              </div>
              <div className="card p-5">
                <LufsScale range={[-10, -7]} color="#F97316" />
              </div>
              <ProgressionCard p={trap.progressions[0]} />
              <ProgressionCard p={{ numerals: 'I - V - vi - IV', mode: 'major', exampleKey: 'C major', exampleChords: 'C - G - Am - F', usage: 'Shown here for the major-mode color.' }} />
            </div>
            <div className="card mt-3 p-5">
              <ArrangementTimeline arrangement={trap.arrangement} />
            </div>
          </>
        )}
        <Subhead>Tables</Subhead>
        <DataTable columns={['Source', 'Ratio', 'Attack', 'Release']} rows={[['Lead vocal', '3:1 to 4:1', '5 to 15 ms', '50 to 100 ms'], ['Drum bus', '2:1 to 4:1', '10 to 30 ms', 'Timed to tempo']]} caption="Table blocks use the mono face for values." />
        {compressor && (
          <>
            <Subhead>Plugin tier panel</Subhead>
            <PluginTierPanel recs={compressor.pluginRecs} />
          </>
        )}
      </PageSection>

      <PageSection id="motion" title="Motion" icon={MousePointerClick} color={VIOLET} description="Motion explains a change; it is never decoration. With reduced motion turned on in your system settings, movement becomes instant.">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ['Page transitions', 'A short fade-and-rise on every navigation.'],
            ['Lists', 'Grid items stagger in about 30 ms apart when you filter.'],
            ['Disclosure', 'Expandables, tabs, and the mode toggle animate with springs.'],
          ].map(([t, b]) => (
            <div key={t} className="card p-5" style={accent(VIOLET)}>
              <div className="font-semibold text-fg">{t}</div>
              <p className="mt-1 text-sm text-muted">
                <RichText text={b} />
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 flex items-center gap-2 text-xs text-faint">
          <Drum className="size-3.5" aria-hidden /> Audio never autoplays.
        </p>
      </PageSection>
    </PageContainer>
  )
}
