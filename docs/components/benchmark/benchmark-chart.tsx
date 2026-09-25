'use client';

import { useState } from 'react';

import { Segmented } from '@/components/ui/segmented';
import {
  type BenchmarkReport,
  type BenchmarkResult,
  type LibraryId,
  type Metric,
  formatMetric,
  formatMs,
  formatRatio,
  metricValue,
  ratio,
  versionLabel,
} from '@/lib/benchmark/types';

const METRICS: { value: Metric; label: string; title: string; unitHint: string }[] = [
  {
    value: 'warm',
    label: 'Generation',
    title: 'Generation time (warm process, median)',
    unitHint: 'lower is better · median of the measured runs after a warm-up run',
  },
  {
    value: 'cold',
    label: 'Cold run',
    title: 'Cold run: import + one generation in a new process',
    unitHint: 'lower is better · what a single CLI run costs',
  },
  {
    value: 'memory',
    label: 'Memory',
    title: 'Peak memory (RSS) of a cold run',
    unitHint: 'lower is better',
  },
];

const SERIES: { id: LibraryId; className: string }[] = [
  { id: 'es', className: 'bg-series-es' },
  { id: 'original', className: 'bg-series-original' },
];

export function BenchmarkLegend({ report }: { report: BenchmarkReport }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-muted" aria-label="Legend">
      {SERIES.map(({ id, className }) => (
        <li key={id} className="inline-flex items-center gap-2">
          <span aria-hidden className={`inline-block h-2.5 w-4 rounded-[3px] ${className}`} />
          <span className="font-medium text-fg">{report.libraries[id].name}</span>
          <span className="font-mono text-xs">{versionLabel(report, id)}</span>
        </li>
      ))}
    </ul>
  );
}

function Bar({
  result,
  library,
  metric,
  max,
  report,
  className,
}: {
  result: BenchmarkResult;
  library: LibraryId;
  metric: Metric;
  max: number;
  report: BenchmarkReport;
  className: string;
}) {
  const measurement = result.libraries[library];
  const value = metricValue(measurement, metric);
  // a visible minimum, so a tiny value still has a mark next to its label
  const width = Math.max((value / max) * 100, 0.6);
  const name = report.libraries[library].name;
  const detail =
    metric === 'warm'
      ? `min ${formatMs(measurement.warm.minMs)} · ${measurement.warm.runs} runs`
      : metric === 'cold'
        ? `import ${formatMs(measurement.cold.importMs)} + generation ${formatMs(measurement.cold.generateMs)}`
        : `${measurement.files} file${measurement.files === 1 ? '' : 's'} · ${Math.round(measurement.outputKb)} KB output`;

  return (
    <div className="group/bar relative flex h-5 items-center gap-2">
      <div
        tabIndex={0}
        role="img"
        aria-label={`${name}: ${formatMetric(value, metric)} (${detail})`}
        className="relative flex h-full min-w-0 flex-1 items-center gap-2 rounded-[4px] outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="flex h-full min-w-0 flex-1 items-center">
          <div
            className={`h-3 rounded-r-[4px] transition-[width] duration-500 ease-out ${className}`}
            style={{ width: `${width}%` }}
          />
        </div>
        <span className="w-16 shrink-0 text-right font-mono text-xs tabular-nums text-fg">
          {formatMetric(value, metric)}
        </span>
        <div
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-0 z-20 mb-1.5 hidden w-max max-w-[280px] rounded-lg border border-border bg-surface px-3 py-2 text-xs shadow-md group-hover/bar:block group-focus-within/bar:block"
        >
          <p className="flex items-center gap-2 font-medium text-fg">
            <span aria-hidden className={`inline-block h-2 w-3 rounded-[2px] ${className}`} />
            {name}
          </p>
          <p className="mt-1 font-mono tabular-nums text-fg">{formatMetric(value, metric)}</p>
          <p className="mt-0.5 text-fg-muted">{detail}</p>
        </div>
      </div>
    </div>
  );
}

export function BenchmarkChart({ report }: { report: BenchmarkReport }) {
  const [metric, setMetric] = useState<Metric>('warm');
  const current = METRICS.find((item) => item.value === metric) ?? METRICS[0];
  const documents = Object.keys(report.documents).filter((id) =>
    report.results.some((result) => result.document === id)
  );

  return (
    <section aria-labelledby="chart-heading" className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 id="chart-heading" className="text-lg font-semibold tracking-tight text-fg">
            {current.title}
          </h2>
          <p className="mt-1 text-sm text-fg-muted">{current.unitHint}</p>
        </div>
        <Segmented
          label="Metric"
          items={METRICS.map(({ value, label }) => ({ value, label }))}
          value={metric}
          onChange={setMetric}
          testIdPrefix="metric"
        />
      </div>

      <div className="mt-4">
        <BenchmarkLegend report={report} />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {documents.map((documentId) => {
          const rows = report.results.filter((result) => result.document === documentId);
          // one linear scale per document (both libraries and every option set share it)
          const max = Math.max(
            ...rows.flatMap((row) => SERIES.map(({ id }) => metricValue(row.libraries[id], metric)))
          );
          const documentInfo = report.documents[documentId];
          return (
            <figure
              key={documentId}
              className="rounded-xl border border-border bg-bg-subtle p-4"
              aria-label={`${documentInfo.label}: ${current.title}`}
            >
              <figcaption>
                <p className="text-sm font-semibold text-fg">{documentInfo.label}</p>
                <p className="mt-0.5 text-xs text-fg-muted">{documentInfo.detail}</p>
              </figcaption>
              <div className="mt-4 space-y-4">
                {rows.map((row) => {
                  const factor = ratio(row, metric);
                  return (
                    <div key={row.id}>
                      <div className="mb-1.5 flex items-center justify-between gap-2">
                        <p className="text-xs font-medium text-fg-muted">
                          {report.optionSets[row.options]?.label ?? row.options}
                        </p>
                        <p
                          className="rounded-full border border-accent-border bg-accent-soft px-2 py-0.5 font-mono text-[11px] font-medium tabular-nums text-accent-strong"
                          title={`swagger-typescript-api needs ${formatRatio(factor)} the ${metric === 'memory' ? 'memory' : 'time'}`}
                        >
                          {formatRatio(factor)} {metric === 'memory' ? 'less memory' : 'faster'}
                        </p>
                      </div>
                      <div className="space-y-0.5">
                        {SERIES.map(({ id, className }) => (
                          <Bar
                            key={id}
                            result={row}
                            library={id}
                            metric={metric}
                            max={max}
                            report={report}
                            className={className}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
