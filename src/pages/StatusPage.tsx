import { CircleAlert, CircleCheck, Database, TriangleAlert } from 'lucide-react'
import { PageHeader } from '../components/layout/PageHeader'
import { ProgressBar } from '../components/ui/Misc'
import { STATUSES } from '../content/schema'
import { CALLOUTS, STATUS_COLORS } from '../design/tokens'
import { accent } from '../lib/cn'
import { contentResult } from '../lib/content'
import { PageContainer, PageSection } from './shared'

/** Development-only overview of content coverage and validation issues. */
export default function StatusPage() {
  const { library, errors, warnings, coverage, statusCounts } = contentResult
  const color = errors.length ? CALLOUTS.mistake.color : CALLOUTS.tip.color
  return (
    <PageContainer color={color} className="max-w-[64rem]">
      <PageHeader
        eyebrow="Development"
        title="Content Status"
        color={color}
        icon={Database}
        summary={`${errors.length} error(s) and ${warnings.length} warning(s) across ${library.plugins.length} plugins and ${Object.values(statusCounts).reduce((n, c) => n + Object.values(c).reduce((a, b) => a + b, 0), 0)} entries.`}
      />
      <PageSection id="coverage" title="Coverage" color={color}>
        <div className="card space-y-4 p-5">
          {coverage.map((c) => (
            <div key={c.label}>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="text-fg">{c.label}</span>
                <span className="font-mono text-muted">
                  {c.covered}/{c.total}
                </span>
              </div>
              <ProgressBar value={c.covered} total={c.total} color={color} />
            </div>
          ))}
        </div>
      </PageSection>
      <PageSection id="collections" title="Collections" color={color}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(statusCounts).map(([name, counts]) => (
            <div key={name} className="card p-4">
              <div className="font-semibold capitalize text-fg">{name}</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {STATUSES.map((s) => (
                  <span key={s} style={accent(STATUS_COLORS[s])} className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent-ink">
                    {s} {counts[s]}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PageSection>
      <PageSection id="issues" title="Issues" color={color}>
        {errors.length + warnings.length === 0 ? (
          <p className="flex items-center gap-2 text-sm text-muted">
            <CircleCheck className="size-4 text-accent-ink" aria-hidden /> No validation issues.
          </p>
        ) : (
          <ul className="card divide-y divide-line">
            {[...errors, ...warnings].map((issue, i) => (
              <li key={i} style={accent(issue.level === 'error' ? CALLOUTS.mistake.color : CALLOUTS.myth.color)} className="flex gap-3 px-4 py-3 text-sm">
                {issue.level === 'error' ? <CircleAlert className="mt-0.5 size-4 shrink-0 text-accent-ink" /> : <TriangleAlert className="mt-0.5 size-4 shrink-0 text-accent-ink" />}
                <span>
                  <span className="font-mono text-xs text-muted">{issue.file}</span>
                  <span className="block text-fg/85">{issue.message}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </PageSection>
    </PageContainer>
  )
}
