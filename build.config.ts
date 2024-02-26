import fs from 'node:fs/promises';
import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index', 'src/cli'],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: false,
    esbuild: {
      minify: true,
    },
  },
  failOnWarn: false,
});
