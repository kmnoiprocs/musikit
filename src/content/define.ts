import type { EffectInput, GenreInput, GlossaryTermInput, GuideSectionInput, InstrumentInput, PluginInput } from './schema'

/*
 * Authoring helpers. They return their argument unchanged but give editors full
 * type-checking and autocomplete. Runtime validation happens in validate.ts.
 */
export const defineEffect = (entry: EffectInput) => entry
export const defineInstrument = (entry: InstrumentInput) => entry
export const defineGenre = (entry: GenreInput) => entry
export const defineGuideSection = (entry: GuideSectionInput) => entry
export const defineGlossary = (terms: GlossaryTermInput[]) => terms
export const definePlugins = (plugins: PluginInput[]) => plugins
