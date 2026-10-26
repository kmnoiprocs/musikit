import { contentResult } from './content/collections'

/**
 * Stage 2 content status page: confirms that the content library loads and validates
 * in the browser. Replaced by the real app shell in Stage 3.
 */
export default function App() {
  const { library, errors, warnings, coverage, statusCounts } = contentResult

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">MusiKit</h1>
      <p className="mt-2 text-zinc-400">Content system status. The full app shell arrives in Stage 3.</p>

      <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Plugins" value={library.plugins.length} />
        {Object.entries(statusCounts).map(([name, counts]) => (
          <Stat key={name} label={name} value={Object.values(counts).reduce((a, b) => a + b, 0)} />
        ))}
      </section>

      <section className="mt-8 space-y-2">
        {coverage.map((c) => (
          <div key={c.label}>
            <div className="flex justify-between text-sm text-zinc-400">
              <span>{c.label}</span>
              <span>
                {c.covered}/{c.total}
              </span>
            </div>
            <div className="mt-1 h-2 rounded-full bg-zinc-800">
              <div className="h-2 rounded-full bg-violet-500" style={{ width: `${(c.covered / c.total) * 100}%` }} />
            </div>
          </div>
        ))}
      </section>

      <section className="mt-8 text-sm">
        <p className={errors.length ? 'text-red-400' : 'text-emerald-400'}>
          {errors.length} error(s), {warnings.length} warning(s)
        </p>
        <ul className="mt-2 space-y-1 text-red-300">
          {errors.map((e, i) => (
            <li key={i}>
              {e.file}: {e.message}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs uppercase tracking-wide text-zinc-500">{label}</div>
    </div>
  )
}
