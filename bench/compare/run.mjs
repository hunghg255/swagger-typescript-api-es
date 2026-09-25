/**
 * Compares swagger-typescript-api-es with the original acacode/swagger-typescript-api.
 *
 *   npm run bench:compare                     # builds, installs the original, runs, writes the results
 *   node bench/compare/run.mjs --runs 5 --filter large --out /tmp/results.json
 *
 * Every measurement runs in its own Node.js process (no JIT / GC state shared between the libraries),
 * both libraries get the same document (`spec`) and the same options, and write nothing to disk
 * (`output: false`). Results are written to `docs/lib/benchmark/results.json` (read by the docs site).
 */
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { generateSpec } from '../generate-spec.mjs';

const benchDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(benchDir, '../..');
const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sta-compare-'));

const args = process.argv.slice(2);
const argValue = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? fallback : args[index + 1];
};
const warmRuns = Number(argValue('runs', 5));
const coldRuns = Number(argValue('cold-runs', 3));
const filter = argValue('filter', '');
const outFile = path.resolve(
  argValue('out', path.join(rootDir, 'docs/lib/benchmark/results.json'))
);

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

const libraries = [
  {
    id: 'es',
    name: 'swagger-typescript-api-es',
    version: readJson(path.join(rootDir, 'package.json')).version,
    entry: pathToFileURL(path.join(rootDir, 'dist/index.mjs')).href,
  },
  {
    id: 'original',
    name: 'swagger-typescript-api',
    version: readJson(path.join(benchDir, 'node_modules/swagger-typescript-api/package.json'))
      .version,
    entry: pathToFileURL(path.join(benchDir, 'node_modules/swagger-typescript-api/dist/index.mjs'))
      .href,
  },
];

// ---- documents (written once, read by every child process)
const writeSpec = (name, spec) => {
  const file = path.join(workDir, `${name}.json`);
  fs.writeFileSync(file, JSON.stringify(spec));
  return file;
};

const documents = {
  petstore: {
    label: 'Petstore',
    detail: 'OpenAPI 3, 15 schemas, 11 operations (tests/fixtures/petstore.json)',
    file: path.join(rootDir, 'tests/fixtures/petstore.json'),
  },
  medium: {
    label: 'Medium',
    detail: 'synthetic OpenAPI 3, 300 schemas, 600 operations',
    file: writeSpec('medium', generateSpec({ schemas: 300, operations: 600 })),
  },
  large: {
    label: 'Large',
    detail: 'synthetic OpenAPI 3, 1500 schemas, 3000 operations',
    file: writeSpec('large', generateSpec({ schemas: 1500, operations: 3000 })),
  },
};

const optionSets = {
  default: { label: 'default', options: {} },
  modular: { label: 'modular', options: { modular: true } },
  extract: {
    label: 'extract* + route types',
    options: {
      extractRequestParams: true,
      extractRequestBody: true,
      extractResponseBody: true,
      extractResponseError: true,
      extractEnums: true,
      generateRouteTypes: true,
    },
  },
};

const scenarios = [
  ['petstore', 'default'],
  ['petstore', 'modular'],
  ['medium', 'default'],
  ['medium', 'modular'],
  ['medium', 'extract'],
  ['large', 'default'],
  ['large', 'modular'],
  ['large', 'extract'],
]
  .map(([document, options]) => ({ id: `${document}-${options}`, document, options }))
  .filter((scenario) => scenario.id.includes(filter));

// ---- child process: import + generate, reports timings as JSON on stdout
const childScript = `
const [entry, specFile, optionsJson, mode, runs] = process.argv.slice(1);
const fs = await import('node:fs');
const text = fs.readFileSync(specFile, 'utf8');
const options = JSON.parse(optionsJson);
const importStart = performance.now();
const { generateApi } = await import(entry);
const importMs = performance.now() - importStart;
const generate = async () => {
  const spec = JSON.parse(text);
  const start = performance.now();
  const result = await generateApi({ ...options, spec, output: false, silent: true });
  return { ms: performance.now() - start, result };
};
const times = [];
let outputBytes = 0;
let files = 0;
if (mode === 'cold') {
  const { ms, result } = await generate();
  times.push(ms);
  outputBytes = result.files.reduce((size, file) => size + Buffer.byteLength(file.fileContent), 0);
  files = result.files.length;
} else {
  await generate(); // warm-up (JIT, lazy loading)
  for (let i = 0; i < Number(runs); i++) {
    const { ms, result } = await generate();
    times.push(ms);
    outputBytes = result.files.reduce((size, file) => size + Buffer.byteLength(file.fileContent), 0);
    files = result.files.length;
  }
}
process.stdout.write(JSON.stringify({ importMs, times, outputBytes, files, maxRssKb: process.resourceUsage().maxRSS }));
`;

const runChild = (library, scenario, mode) => {
  const started = performance.now();
  const { status, stdout, stderr } = spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      childScript,
      library.entry,
      documents[scenario.document].file,
      JSON.stringify(optionSets[scenario.options].options),
      mode,
      String(warmRuns),
    ],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, cwd: workDir }
  );
  if (status !== 0) {
    throw new Error(`${library.name} ${scenario.id} ${mode} failed:\n${stderr}`);
  }
  const lastLine = stdout.trim().split('\n').pop();
  return { ...JSON.parse(lastLine), processMs: performance.now() - started };
};

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};
const round = (value) => Math.round(value * 10) / 10;

const measure = (library, scenario) => {
  // cold: a new process for every run (import + one generation), like running the CLI once
  const cold = Array.from({ length: coldRuns }, () => runChild(library, scenario, 'cold'));
  // warm: one process, one warm-up generation, then `warmRuns` measured generations
  const warm = runChild(library, scenario, 'warm');
  return {
    cold: {
      medianMs: round(median(cold.map((run) => run.importMs + run.times[0]))),
      minMs: round(Math.min(...cold.map((run) => run.importMs + run.times[0]))),
      importMs: round(median(cold.map((run) => run.importMs))),
      generateMs: round(median(cold.map((run) => run.times[0]))),
      maxRssMb: round(median(cold.map((run) => run.maxRssKb / 1024))),
    },
    warm: {
      medianMs: round(median(warm.times)),
      minMs: round(Math.min(...warm.times)),
      runs: warm.times.length,
    },
    outputKb: round(warm.outputBytes / 1024),
    files: warm.files,
  };
};

const gitCommit = () => {
  try {
    return execFileSync('git', ['rev-parse', '--short', 'HEAD'], {
      cwd: rootDir,
      encoding: 'utf8',
    }).trim();
  } catch {
    return null;
  }
};

const main = () => {
  const cpus = os.cpus();
  console.log(
    `node ${process.version}, ${cpus[0]?.model ?? 'unknown CPU'} (${cpus.length} cores), ${warmRuns} warm / ${coldRuns} cold runs`
  );

  const results = [];
  for (const scenario of scenarios) {
    const row = {
      id: scenario.id,
      document: scenario.document,
      options: scenario.options,
      libraries: {},
    };
    // alternate the order so that neither library always runs first
    const ordered = results.length % 2 ? [...libraries].reverse() : libraries;
    for (const library of ordered) {
      row.libraries[library.id] = measure(library, scenario);
    }
    const es = row.libraries.es;
    const original = row.libraries.original;
    console.log(
      `${scenario.id.padEnd(18)} warm ${String(es.warm.medianMs).padStart(8)} ms vs ${String(original.warm.medianMs).padStart(9)} ms` +
        ` (${(original.warm.medianMs / es.warm.medianMs).toFixed(1)}x) | cold ${es.cold.medianMs} vs ${original.cold.medianMs} ms` +
        ` | rss ${es.cold.maxRssMb} vs ${original.cold.maxRssMb} MB`
    );
    results.push(row);
  }

  const report = {
    generatedAt: new Date().toISOString(),
    commit: gitCommit(),
    environment: {
      node: process.version,
      platform: `${os.type()} ${os.release()} (${os.arch()})`,
      cpu: cpus[0]?.model ?? 'unknown',
      cores: cpus.length,
      memoryGb: round(os.totalmem() / 1024 ** 3),
    },
    settings: { warmRuns, coldRuns },
    libraries: Object.fromEntries(
      libraries.map(({ id, name, version }) => [id, { name, version }])
    ),
    documents: Object.fromEntries(
      Object.entries(documents).map(([id, { label, detail }]) => [id, { label, detail }])
    ),
    optionSets: Object.fromEntries(
      Object.entries(optionSets).map(([id, { label, options }]) => [id, { label, options }])
    ),
    results,
  };

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`\nwritten to ${path.relative(process.cwd(), outFile)}`);
  fs.rmSync(workDir, { recursive: true, force: true });
};

main();
