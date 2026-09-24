import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { NextConfig } from 'next';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // the generator uses a native formatter (oxfmt) and reads its templates from disk,
  // so it must run as a regular Node.js package instead of being bundled
  serverExternalPackages: ['swagger-typescript-api-es', 'oxfmt', 'typescript', 'swagger2openapi'],
  // `swagger-typescript-api-es` is linked from the repository root (file:..)
  outputFileTracingRoot: path.join(rootDir, '..'),
  outputFileTracingIncludes: {
    '/api/generate': ['../dist/**', '../templates/**', '../node_modules/@oxfmt/**'],
  },
};

export default nextConfig;
