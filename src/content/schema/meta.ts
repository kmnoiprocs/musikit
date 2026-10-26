import { z } from 'zod'
import { ContentBlock } from './blocks'
import { Callout, IsoDate, Ref, Role, SkillLevel, Slug, Source, Status } from './common'

/** Fields shared by every guide and encyclopedia entry. */
export const EntryMeta = z.object({
  id: Slug,
  status: Status,
  skillLevel: SkillLevel,
  roles: z.array(Role).min(1),
  /** Date the facts in this entry were last checked against sources. */
  lastVerified: IsoDate,
  sources: z.array(Source).default([]),
  callouts: z.array(Callout).default([]),
  related: z.array(Ref).default([]),
  /** Optional free-form deep-dive content rendered after the structured fields. */
  extra: z.array(ContentBlock).default([]),
})
