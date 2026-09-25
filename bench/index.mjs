/**
 * Generation benchmark of the built library (`npm run bench` builds first).
 *
 *   node bench/index.mjs [--runs 5] [--filter small]
 *
 * Prints the median / min time of each scenario and the import time of the package.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { generateSpec } from './generate-spec.mjs';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const entry = pathToFileURL(path.join(rootDir, 'dist/index.mjs')).href;

const args = process.argv.slice(2);
const argValue = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? fallback : args[index + 1];
};
const runs = Number(argValue('runs', 5));
const filter = argValue('filter', '');

const petstore = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'tests/fixtures/petstore.json'), 'utf8')
);
const medium = generateSpec({ schemas: 300, operations: 600 });
const large = generateSpec({ schemas: 1500, operations: 3000 });

const scenarios = [
  { name: 'petstore (small)', spec: petstore },
  { name: 'petstore modular', spec: petstore, options: { modular: true } },
  { name: 'petstore toJS', spec: petstore, options: { toJS: true } },
  { name: 'medium 300 schemas / 600 ops', spec: medium },
  { name: 'large 1500 schemas / 3000 ops', spec: large },
  { name: 'large modular', spec: large, options: { modular: true } },
  {
    name: 'large extract* + route types',
    spec: large,
    options: { extractRequestParams: true, extractEnums: true, generateRouteTypes: true },
  },
].filter((scenario) => scenario.name.includes(filter));

const importTime = () => {
  const code = `const t = performance.now(); await import(${JSON.stringify(entry)}); process.stdout.write(String(performance.now() - t));`;
  const times = Array.from({ length: runs }, () => {
    const { stdout } = spawnSync(process.execPath, ['--input-type=module', '-e', code], {
      encoding: 'utf8',
    });
    return Number(stdout);
  });
  return times;
};

const stats = (times) => {
  const sorted = [...times].sort((a, b) => a - b);
  return { median: sorted[Math.floor(sorted.length / 2)], min: sorted[0] };
};

const format = (ms) => `${ms.toFixed(0).padStart(6)} ms`;

const main = async () => {
  const { generateApi } = await import(entry);
  const rows = [];

  const imports = stats(importTime());
  rows.push({ name: 'import package (cold, new process)', ...imports, output: '' });

  for (const scenario of scenarios) {
    const times = [];
    let outputSize = 0;
    // one warm-up run (JIT), not measured
    await generateApi({ spec: scenario.spec, output: false, silent: true, ...scenario.options });
    for (let i = 0; i < runs; i++) {
      const start = performance.now();
      const result = await generateApi({
        spec: structuredClone(scenario.spec),
        output: false,
        silent: true,
        ...scenario.options,
      });
      times.push(performance.now() - start);
      outputSize = result.files.reduce((size, file) => size + file.fileContent.length, 0);
    }
    rows.push({
      name: scenario.name,
      ...stats(times),
      output: `${(outputSize / 1024).toFixed(0)} KB`,
    });
  }

  console.log(`node ${process.version}, ${runs} runs per scenario\n`);
  console.log(`${'scenario'.padEnd(38)}${'median'.padStart(9)}${'min'.padStart(10)}   output`);
  for (const row of rows) {
    console.log(`${row.name.padEnd(38)}${format(row.median)} ${format(row.min)}   ${row.output}`);
  }
};

await main();
