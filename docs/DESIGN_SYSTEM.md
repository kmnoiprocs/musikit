# MusiKit Design System

The visual rules for MusiKit. Stage 3 turns these into Tailwind theme tokens and React components. Change a value here first, then in code.

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
- **Entry status** (development builds only): stub, draft, review, published.

## Typography (proposed for Stage 3)

- **UI and body:** Inter (variable).
- **Display headings:** Space Grotesk.
- **Numbers, settings, and code:** JetBrains Mono, so values like `4:1`, `-14 LUFS`, and `10 ms` line up.
- **Layout:** keep body text near a 72-character measure.
- **Heading scale:** 1.25 ratio.

## Motion

- **Library:** Framer Motion.
- **Duration:** 150 to 250 ms for UI feedback; springs for expanding cards and drawers.
- **Page transitions:** short fade-and-rise; shared-element transitions from card to detail page where it helps.
- **Lists:** stagger items by about 30 ms when filtering encyclopedia grids.
- **Reduced motion:** with `prefers-reduced-motion`, swap all movement for instant or opacity-only changes.
- **Audio:** never autoplay.

## Component inventory (built in Stage 3)

- **App shell:** sidebar navigation by pillar and part, breadcrumbs, a command palette for search (Ctrl+K), a dark/light toggle, and a global Guide/Cheat Sheet mode toggle.
- **Cards:**
  - Entry card for genre, instrument, effect, and plugin grids.
  - Cheat Sheet card.
  - Technique card.
  - Callout.
- **Disclosure:** expandable section, tabs, and accordion groups.
- **Data displays:**
  - Settings table, control/knob list, meter explainer.
  - Plugin tier panel: Industry, Pro, Budget, Free, Stock.
  - Drum grid.
  - Frequency band bar and instrument range keyboard.
  - BPM and tempo badge.
  - Progression chips.
- **Tags:** skill, role, family, and pillar chips; glossary hover tooltips.
