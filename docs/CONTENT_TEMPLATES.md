# MusiKit Content Templates

How to write every kind of MusiKit entry. The Zod schemas in `src/content/schema/` are the source of truth. This document explains them in plain language, and `npm run validate:content` enforces them.

## Where content lives

- `src/content/plugins/<developer>.ts`: the central plugin registry, one file per developer, exported with `definePlugins([...])`.
- `src/content/entries/effects/<id>.ts`: one effect per file (`defineEffect`).
- `src/content/entries/instruments/<id>.ts`: one instrument per file (`defineInstrument`).
- `src/content/entries/genres/<id>.ts`: one genre or sub-genre per file (`defineGenre`).
- `src/content/entries/guide/<part>-<section>-<id>.ts`: one Guide page per file (`defineGuideSection`), e.g. `15-06-mixing-dynamics.ts`.
- `src/content/entries/glossary/<letter>.ts`: glossary terms grouped by first letter (`defineGlossary([...])`).

File names should match the entry `id`, apart from the numeric prefix on Guide files.

## Shared conventions

- **IDs** are lowercase kebab-case slugs (`tape-delay`, `uk-drill`) and must be unique within their collection.
- **Cross-references** are written `kind:id`, where kind is `effect`, `instrument`, `genre`, `guide`, `glossary`, or `plugin`.
  - Use them in `related` arrays and other Ref fields.
  - Inside any text, write `[[effect:compressor]]` or `[[effect:compressor|a compressor]]`.
  - Every reference must resolve, or validation fails.
- **Text** supports light Markdown (bold, italics, inline code). Keep paragraphs short.
- **Notes** use scientific pitch notation, where C4 is middle C (MIDI 60). Validation checks that note names and MIDI numbers agree.
- **Dates** are `YYYY-MM-DD`. Set `lastVerified` to the day you checked the facts against sources.
- **Sources:** cite at least two for published entries (title, plus author and/or URL).

## Status lifecycle

Every entry has a `status`:

1. `stub`: the minimum valid shape, used only to prove the pipeline works.
2. `draft`: being written; schema rules apply, quality thresholds do not.
3. `review`: content complete and awaiting your review. Quality thresholds produce warnings, and placeholder text (TODO, TBD, lorem ipsum) produces errors.
4. `published`: approved. Quality thresholds produce errors.

## Shared entry fields (effects, instruments, genres, guide pages)

- **Classification:**
  - `id`, `status`
  - `skillLevel`: beginner, intermediate, or advanced
  - `roles`: one or more of beatmaker, songwriter, vocalist, rapper, recording-engineer, mix-engineer, mastering-engineer, artist-entrepreneur, media-composer
- **Provenance:** `lastVerified`, `sources`
- **Extras:**
  - `callouts`: Tip, Pro Technique, Unorthodox Trick, Common Mistake, Myth-Buster, Free Alternative, Cheat Sheet, or Warning
  - `related`: cross-references
  - `extra`: optional free-form content blocks, rendered after the structured fields

## Plugin recommendations (`pluginRecs`)

Used by effects, instruments, and genres. Every ID must exist in the plugin registry, so add the plugin there first.

- **`industryStandard`** (at least 1): what working pros reach for first.
- **`proAlternatives`:** equally professional options with a different sound or workflow.
- **`budget`:** plugins whose registry `priceTier` is `budget` (under $50).
- **`free`** (at least 1): plugins whose registry `priceTier` is `free`.
- **`stock`:** the stock equivalent in each DAW, as `{ daw, name }`.
- **`notes`:** anything the tiers can't express, such as which free library to load into a free sampler.

## Plugin registry entry

- **Identity:**
  - `id`, `name`, `developer`.
  - `version` only when verified.
- **Compatibility:**
  - `categories`.
  - `formats`: VST3, VST2, AU, AAX, CLAP, LV2, Standalone.
  - `os`.
- **Price and license:**
  - `priceTier`: free, budget (under $50), mid ($50 to $199), premium ($200 and up), or subscription.
  - `approxPriceUsd`.
  - `licensing`.
- **What it does:**
  - `bestFor`: one sentence on what it does best.
  - `emulates`: the hardware it models, if any.
  - `alternatives`.
- **Reference:** `url`, `lastVerified`, `notes`.

## Effect entry (Part 18)

- **Identity:**
  - `name`, `aliases`
  - `category`: one of the 12 Part 18 categories
  - `kind`: `type` (a kind of effect, like a compressor) or `unit` (a specific device, like the LA-2A)
- **Overview:**
  - `summary`: one sentence
  - `cheatSheet`: 3 to 8 bullets
  - `history`, `howItWorks`
- **Controls:**
  - `controls[]`: name, description, typical range, starting value
  - `meters[]`: what each display shows
- **Usage:**
  - `variants[]`
  - `whenToUse[]`, `whenNotToUse[]`
  - `startingSettings[]`: per source, with parameter/value rows
- **Techniques:**
  - `techniques[]`, `unorthodoxTechniques[]`
  - `mistakes[]`, `myths[]` (myth plus truth)
- **Context:** `chainPlacement`, `genres[]` (genre refs), `pluginRecs`, `hardware[]` (classic units and pedals)

**Required to publish:**
- At least 2 sources and 4 cheat-sheet bullets.
- At least 3 controls, 2 variants, 1 when-not-to-use, 3 starting settings, 3 techniques, 2 unorthodox techniques, and 3 mistakes.
- At least 1 pro alternative, 1 budget plugin, and 3 stock DAW equivalents.

## Instrument entry (Part 19)

- **Identity:**
  - `name`, `aliases`
  - `family`: one of the 24 Part 19 families
  - `hornbostelSachs`: class, plus an optional classification number
- **Overview:**
  - `summary`, `cheatSheet`
  - `origin`: region, era, history
  - `soundProduction`
- **Range and tone:**
  - `range`: lowest and highest notes, MIDI numbers, optional transposition and sweet spot
  - `tunings[]`
  - `frequencyProfile`: Hz ranges for fundamental, body, presence, and air; plus masking conflicts
  - `timbre[]`
- **Playing:**
  - `articulations[]`
  - `polyphony`: monophonic, limited, or polyphonic, with an explanation. For example, a flute is monophonic unless you are writing for an ensemble.
  - `physicalLimits[]`
  - `scales[]`
- **Usage:** `genreUsage[]` (genre ref, the instrument's role, example songs)
- **Practical tips:**
  - `realismTips[]`: how to make the virtual version sound real
  - `writingTips[]`, `recordingTips[]`, `mixingTips[]`
- **People and products:** `notablePlayers[]`, `pluginRecs`, `buyingTips[]`

**Required to publish:**
- At least 2 sources and 4 cheat-sheet bullets.
- At least 3 articulations, 2 scales, 3 genre usages, 5 realism tips, 3 writing tips, 2 recording tips, 3 mixing tips, and 3 notable players.
- At least 1 pro alternative plugin.

## Genre entry (Part 20)

- **Identity:**
  - `name`, `aliases`
  - `family`: one of the 31 Part 20 families
  - `parent`: the parent genre ID, for sub-genres
- **Overview:** `soundsLike[]`, `description`, `cheatSheet`
- **History:** origins, era, place, `keyMoments[]` (year plus event), evolution, today
- **Tempo:** min, max, and typical BPM; feel; time signatures
- **Harmony and melody:**
  - `keys`: common keys, scales and modes
  - `progressions[]`: Roman numerals, mode (major, minor, or modal), example key and chords, usage. Include both major and minor examples where the genre allows.
  - `melodyTraits[]`
- **Rhythm and low end:**
  - `drums`: description, optional swing percent, optional step grid
  - `bassApproach`
- **Sound:**
  - `instrumentation`: core, optional, signature sounds, instrument refs
  - `soundDesign[]`
- **Vocals:** style, delivery, processing, lyric themes
- **Structure:** `arrangement` (sections with bar counts; typical length in seconds)
- **Mix and master:**
  - `mix`: aesthetic, priorities
  - `master`: integrated LUFS range, notes
- **How to make it:** `recipe[]` (the "Make It in 10 Steps" card), `authenticityTips[]`, `mistakes[]`
- **Tools:** `pluginRecs`, `samplePackTypes[]`
- **Listening:**
  - `artists`: pioneers, classic, modern, rising
  - `essentialListening[]`: title, artist, year, song or album
- **Connections:** `fusions[]`, `regionalVariants[]`

**Drum grid syntax:** one string per lane with one character per step.

- `X`: accent
- `x`: hit
- `o`: ghost note
- `r`: roll
- `.`: rest

Every lane must be exactly `steps` characters long.

**Required to publish:**
- At least 2 sources and 4 cheat-sheet bullets.
- At least 3 sounds-like tags and 3 key moments.
- At least 4 progressions and 8 recipe steps.
- At least 3 authenticity tips and 3 mistakes.
- At least 8 essential-listening items, 2 pioneers, and 3 modern artists.

## Guide page (Parts 0 to 17 and 21 to 28)

- **Placement:** `section`, which must be a numbered section in `docs/MASTER_OUTLINE.md` (for example `15.6`).
- **Overview:** `title`, `summary`, `cheatSheet` (1 to 10 bullets, shown in Cheat Sheet mode).
- **Body:** `blocks[]` (see Content blocks below).
- **Technique cards:** `techniqueCards[]`, each with:
  - Required: `id` (unique across all guide pages), `title`, `goal`, `whenToUse`, `steps[]`.
  - Optional: `settings[]`, `pitfalls[]`, `proTip`, `unorthodoxTwist`, `related[]`.

**Required to publish:** at least 2 sources, 4 cheat-sheet bullets, 4 blocks, and 2 technique cards.

## Glossary term

- **Term and short definition:** `id`, `term`, `aliases`, and `short`, a single sentence of 200 characters or fewer, shown in hover tooltips.
- **Long definition:** `long`, optional.
- **Placement and links:** `pillar`, which sets the tooltip color, and `related`.
- **Lifecycle:** `status`, `lastVerified`.

## Content blocks

These are used in Guide `blocks` and in any entry's `extra`.

- `paragraph`: `{ text }`
- `list`: `{ style?: 'bullet' | 'numbered', items }`
- `steps`: `{ items: [{ title, body }] }`
- `callout`: `{ variant, title?, body }`
- `settings`: `{ title?, rows: [{ param, value, note? }] }`
- `table`: `{ caption?, columns, rows }`. Every row must have one cell per column.
- `expandable`: `{ title, summary?, blocks }`. Collapsible; can nest.
- `quote`: `{ text, attribution? }`
- `widget`: `{ widget, props? }`. Embeds an interactive tool, from Stage 6 onward.
