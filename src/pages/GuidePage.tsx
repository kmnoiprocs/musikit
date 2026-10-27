import { BookOpen, Target } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router'
import { Blocks } from '../components/content/Blocks'
import { CheatSheetCard } from '../components/content/CheatSheetCard'
import { TechniqueCard } from '../components/content/TechniqueCard'
import { DetailLayout } from '../components/layout/DetailLayout'
import { BookmarkButton } from '../components/layout/PageActions'
import { PageHeader } from '../components/layout/PageHeader'
import type { GuideSection } from '../content/schema'
import { partByNumber, refForGuide, sectionByNumber, type SectionInfo } from '../lib/content'
import { useRecordVisit } from '../lib/prefs'
import { commonSections, entryMeta } from './entryParts'
import { PlannedSectionView, SectionPrevNext } from './LearnPages'
import NotFoundPage from './NotFoundPage'

export default function GuidePage() {
  const { section: number = '', entryId } = useParams()
  const section = sectionByNumber.get(number)
  if (!section) return <NotFoundPage />
  if (section.kind !== 'guide') return <Navigate to={section.href} replace />
  const page = entryId ? section.pages.find((p) => p.id === entryId) : section.pages[0]
  if (entryId && !page) return <NotFoundPage />
  return page ? <GuideEntryView key={page.id} page={page} section={section} /> : <PlannedSectionView key={number} section={section} />
}

function GuideEntryView({ page, section }: { page: GuideSection; section: SectionInfo }) {
  const part = partByNumber.get(section.part)!
  const ref = refForGuide(page)
  const saved = { href: ref.href, title: page.title, kind: `Guide ${page.section}`, color: section.accent }
  useRecordVisit(saved)

  return (
    <DetailLayout
      color={section.accent}
      header={
        <PageHeader
          eyebrow={
            <>
              <Link to={part.href} className="hover:underline">
                Part {part.part} · {part.shortTitle}
              </Link>
              <span className="text-faint">·</span>
              <span>Section {page.section}</span>
            </>
          }
          title={page.title}
          summary={page.summary}
          color={section.accent}
          iconName={part.icon}
          meta={entryMeta(page)}
          actions={<BookmarkButton page={saved} />}
        />
      }
      cheatSheet={<CheatSheetCard items={page.cheatSheet} />}
      sections={[
        { id: 'guide', title: 'The Guide', icon: BookOpen, content: <Blocks blocks={page.blocks} /> },
        {
          id: 'techniques',
          title: 'Technique Cards',
          icon: Target,
          description: 'Step-by-step recipes. Open a card for the full method.',
          content: page.techniqueCards.length > 0 && (
            <div className="space-y-3">
              {page.techniqueCards.map((card, i) => (
                <TechniqueCard key={card.id} card={card} index={i} defaultOpen={page.techniqueCards.length <= 2} />
              ))}
            </div>
          ),
        },
        ...commonSections(page, ref.ref),
      ]}
      footer={<SectionPrevNext number={section.number} />}
    />
  )
}
