/** shape of `results.json`, written by `bench/compare/run.mjs` */

export type LibraryId = 'es' | 'original';

export interface LibraryMeasurement {
  /** new process: import + one generation (like a CLI run) */
  cold: {
    medianMs: number;
    minMs: number;
    importMs: number;
    generateMs: number;
    maxRssMb: number;
  };
  /** one process, after a warm-up generation */
  warm: { medianMs: number; minMs: number; runs: number };
  outputKb: number;
  files: number;
}

export interface BenchmarkResult {
  id: string;
  document: string;
  options: string;
  libraries: Record<LibraryId, LibraryMeasurement>;
}

export interface BenchmarkReport {
  generatedAt: string;
  commit: string | null;
  environment: { node: string; platform: string; cpu: string; cores: number; memoryGb: number };
  settings: { warmRuns: number; coldRuns: number };
  libraries: Record<LibraryId, { name: string; version: string }>;
  documents: Record<string, { label: string; detail: string }>;
  optionSets: Record<string, { label: string; options: Record<string, unknown> }>;
  results: BenchmarkResult[];
}

export type Metric = 'warm' | 'cold' | 'memory';

export const metricValue = (measurement: LibraryMeasurement, metric: Metric) =>
  metric === 'warm'
    ? measurement.warm.medianMs
    : metric === 'cold'
      ? measurement.cold.medianMs
      : measurement.cold.maxRssMb;

export const formatMs = (ms: number) =>
  ms >= 1000 ? `${(ms / 1000).toFixed(ms >= 10_000 ? 1 : 2)} s` : `${ms < 10 ? ms.toFixed(1) : Math.round(ms)} ms`;

export const formatMetric = (value: number, metric: Metric) =>
  metric === 'memory' ? `${Math.round(value)} MB` : formatMs(value);

/** how many times the original needs more (time / memory) than swagger-typescript-api-es */
export const ratio = (result: BenchmarkResult, metric: Metric) =>
  metricValue(result.libraries.original, metric) / metricValue(result.libraries.es, metric);

export const formatRatio = (value: number) => `${value >= 10 ? Math.round(value) : value.toFixed(1)}×`;

/** version label: the measured code of swagger-typescript-api-es is the repository at `commit` */
export const versionLabel = (report: BenchmarkReport, library: LibraryId) =>
  library === 'es' && report.commit
    ? `v${report.libraries.es.version}+${report.commit}`
    : `v${report.libraries[library].version}`;
