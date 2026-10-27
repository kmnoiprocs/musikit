# MusiKit: Agent Guide

MusiKit is an installable, offline-capable web app (PWA) that serves as the most thorough music-production guide and cheat sheet available. It covers theory, songwriting, rap, singing, beatmaking, sound design, recording, mixing, mastering, business, and large encyclopedias of genres, instruments, effects, and plugins. The primary reader is a bedroom artist or producer working in a DAW.

## Read these first

- `docs/MASTER_OUTLINE.md`: the canonical scope. Every page maps to a numbered section.
- `docs/CONTENT_TEMPLATES.md`: what every entry type must contain.
- `docs/DESIGN_SYSTEM.md`: colors, callouts, tags, typography, motion.
- `docs/SOURCES.md`: the reference canon and the list of facts that need re-verification.

## Stack

- React 19, TypeScript (strict), and Vite 8.
- Tailwind CSS 4, and `vite-plugin-pwa` for offline support.
- Zod 4 for content schemas.
- React Router 8 (data router) for pages.
- Motion (the current package name of Framer Motion), used through `LazyMotion` and `m.*` components.
- Radix primitives (the unified `radix-ui` package), `cmdk` for the command palette, and Lucide icons.
- Fonts are self-hosted with Fontsource (Inter, Space Grotesk, JetBrains Mono) so they work offline.
- Tone.js comes in Stage 6.

## Commands

- `npm run dev`: development server.
- `npm run validate:content`: validate all content, report coverage, and exit non-zero on errors.
- `npm test`: validator regression tests (Node test runner).
- `npm run sync:outline`: regenerate `src/content/registry/outline.generated.ts` after editing `docs/MASTER_OUTLINE.md`. Section titles, one-line summaries, and sub-bullets all feed the app (planned pages show them as "What this page will cover").
- `npm run build`: validate, type-check, then build. The build fails on any content error.
- `npm run lint`: oxlint.

## Layout

- `src/content/schema/`: Zod schemas, the source of truth for entry shapes.
- `src/content/registry/`: pillars, effect categories, instrument families, genre families, and the generated outline.
- `src/content/plugins/`: the plugin registry, one file per developer.
- `src/content/entries/{effects,instruments,genres,guide,glossary}/`: the content.
- `src/content/validate.ts`: cross-collection validation, shared by the CLI and the app.
- `src/content/collections.ts`: browser-side loading through `import.meta.glob`.
- `scripts/`: Node scripts (validation, outline sync, tests).

App code (Stage 3):

- `src/index.css`: Tailwind theme tokens. Surfaces and text are CSS variables that switch with `data-theme`.
- `src/design/tokens.ts`: theme-independent colors and icons (callouts, frequency bands, tags, tiers, track colors).
- `src/design/icons.tsx`: maps the Lucide icon names used in registries to components.
- `src/lib/content.ts`: lookups, the outline navigation model, cross-reference resolution, and backlinks.
- `src/lib/search.ts`: the command-palette index. `src/lib/prefs.ts`: theme, reading mode, bookmarks, and recent pages.
- `src/app/`: the shell (router, sidebar, top bar, command palette).
- `src/components/ui/`: primitives. `src/components/content/`: content renderers and data displays. `src/components/layout/`: page header and detail layout.
- `src/pages/`: one file per page family. Entry templates live in `EffectPages`, `InstrumentPages`, `GenrePages`, and `GuidePage`.

## Visual review (Stage 3 onward)

- Run `npm run dev` and open the page you changed, in both themes and at phone width.
- `/design` shows every token and component live. In development builds, `/status` shows coverage and validation issues, and status badges appear on entries.
- Templates hide empty fields, so a sparse entry still renders cleanly; check that new fields actually appear.

## Content workflow (one batch per session)

1. **Scope:** pick one batch from the Content Production Order in `docs/MASTER_OUTLINE.md`. A batch is one Guide part, or 8 to 15 encyclopedia entries from one family.
2. **Research:** use reputable sources (see `docs/SOURCES.md`) and record them in each entry's `sources`.
3. **Register plugins:** add any new plugins to `src/content/plugins/` before referencing them.
4. **Write:** write entries with the `define*` helpers, set `status: 'review'`, and set `lastVerified` to today.
5. **Validate:** run `npm run validate:content` and `npm test`, and fix every error and warning.
6. **Review:** check the pages visually in the browser (from Stage 3 onward).
7. **Commit:** once the user approves, set `status: 'published'` and commit the batch.

## Writing voice

- **Tone and person:** write for a motivated bedroom producer. Use plain language, address the reader as "you", and be practical.
- **Jargon:** define it on first use, and link the glossary term with `[[glossary:id]]`.
- **Specificity:** prefer concrete numbers and steps (for example "start at 4:1, 10 ms attack") over vague advice, and say when numbers are starting points rather than rules.
- **Layering:** lead every page with its Cheat Sheet bullets, then go deep in blocks and expandables.
- **Spelling:** US English.

## Accuracy rules

- **No invented facts:** never invent songs, release years, artist facts, plugin features, prices, or versions. If you can't verify something, leave it out.
- **Plugin versions:** set a plugin's `version` only when it has been verified.
- **Plugin references:** recommend plugins only by registry ID. The free and budget tiers must match each plugin's registry `priceTier`.
- **Time-sensitive facts:** loudness targets, platform policies, and prices belong on the re-verification list in `docs/SOURCES.md`.
- **Safety:** health and legal topics (vocal health, hearing, copyright, contracts) get a `warning` callout recommending a professional where appropriate.

## Quality checklist (every entry, before review)

- [ ] Every required template field is filled with specific, useful content (no filler).
- [ ] The Cheat Sheet bullets stand on their own for someone in a hurry.
- [ ] It includes at least one Tip, and where relevant a Common Mistake, Myth-Buster, or Unorthodox Trick.
- [ ] Plugin recommendations cover Industry, Pro, Budget, Free, and Stock where they exist.
- [ ] Cross-references link to related effects, instruments, genres, guide pages, and glossary terms.
- [ ] Sources are cited and `lastVerified` is set.
- [ ] `npm run validate:content` shows 0 errors and 0 warnings for the batch.

## Do not

- Do not edit `src/content/registry/outline.generated.ts` by hand.
- Do not hard-code colors in components; use the design tokens or the registries. To tint a subtree, set its accent with `style={accent(color)}` (from `src/lib/cn.ts`) and use `bg-accent/15`, `border-accent/30`, and `text-accent-ink` inside it.
- Do not loosen a schema just to make content pass. Fix the content, or discuss changing the template.
- Do not add dependencies without a clear need.
