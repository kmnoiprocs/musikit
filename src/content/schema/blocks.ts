import { z } from 'zod'
import { CalloutType, Setting, Text } from './common'

/**
 * Rich content building blocks. Text fields support light Markdown (bold, italics, code)
 * and inline cross-references like [[effect:compressor|a compressor]].
 */
export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; style?: 'bullet' | 'numbered'; items: string[] }
  | { type: 'steps'; items: { title: string; body: string }[] }
  | { type: 'callout'; variant: z.infer<typeof CalloutType>; title?: string; body: string }
  | { type: 'settings'; title?: string; rows: z.infer<typeof Setting>[] }
  | { type: 'table'; caption?: string; columns: string[]; rows: string[][] }
  | { type: 'expandable'; title: string; summary?: string; blocks: ContentBlock[] }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'widget'; widget: string; props?: Record<string, unknown> }

export const ContentBlock: z.ZodType<ContentBlock, ContentBlock> = z.lazy(() =>
  z.discriminatedUnion('type', [
    z.object({ type: z.literal('paragraph'), text: Text }),
    z.object({
      type: z.literal('list'),
      style: z.enum(['bullet', 'numbered']).optional(),
      items: z.array(Text).min(1),
    }),
    z.object({
      type: z.literal('steps'),
      items: z.array(z.object({ title: Text, body: Text })).min(1),
    }),
    z.object({
      type: z.literal('callout'),
      variant: CalloutType,
      title: z.string().optional(),
      body: Text,
    }),
    z.object({ type: z.literal('settings'), title: z.string().optional(), rows: z.array(Setting).min(1) }),
    z.object({
      type: z.literal('table'),
      caption: z.string().optional(),
      columns: z.array(Text).min(2),
      rows: z.array(z.array(z.string())).min(1),
    }),
    z.object({
      type: z.literal('expandable'),
      title: Text,
      summary: z.string().optional(),
      blocks: z.array(ContentBlock).min(1),
    }),
    z.object({ type: z.literal('quote'), text: Text, attribution: z.string().optional() }),
    z.object({
      type: z.literal('widget'),
      widget: Text,
      props: z.record(z.string(), z.unknown()).optional(),
    }),
  ]),
)
