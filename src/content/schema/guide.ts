import { z } from 'zod'
import { ContentBlock } from './blocks'
import { Ref, SectionNumber, Setting, Slug, Text } from './common'
import { EntryMeta } from './meta'

export const TechniqueCardSchema = z.object({
  id: Slug,
  title: Text,
  goal: Text,
  whenToUse: Text,
  steps: z.array(Text).min(1),
  settings: z.array(Setting).default([]),
  pitfalls: z.array(Text).default([]),
  proTip: z.string().optional(),
  unorthodoxTwist: z.string().optional(),
  related: z.array(Ref).default([]),
})

/** A Guide page. Each one maps to a numbered section of docs/MASTER_OUTLINE.md. */
export const GuideSectionSchema = EntryMeta.extend({
  section: SectionNumber,
  title: Text,
  summary: Text,
  cheatSheet: z.array(Text).min(1).max(10),
  blocks: z.array(ContentBlock).min(1),
  techniqueCards: z.array(TechniqueCardSchema).default([]),
})

export type TechniqueCard = z.output<typeof TechniqueCardSchema>
export type GuideSectionInput = z.input<typeof GuideSectionSchema>
export type GuideSection = z.output<typeof GuideSectionSchema>
