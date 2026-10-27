import { BookOpenText, CornerDownRight, Layers, Lightbulb, Link2 } from 'lucide-react'
import { Blocks } from '../components/content/Blocks'
import { Callout } from '../components/content/Callout'
import { RefChips, Sources } from '../components/content/Refs'
import type { PageSection } from '../components/layout/DetailLayout'
import { RoleChip, SkillTag, StatusBadge } from '../components/ui/Chip'
import type { Callout as CalloutData, ContentBlock, Role, SkillLevel, Source, Status } from '../content/schema'
import { backlinks, resolveRefs } from '../lib/content'

interface CommonEntry {
  status: Status
  skillLevel: SkillLevel
  roles: Role[]
  sources: Source[]
  lastVerified: string
  callouts: CalloutData[]
  related: string[]
  extra: ContentBlock[]
}

/** Skill, roles, and (in development) status chips for a page header. */
export function entryMeta(entry: CommonEntry) {
  return (
    <>
      <SkillTag level={entry.skillLevel} />
      {entry.roles.map((r) => (
        <RoleChip key={r} role={r} />
      ))}
      <StatusBadge status={entry.status} />
    </>
  )
}

/** The sections every entry template ends with: tips, deep dive, related, mentioned in, and sources. */
export function commonSections(entry: CommonEntry, selfRef: string, extraRelated: string[] = []): PageSection[] {
  const relatedRefs = [...new Set([...entry.related, ...extraRelated])]
  const related = resolveRefs(relatedRefs)
  const mentions = backlinks(selfRef).filter((b) => !relatedRefs.includes(b.ref))
  return [
    {
      id: 'tips',
      title: 'Tips & Tricks',
      icon: Lightbulb,
      content: entry.callouts.length > 0 && (
        <div className="space-y-3">
          {entry.callouts.map((c, i) => (
            <Callout key={i} variant={c.variant} title={c.title} body={c.body} />
          ))}
        </div>
      ),
    },
    { id: 'deep-dive', title: 'Deep Dive', icon: Layers, content: entry.extra.length > 0 && <Blocks blocks={entry.extra} /> },
    { id: 'related', title: 'Related', icon: Link2, content: related.length > 0 && <RefChips refs={related} /> },
    { id: 'mentioned-in', title: 'Mentioned In', icon: CornerDownRight, description: 'Pages that link here.', content: mentions.length > 0 && <RefChips refs={mentions} /> },
    { id: 'sources', title: 'Sources', icon: BookOpenText, content: <Sources sources={entry.sources} lastVerified={entry.lastVerified} /> },
  ]
}
