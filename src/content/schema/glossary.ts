import { z } from 'zod'
import { PILLAR_IDS } from '../registry/pillars'
import { IsoDate, Ref, Slug, Status, Text } from './common'

export const GlossaryTermSchema = z.object({
  id: Slug,
  term: Text,
  aliases: z.array(Text).default([]),
  /** One sentence, shown in hover tooltips. */
  short: Text.max(200, 'keep the short definition under 200 characters; use "long" for detail'),
  long: z.string().optional(),
  pillar: z.enum(PILLAR_IDS),
  related: z.array(Ref).default([]),
  status: Status,
  lastVerified: IsoDate,
})

export type GlossaryTermInput = z.input<typeof GlossaryTermSchema>
export type GlossaryTerm = z.output<typeof GlossaryTermSchema>
