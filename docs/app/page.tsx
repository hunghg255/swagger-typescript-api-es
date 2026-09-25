import {
  ArrowRight,
  Boxes,
  FileJson2,
  ListTree,
  type LucideIcon,
  Package,
  Plug,
  Puzzle,
  ShieldCheck,
  SquareTerminal,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { CodeBlock } from '@/components/code-block';
import { CopyButton } from '@/components/copy-button';
import { GithubIcon } from '@/components/icons';
import { getLibraryVersion } from '@/components/repo-files';
import { site } from '@/components/site-config';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: { absolute: `${site.name} — ${site.tagline}` },
  description: site.description,
  openGraph: { title: site.name, description: site.description },
};

const FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: FileJson2,
    title: 'OpenAPI 3.x & Swagger 2',
    body: 'JSON or YAML, from a URL or a local file. Swagger 2.0 is converted to OpenAPI 3 automatically.',
  },
  {
    icon: Plug,
    title: 'fetch or axios',
    body: 'A zero-dependency fetch client by default, or an axios client with interceptors and your own instance.',
  },
  {
    icon: Boxes,
    title: 'Modular output',
    body: 'One file, or a split into http-client, data-contracts and one class per route module.',
  },
  {
    icon: ListTree,
    title: 'Enums & extraction',
    body: 'Union or TypeScript enums, and extracted types for request params, bodies, responses and errors.',
  },
  {
    icon: Puzzle,
    title: 'Hooks & templates',
    body: 'Rename types and routes with hooks, or take full control of the output with Eta templates.',
  },
  {
    icon: ShieldCheck,
    title: 'Strict types',
    body: 'Every path, query, body and response is typed, so the compiler catches API drift before runtime.',
  },
  {
    icon: Package,
    title: 'ESM & TypeScript',
    body: 'Written in TypeScript and shipped as ESM only, formatted with the fast oxfmt formatter.',
  },
  {
    icon: SquareTerminal,
    title: 'CLI, config or code',
    body: 'Run the CLI, commit a typed swagger-typescript-api.config.ts, or call generateApi() from a script.',
  },
];

const CONFIG_EXAMPLE = `import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig({
  url: 'https://petstore.example.com/openapi.json',
  output: './src/api',
  httpClientType: 'fetch',
  extractEnums: true,
  unwrapResponseData: true,
});`;

const USAGE_EXAMPLE = `import { Api, type Pet } from './api/Api';

const api = new Api({ baseUrl: 'https://petstore.dev/v1' });
api.setSecurityData(token);

// path params, query and response are all typed
const pet: Pet = await api.pets.getPet(42);
const page = await api.pets.listPets({ limit: 20 });

await api.pets.createPet({ name: 'Rex' });
//                         ^ NewPet: typos are compile errors`;

export default function HomePage() {
  const version = getLibraryVersion();
  return (
    <>
      <main id="main">
        {/* Hero */}
        <section className="relative isolate overflow-hidden border-b border-border">
          <div
            aria-hidden
            className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)]"
          />
          <div
            aria-hidden
            className="absolute top-[-220px] left-1/2 -z-10 h-[480px] w-[900px] max-w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--ring)_22%,transparent),transparent)] blur-2xl"
          />
          <div className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-20 pb-20 text-center sm:px-6 sm:pt-28 sm:pb-24">
            <a
              href={`${site.repo}/releases`}
              target="_blank"
              rel="noreferrer"
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 py-1 pr-3 pl-1 text-xs font-medium text-fg-muted shadow-sm backdrop-blur transition-colors hover:border-border-strong hover:text-fg"
            >
              <span className="rounded-full bg-accent-soft px-2 py-0.5 font-semibold text-accent">
                {version ? `v${version}` : 'New'}
              </span>
              <span>
                ESM + TypeScript rewrite<span className="max-sm:hidden"> of swagger-typescript-api</span>
              </span>
              <ArrowRight className="size-3" aria-hidden />
            </a>
            <h1 className="text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.035em] text-balance text-fg sm:text-6xl md:text-[4.25rem]">
              Typed API clients,
              <br className="hidden sm:block" />{' '}
              <span className="bg-gradient-to-b from-fg to-fg-muted bg-clip-text text-transparent">
                straight from your spec.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-fg-muted sm:text-lg">
              <span className="font-medium text-fg">{site.name}</span> turns OpenAPI 3 and Swagger 2 schemas into a
              fully typed <code className="font-mono text-[0.9em] text-fg">fetch</code> or{' '}
              <code className="font-mono text-[0.9em] text-fg">axios</code> client with data contracts — one command,
              zero hand-written types.
            </p>

            <div className="mt-9 flex w-full max-w-md items-center gap-2 rounded-xl border border-border bg-surface py-1.5 pr-1.5 pl-4 font-mono text-[13px] shadow-md sm:text-sm">
              <span className="text-fg-subtle select-none" aria-hidden>
                $
              </span>
              <code className="min-w-0 flex-1 truncate text-left text-fg" data-testid="install-command">
                {site.install}
              </code>
              <CopyButton text={site.install} label="Copy install command" />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/docs"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-fg px-5 text-sm font-medium text-bg shadow-sm transition-opacity hover:opacity-90"
              >
                Read the docs <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/playground"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-surface px-5 text-sm font-medium text-fg shadow-sm transition-colors hover:border-border-strong hover:bg-muted"
              >
                Open playground
              </Link>
            </div>
          </div>
        </section>

        {/* Code example */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24" aria-labelledby="how-heading">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-accent">How it works</p>
            <h2 id="how-heading" className="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Configure once. Regenerate forever.
            </h2>
            <p className="mt-4 text-fg-muted">
              Point it at your schema, run <code className="font-mono text-[0.9em] text-fg">npx swagger-typescript-api-es</code>,
              and import a client whose every method is typed end to end.
            </p>
          </div>
          <div className="mt-12 grid min-w-0 gap-5 lg:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-3">
              <Step n={1} title="Describe the output" />
              <CodeBlock code={CONFIG_EXAMPLE} lang="ts" title="swagger-typescript-api.config.ts" className="shadow-md" />
            </div>
            <div className="flex min-w-0 flex-col gap-3">
              <Step n={2} title="Call your API with types" />
              <CodeBlock code={USAGE_EXAMPLE} lang="ts" title="src/pets.ts" className="shadow-md" />
            </div>
          </div>
          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/usage" className="inline-flex items-center gap-1.5 font-medium text-fg hover:text-accent">
              Next: using the generated client <ArrowRight className="size-3.5" aria-hidden />
            </Link>
            <Link href="/skills" className="inline-flex items-center gap-1.5 font-medium text-fg hover:text-accent">
              Install the AI agent skill <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </p>
        </section>

        {/* Features */}
        <section className="border-y border-border bg-bg-subtle" aria-labelledby="features-heading">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-accent">Features</p>
              <h2 id="features-heading" className="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                Everything a real-world API needs
              </h2>
            </div>
            <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map(({ icon: Icon, title, body }) => (
                <li key={title} className="bg-surface p-6 transition-colors hover:bg-bg-subtle">
                  <span className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-bg-subtle text-accent">
                    <Icon className="size-[18px]" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-[15px] font-semibold text-fg">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="relative isolate overflow-hidden rounded-2xl border border-border bg-surface px-6 py-12 text-center shadow-md sm:px-12 sm:py-16">
            <div
              aria-hidden
              className="absolute inset-x-0 -top-24 -z-10 mx-auto h-48 w-[600px] max-w-full rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--ring)_18%,transparent),transparent)] blur-xl"
            />
            <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Try it on your own schema</h2>
            <p className="mx-auto mt-3 max-w-xl text-fg-muted">
              Paste a spec, flip options, and download the generated client — right in the browser.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/playground"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-fg px-5 text-sm font-medium text-bg shadow-sm transition-opacity hover:opacity-90"
              >
                Open the playground <ArrowRight className="size-4" aria-hidden />
              </Link>
              <a
                href={site.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-surface px-5 text-sm font-medium text-fg transition-colors hover:border-border-strong hover:bg-muted"
              >
                <GithubIcon className="size-4" /> Star on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function Step({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex size-6 items-center justify-center rounded-full border border-border bg-surface font-mono text-xs font-semibold text-fg">
        {n}
      </span>
      <span className="text-sm font-medium text-fg">{title}</span>
    </div>
  );
}
