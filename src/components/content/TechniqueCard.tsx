import { Award, ChevronDown, CircleX, FlaskConical, Target, Timer } from 'lucide-react'
import { Collapsible } from 'radix-ui'
import type { TechniqueCard as TechniqueCardData } from '../../content/schema'
import { CALLOUTS } from '../../design/tokens'
import { accent } from '../../lib/cn'
import { resolveRefs } from '../../lib/content'
import { StepList } from './Blocks'
import { RefChips } from './Refs'
import { RichText } from './RichText'
import { SettingsTable } from './Tables'

export function TechniqueCard({ card, index, defaultOpen }: { card: TechniqueCardData; index?: number; defaultOpen?: boolean }) {
  const related = resolveRefs(card.related)
  return (
    <Collapsible.Root defaultOpen={defaultOpen} id={card.id} className="group/tc card overflow-hidden">
      <Collapsible.Trigger className="flex w-full items-start gap-4 p-5 text-left transition-colors hover:bg-fg/[0.02]">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/14 font-mono text-sm font-bold text-accent-ink ring-1 ring-accent/25 ring-inset">
          {index !== undefined ? String(index + 1).padStart(2, '0') : <Target className="size-5" />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="eyebrow block text-accent-ink">Technique</span>
          <span className="mt-0.5 block font-display text-lg font-semibold tracking-tight text-fg">{card.title}</span>
          <span className="mt-1 block text-[15px] text-muted">
            <RichText text={card.goal} />
          </span>
        </span>
        <ChevronDown className="mt-2 size-5 shrink-0 text-muted transition-transform duration-200 group-data-[state=open]/tc:rotate-180" aria-hidden />
      </Collapsible.Trigger>
      <Collapsible.Content className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <div className="space-y-5 border-t border-line p-5">
          <div className="flex gap-2.5 rounded-xl bg-fg/[0.03] px-4 py-3 text-[15px]">
            <Timer className="mt-0.5 size-4 shrink-0 text-accent-ink" aria-hidden />
            <span>
              <span className="font-semibold text-fg">When to use: </span>
              <span className="text-fg/80">
                <RichText text={card.whenToUse} />
              </span>
            </span>
          </div>
          <StepList items={card.steps.map((s) => ({ title: s }))} />
          {card.settings.length > 0 && <SettingsTable rows={card.settings} title="Settings" />}
          {card.pitfalls.length > 0 && (
            <div style={accent(CALLOUTS.mistake.color)}>
              <div className="eyebrow mb-2 text-accent-ink">Pitfalls</div>
              <ul className="space-y-1.5">
                {card.pitfalls.map((p, i) => (
                  <li key={i} className="flex gap-2.5 text-[15px] text-fg/85">
                    <CircleX className="mt-0.5 size-4 shrink-0 text-accent-ink" aria-hidden />
                    <RichText text={p} />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {(card.proTip || card.unorthodoxTwist) && (
            <div className="grid gap-3 sm:grid-cols-2">
              {card.proTip && <MiniNote color={CALLOUTS.pro.color} icon={Award} label="Pro tip" text={card.proTip} />}
              {card.unorthodoxTwist && <MiniNote color={CALLOUTS.unorthodox.color} icon={FlaskConical} label="Unorthodox twist" text={card.unorthodoxTwist} />}
            </div>
          )}
          {related.length > 0 && <RefChips refs={related} />}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

function MiniNote({ color, icon: IconC, label, text }: { color: string; icon: typeof Award; label: string; text: string }) {
  return (
    <div style={accent(color)} className="rounded-xl border border-accent/25 bg-accent/[0.07] p-3.5">
      <div className="eyebrow flex items-center gap-1.5 text-accent-ink">
        <IconC className="size-3.5" aria-hidden />
        {label}
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-fg/85">
        <RichText text={text} />
      </p>
    </div>
  )
}
