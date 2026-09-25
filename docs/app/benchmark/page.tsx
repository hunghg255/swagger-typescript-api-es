import { ArrowRight, Cpu, Gauge, MemoryStick, Timer } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { BenchmarkChart } from '@/components/benchmark/benchmark-chart';
import { CodeBlock } from '@/components/code-block';
import { site } from '@/components/site-config';
import { SiteFooter } from '@/components/site-footer';
import resultsJson from '@/lib/benchmark/results.json';
import {
  type BenchmarkReport,
  type BenchmarkResult,
  type Metric,
  formatMetric,
  formatRatio,
  metricValue,
  ratio,
  versionLabel,
} from '@/lib/benchmark/types';

export const dynamic = 'force-static';

const report = resultsJson as BenchmarkReport;
const es = report.libraries.es;
const original = report.libraries.original;

export const metadata: Metadata = {
  title: 'Benchmark',
  description: `${site.name} compared with the original swagger-typescript-api v${original.version}: generation time, cold run and memory on small to large OpenAPI documents.`,
  openGraph: { title: `Benchmark · ${site.name}` },
};

const find = (id: string) => report.results.find((result) => result.id === id);

/** the largest scenario of each kind, for the headline numbers */
const headline = find('large-default') ?? report.results[report.results.length - 1];

function StatTile({
  icon: Icon,
  label,
  result,
  metric,
  suffix,
}: {
  icon: typeof Timer;
  label: string;
  result: BenchmarkResult;
  metric: Metric;
  suffix: string;
}) {
  const value = ratio(result, metric);
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <p className="flex items-center gap-2 text-sm font-medium text-fg-muted">
        <Icon aria-hidden className="size-4" />
        {label}
      </p>
      <p className="mt-3 text-4xl font-semibold tracking-tight text-fg tabular-nums">
        {formatRatio(value)} <span className="text-lg font-medium text-fg-muted">{suffix}</span>
      </p>
      <p className="mt-2 font-mono text-xs text-fg-muted tabular-nums">
        {formatMetric(metricValue(result.libraries.es, metric), metric)} vs{' '}
        {formatMetric(metricValue(result.libraries.original, metric), metric)}
      </p>
    </div>
  );
}

const cell = 'px-3 py-2.5 text-right font-mono text-xs tabular-nums whitespace-nowrap';

function ResultsTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <caption className="sr-only">All benchmark results</caption>
        <thead className="bg-bg-subtle text-xs text-fg-muted">
          <tr className="border-b border-border">
            <th scope="col" className="px-3 py-2.5 text-left font-medium">
              Scenario
            </th>
            <th scope="col" className="px-3 py-2.5 text-right font-medium" colSpan={3}>
              Generation (warm, median)
            </th>
            <th scope="col" className="px-3 py-2.5 text-right font-medium" colSpan={3}>
              Cold run
            </th>
            <th scope="col" className="px-3 py-2.5 text-right font-medium" colSpan={2}>
              Peak memory
            </th>
            <th scope="col" className="px-3 py-2.5 text-right font-medium" colSpan={2}>
              Output
            </th>
          </tr>
          <tr className="border-b border-border">
            <th scope="col" className="px-3 py-2 text-left font-normal" />
            {['-es', 'original', 'ratio', '-es', 'original', 'ratio', '-es', 'original', '-es', 'original'].map(
              (label, index) => (
                <th key={index} scope="col" className="px-3 py-2 text-right font-normal">
                  {label}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {report.results.map((result) => {
            const { es: a, original: b } = result.libraries;
            return (
              <tr key={result.id} className="border-b border-border last:border-0">
                <th scope="row" className="px-3 py-2.5 text-left font-medium text-fg">
                  {report.documents[result.document]?.label}{' '}
                  <span className="font-normal text-fg-muted">
                    · {report.optionSets[result.options]?.label}
                  </span>
                </th>
                <td className={`${cell} text-fg`}>{formatMetric(a.warm.medianMs, 'warm')}</td>
                <td className={`${cell} text-fg-muted`}>{formatMetric(b.warm.medianMs, 'warm')}</td>
                <td className={`${cell} font-semibold text-accent-strong`}>{formatRatio(ratio(result, 'warm'))}</td>
                <td className={`${cell} text-fg`}>{formatMetric(a.cold.medianMs, 'cold')}</td>
                <td className={`${cell} text-fg-muted`}>{formatMetric(b.cold.medianMs, 'cold')}</td>
                <td className={`${cell} font-semibold text-accent-strong`}>{formatRatio(ratio(result, 'cold'))}</td>
                <td className={`${cell} text-fg`}>{formatMetric(a.cold.maxRssMb, 'memory')}</td>
                <td className={`${cell} text-fg-muted`}>{formatMetric(b.cold.maxRssMb, 'memory')}</td>
                <td className={`${cell} text-fg`}>{Math.round(a.outputKb)} KB</td>
                <td className={`${cell} text-fg-muted`}>{Math.round(b.outputKb)} KB</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function BenchmarkPage() {
  const date = new Date(report.generatedAt);
  const optionList = Object.values(report.optionSets)
    .map(({ label, options }) =>
      Object.keys(options).length ? `${label}: ${Object.keys(options).join(', ')}` : `${label}: no options`
    )
    .join('; ');

  return (
    <>
      <main id="main" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold text-accent">Benchmark</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            <span className="sm:whitespace-nowrap">{es.name}</span> vs{' '}
            <span className="sm:whitespace-nowrap">{original.name}</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            Both generators run on the same machine, with the same OpenAPI documents and the same
            options, in separate Node.js processes. The{' '}
            <a href={site.upstream} target="_blank" rel="noreferrer" className="font-medium text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg">
              original swagger-typescript-api
            </a>{' '}
            is the project this library is based on.
          </p>
        </header>

        <section aria-label="Headline results" className="mt-10 grid gap-4 sm:grid-cols-3">
          <StatTile icon={Gauge} label={`Generation · ${report.documents[headline.document]?.label} spec`} result={headline} metric="warm" suffix="faster" />
          <StatTile icon={Timer} label={`Cold run · ${report.documents[headline.document]?.label} spec`} result={headline} metric="cold" suffix="faster" />
          <StatTile icon={MemoryStick} label={`Peak memory · ${report.documents[headline.document]?.label} spec`} result={headline} metric="memory" suffix="less" />
        </section>

        <div className="mt-10">
          <BenchmarkChart report={report} />
        </div>

        <section aria-labelledby="table-heading" className="mt-14">
          <h2 id="table-heading" className="text-xl font-semibold tracking-tight text-fg">
            All results
          </h2>
          <p className="mt-2 text-sm text-fg-muted">
            Ratio = time of the original ÷ time of {es.name}. Memory is the peak resident set size of
            the cold-run process.
          </p>
          <div className="mt-5">
            <ResultsTable />
          </div>
        </section>

        <section aria-labelledby="method-heading" className="mt-14 grid gap-10 lg:grid-cols-[1fr_minmax(0,22rem)]">
          <div>
            <h2 id="method-heading" className="text-xl font-semibold tracking-tight text-fg">
              How it is measured
            </h2>
            <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-fg-muted marker:text-fg-subtle">
              <li>
                <strong className="text-fg">Same input:</strong> each run parses the document from JSON
                and passes it as <code className="rounded bg-muted px-1 font-mono text-[0.85em] text-fg">spec</code>,
                with <code className="rounded bg-muted px-1 font-mono text-[0.85em] text-fg">output: false</code>{' '}
                (no disk writes) and <code className="rounded bg-muted px-1 font-mono text-[0.85em] text-fg">silent: true</code>.
              </li>
              <li>
                <strong className="text-fg">Same options</strong> for both libraries: {optionList}.
              </li>
              <li>
                <strong className="text-fg">Generation:</strong> one process per library and scenario, one
                warm-up generation, then the median of {report.settings.warmRuns} generations.
              </li>
              <li>
                <strong className="text-fg">Cold run:</strong> a new process per run that imports the
                library and generates once (what a single CLI run costs), median of {report.settings.coldRuns} runs.
              </li>
              <li>
                <strong className="text-fg">Versions:</strong> {es.name} is measured from the repository
                {report.commit ? ` at commit ${report.commit}` : ''} (including changes not published to npm
                yet), the original is the latest npm release, v{original.version}.
              </li>
              <li>
                <strong className="text-fg">Isolation:</strong> every measurement is a separate Node.js
                process, and the libraries alternate which one runs first.
              </li>
              <li>
                <strong className="text-fg">Formatting is included</strong>, because both generators format
                their output: {es.name} with oxfmt, the original with Biome (WebAssembly).
              </li>
            </ul>

            <h3 className="mt-8 text-base font-semibold text-fg">Keep in mind</h3>
            <ul className="mt-3 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-fg-muted marker:text-fg-subtle">
              <li>
                The medium and large documents are synthetic (objects with enums, arrays, <code className="rounded bg-muted px-1 font-mono text-[0.85em] text-fg">$ref</code>s,{' '}
                <code className="rounded bg-muted px-1 font-mono text-[0.85em] text-fg">oneOf</code> and nullable fields, spread over tags).
                Real documents have other shapes, so try yours in the{' '}
                <Link href="/playground" className="font-medium text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg">
                  playground
                </Link>{' '}
                or run the benchmark with them.
              </li>
              <li>
                The generated code is similar but not identical (different templates and formatters),
                which is why the output sizes differ. In modular mode each module file of {es.name}{' '}
                imports every data contract, so its modular output is bigger.
              </li>
              <li>These numbers come from one machine; absolute times depend on the hardware.</li>
            </ul>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-bg-subtle p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-fg">
              <Cpu aria-hidden className="size-4 text-fg-muted" /> Environment
            </h2>
            <dl className="mt-4 space-y-2.5 text-sm">
              {[
                ['Date', date.toISOString().slice(0, 10)],
                ['Node.js', report.environment.node],
                ['CPU', `${report.environment.cpu} · ${report.environment.cores} cores`],
                ['Memory', `${report.environment.memoryGb} GB`],
                ['OS', report.environment.platform],
                [es.name, versionLabel(report, 'es')],
                [original.name, versionLabel(report, 'original')],
              ].map(([term, detail]) => (
                <div key={term} className="grid grid-cols-[6.5rem_1fr] gap-3">
                  <dt className="truncate text-fg-muted">{term}</dt>
                  <dd className="min-w-0 break-words font-mono text-xs leading-5 text-fg">{detail}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </section>

        <section aria-labelledby="reproduce-heading" className="mt-14 max-w-3xl">
          <h2 id="reproduce-heading" className="text-xl font-semibold tracking-tight text-fg">
            Run it yourself
          </h2>
          <p className="mt-2 text-sm text-fg-muted">
            The benchmark lives in the repository (<code className="rounded bg-muted px-1 font-mono text-[0.85em] text-fg">bench/compare</code>).
            It installs the original library in its own folder, runs every scenario and writes the
            results shown on this page.
          </p>
          <CodeBlock
            className="mt-4"
            lang="bash"
            title="terminal"
            code={`git clone ${site.repo}\ncd swagger-typescript-api-es\nnpm install\nnpm run bench:compare\n# options: -- --runs 10 --cold-runs 5 --filter large`}
          />
          <Link
            href="/docs"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-accent"
          >
            Read the docs <ArrowRight aria-hidden className="size-4" />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
