# MusiKit Design System

The visual rules for MusiKit. Change a value here first, then in code. Every token is rendered live on the app's `/design` page.

**Where tokens live in code:**

- Surfaces, text, fonts, the type scale, and animations: `src/index.css` (Tailwind `@theme`).
- Pillar and part accents: `src/content/registry/pillars.ts`. Genre family colors: `src/content/registry/genreFamilies.ts`.
- Everything else (callouts, frequency bands, tags, tiers, track colors, drum lanes, arrangement sections): `src/design/tokens.ts`.

**The accent system:** any element can set `--accent` (in React, `style={accent(color)}`). Inside it, `bg-accent/15`, `border-accent/30`, and `text-accent-ink` tint the subtree. `accent-ink` mixes the accent toward white in the dark theme and toward black in the light theme, so accent text stays readable on either surface.

## Principles

1. **Dark-first studio feel.** Deep near-black surfaces with saturated accents, like a well-lit studio at night. Light mode is supported, but dark is the default.
2. **Color is navigation.** Every pillar, part, genre family, callout type, and frequency band has one fixed color, so readers learn where they are at a glance.
3. **Progressive disclosure.** Every page opens with its Cheat Sheet card; detail lives in expandable sections and technique cards. Never show a wall of text.
4. **Motion with meaning.** Animate to explain a change (expanding, filtering, navigating), never as decoration. Respect `prefers-reduced-motion`.
5. **Accessible by default.** WCAG AA contrast, full keyboard support, visible focus rings, and correct ARIA on every interactive element.

## Surfaces and text (dark theme)

- Background: `#0B0B12`
- Surface (cards): `#12121C`
- Elevated surface (popovers, expanded cards): `#1A1A28`
- Border: `#27273A`
- Text: `#E5E7EB`
- Muted text: `#A1A1AA`
- Faint text and dividers: `#52525B`

## Surfaces and text (light theme)

- Background: `#F6F6F9`
- Surface and elevated surface: `#FFFFFF`
- Border: `#E3E3EA`
- Text: `#15151C`
- Muted text: `#585863`
- Faint text and dividers: `#A1A1AA`

## Pillar and part accents

The canonical values are mirrored in `src/content/registry/pillars.ts`.

- **Start Here:** `#A1A1AA` (Part 0)
- **Foundations:** `#94A3B8` (Part 1)
- **Theory and Ear Training:** Theory `#8B5CF6`, Ear Training `#6366F1`
- **Writing and Performance:** Songwriting `#F43F5E`, Lyricism `#EC4899`, Rap `#D946EF`, Singing `#FB7185`
- **Production:** Beatmaking `#F97316`, Drums `#F59E0B`, Sound Design `#EAB308`, Arrangement `#FB923C`, Media `#FBBF24`
- **Engineering:** Recording `#0EA5E9`, Editing `#3B82F6`, Mixing `#06B6D4`, Mastering `#14B8A6`, Immersive `#38BDF8`
- **Effects Encyclopedia:** `#EF4444`
- **Instrument Encyclopedia:** `#22C55E`
- **Genre Encyclopedia:** `#A855F7` as the pillar color. Genre pages use their family color instead (31 colors, canonical in `src/content/registry/genreFamilies.ts`).
- **Tools and Workflow:** Plugins `#84CC16`, Workflow `#A3E635`, Live `#65A30D`
- **Business and Career:** `#10B981`, with a gold highlight `#F5C542` for money-related callouts
- **Health and Mindset:** `#5EEAD4`
- **Producer Profiles:** `#C084FC`
- **Quick Reference:** `#E5E7EB`
- **Interactive Tools:** `#818CF8`

When an accent is used as text on a dark surface, use a lighter tint where needed to keep 4.5:1 contrast.

## Callout types

Each callout type has a fixed color and a Lucide icon.

- **Tip:** emerald `#10B981`, `lightbulb`
- **Pro Technique:** sky `#0EA5E9`, `award`
- **Unorthodox Trick:** violet `#8B5CF6`, `flask-conical`
- **Common Mistake:** red `#EF4444`, `circle-x`
- **Myth-Buster:** amber `#F59E0B`, `shield-question`
- **Free Alternative:** teal `#14B8A6`, `gift`
- **Cheat Sheet:** yellow `#EAB308`, `clipboard-list`
- **Warning (legal or health):** orange `#F97316`, `octagon-alert`

## Frequency-band palette

Use this in every EQ chart, instrument range bar, and frequency reference.

- **Sub** (20 to 60 Hz): `#6D28D9`
- **Bass** (60 to 250 Hz): `#2563EB`
- **Low-mids** (250 to 500 Hz): `#0D9488`
- **Mids** (500 Hz to 2 kHz): `#16A34A`
- **Upper-mids** (2 to 4 kHz): `#EAB308`
- **Presence** (4 to 6 kHz): `#F97316`
- **Air** (6 to 20 kHz): `#EC4899`

## DAW track color standard

Recommended in the Workflow guide (Part 22) and used in every session diagram.

- **Drums:** red `#EF4444`
- **Percussion:** amber `#F59E0B`
- **Bass and 808:** orange `#F97316`
- **Keys and chords:** yellow `#EAB308`
- **Synths and leads:** green `#22C55E`
- **Guitars:** teal `#14B8A6`
- **Strings and orchestral:** cyan `#06B6D4`
- **Pads and atmospheres:** purple `#A855F7`
- **Lead vocals:** blue `#3B82F6`
- **Background vocals and ad-libs:** light blue `#93C5FD`
- **FX and ear candy:** pink `#EC4899`
- **Buses and groups:** gray `#71717A`
- **FX returns:** light gray `#D4D4D8`
- **Reference tracks:** dark gray `#3F3F46`

## Tags

- **Skill level:**
  - Beginner: green `#22C55E`
  - Intermediate: amber `#F59E0B`
  - Advanced: red `#EF4444`
- **Roles** (neutral chips, each with a Lucide icon):
  - Beatmaker: `drum`
  - Songwriter: `pen-line`
  - Vocalist: `mic-vocal`
  - Rapper: `mic`
  - Recording Engineer: `audio-lines`
  - Mix Engineer: `sliders-vertical`
  - Mastering Engineer: `gauge`
  - Artist-Entrepreneur: `briefcase`
  - Media Composer: `clapperboard`
- **Entry status** (development builds only): stub gray `#71717A`, draft amber `#F59E0B`, review sky `#0EA5E9`, published emerald `#10B981`.

## Icons

Pillars, parts, effect categories, and instrument families each have a Lucide icon name in their registry. `src/design/icons.tsx` maps those names to components, and a missing or misspelled name is a compile error. Genre families use color instead of icons.

## Plugin tiers

- **Registry price tiers** (badges on every plugin): Free teal `#14B8A6`, Budget lime `#84CC16`, Mid-price sky `#0EA5E9`, Premium violet `#8B5CF6`, Subscription amber `#F59E0B`.
- **Recommendation tiers** (the plugin panel on entries), each with a Lucide icon:
  - Industry Standard: gold `#F5C542`, `crown`
  - Pro Alternatives: sky `#0EA5E9`, `award`
  - Budget: lime `#84CC16`, `piggy-bank`
  - Free: teal `#14B8A6`, `gift`
  - Stock: slate `#94A3B8`, `package`

## Music data displays

- **Progression modes:** major amber `#F59E0B`, minor indigo `#6366F1`, modal teal `#14B8A6`.
- **Drum-grid lanes** (matched by lane name, drawn from the track colors): 808 and bass orange `#F97316`; kick red `#EF4444`; snare, clap, and rim amber `#F59E0B`; hats and cymbals yellow `#EAB308`; toms and percussion teal `#14B8A6`; anything else purple `#A855F7`.
- **Drum-grid cells:** accent is a solid glowing cell, hit is a solid cell at 70%, ghost is an outlined tint, roll is striped, and rest is empty.
- **Arrangement sections** (matched by section name): verse blue `#3B82F6`; pre-chorus cyan `#06B6D4`; chorus and hook pink `#EC4899`; post-chorus fuchsia `#D946EF`; drop orange `#F97316`; build amber `#F59E0B`; bridge violet `#8B5CF6`; breakdown teal `#14B8A6`; solo green `#22C55E`; intro, outro, and tag slate `#94A3B8`; anything else gray `#A1A1AA`.

## Typography

- **UI and body:** Inter (variable), 16 px with about 1.75 line height for reading.
- **Display headings:** Space Grotesk.
- **Numbers, settings, and code:** JetBrains Mono, so values like `4:1`, `-14 LUFS`, and `10 ms` line up.
- **Layout:** keep body text near a 72-character measure.
- **Heading scale:** 1.25 ratio: `text-h4` 1.25rem, `text-h3` 1.5625rem, `text-h2` 1.953rem, `text-h1` 2.441rem, `text-display` 3.815rem.
- **Eyebrows:** 11 px uppercase labels with wide tracking, in the accent ink color.
- All three fonts are self-hosted, so they work offline.

## Motion

- **Library:** Motion (the current name of Framer Motion), loaded through `LazyMotion`.
- **Duration:** 150 to 250 ms for UI feedback; springs for expanding cards and drawers.
- **Page transitions:** short fade-and-rise; shared-element transitions from card to detail page where it helps.
- **Lists:** stagger items by about 30 ms when filtering encyclopedia grids.
- **Reduced motion:** with `prefers-reduced-motion`, swap all movement for instant or opacity-only changes.
- **Audio:** never autoplay.

## Component inventory (built in Stage 3)

- **App shell:** sidebar navigation by pillar, part, and section (written sections show a glowing dot), breadcrumbs, a command palette for search (Ctrl+K or `/`), a dark/light toggle, a global Guide/Cheat Sheet mode toggle, and a mobile navigation drawer.
- **Page layout:** page header with an accent glow, an "On this page" rail with scroll-spy and reading progress, previous and next links, and bookmark buttons.
- **Cards:**
  - Entry card for genre, instrument, effect, and plugin grids.
  - Group tile for effect categories and instrument and genre families.
  - Cheat Sheet card.
  - Technique card (collapsible).
  - Callout.
- **Disclosure:** expandable section and tabs with an animated indicator.
- **Data displays:**
  - Settings table, data table, control cards, meter list.
  - Plugin tier panel: Industry, Pro, Budget, Free, Stock.
  - Drum grid.
  - Frequency spectrum chart (with hover readout and range overlays) and instrument range keyboard (with hover note, MIDI, and frequency).
  - Tempo badge, BPM scale, and LUFS scale.
  - Progression cards.
  - Arrangement timeline and key-moments timeline.
- **Tags:** skill, role, price, family, and status chips; glossary hover tooltips.
- **Planned pages:** outline sections without a written page show "What this page will cover", built from the outline's summary and sub-bullets.
