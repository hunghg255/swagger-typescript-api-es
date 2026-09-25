import {
  AlertTriangle,
  ArrowRight,
  Braces,
  ChevronRight,
  FileCode2,
  FileText,
  Folder,
  Plug,
  Puzzle,
  Rocket,
  SlidersHorizontal,
  Terminal,
  type LucideIcon,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { Components } from 'react-markdown';
import { MarkdownAsync } from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { markdownComponents } from '@/app/docs/_lib/markdown-components';
import { rehypeShiki } from '@/app/docs/_lib/rehype';
import { CodeBlock } from '@/components/code-block';
import { CopyButton } from '@/components/copy-button';
import { GithubIcon } from '@/components/icons';
import { site } from '@/components/site-config';
import { SiteFooter } from '@/components/site-footer';

import { loadSkill, SKILL_DIR } from './_lib/skill';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'AI agent skill',
  description: `An agent skill for Claude Code and other coding agents: teach your agent to set up ${site.name}, write its config, pick options and use the generated client.`,
  openGraph: { title: `AI agent skill · ${site.name}` },
};

/** exactly the command of the README "AI agent skill" section */
const INSTALL_COMMAND = 'npx skills add hunghg255/swagger-typescript-api-es';

const skillUrl = `${site.repo}/tree/main/${SKILL_DIR}`;
const fileUrl = (file: string) => `${site.repo}/blob/main/${SKILL_DIR}/${file}`;

const TOPICS: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Rocket, title: 'Setup', body: 'Installing the package, Node.js and ESM requirements, the first generation.' },
  { icon: Terminal, title: 'CLI and config file', body: 'Flags, swagger-typescript-api.config.ts, arrays of configs and precedence.' },
  { icon: SlidersHorizontal, title: 'Options', body: 'Every generator option: input, output, client, types, extraction, naming.' },
  { icon: Puzzle, title: 'Hooks', body: 'Renaming types and routes, changing parsed schemas and route data.' },
  { icon: FileCode2, title: 'Templates', body: 'Copying the built-in Eta templates and overriding parts of the output.' },
  { icon: Plug, title: 'The generated client', body: 'Creating the client, auth, errors, modular output and shared HttpClients.' },
  { icon: AlertTriangle, title: 'Gotchas', body: 'The mistakes agents (and people) make, with the right fix for each.' },
];

const PROMPTS = [
  'Set up swagger-typescript-api-es in this project: generate an axios client from http://localhost:3000/api-json into src/api and add a gen-api script.',
  'Our spec is ./openapi.yaml. Generate a modular fetch client where every module shares one HttpClient.',
  'Send a bearer token with every request of the generated client and refresh it when it expires.',
  'Rename every generated type so that it ends with Dto, and keep the enums as union types.',
  'Methods return the whole response; make them resolve with the data directly and update the callers.',
  'Wrap the generated pets endpoints in React Query hooks, with request cancellation.',
];

const STEPS = [
  {
    title: 'Discovery',
    body: 'At startup the agent only reads the name and description of each installed skill.',
  },
  {
    title: 'Activation',
    body: 'When your request matches the description, the agent reads SKILL.md: the workflow and rules.',
  },
  {
    title: 'Details on demand',
    body: 'Reference files (the full options list, patterns, …) are opened only when the task needs them.',
  },
];

function Code({ children }: { children: React.ReactNode }) {
  return <code className="rounded bg-muted px-1 font-mono text-[0.85em] text-fg">{children}</code>;
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-20 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
      {children}
    </h2>
  );
}

function formatSize(bytes: number) {
  return bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`;
}

/** SKILL.md preview: headings are demoted below the page's h2 and relative links point to GitHub */
const previewComponents: Components = {
  ...markdownComponents,
  h1: ({ children }) => <h3>{children}</h3>,
  h2: ({ children }) => <h4>{children}</h4>,
  h3: ({ children }) => <h4>{children}</h4>,
  h4: ({ children }) => <h4>{children}</h4>,
  a: ({ href, children }) => {
    const external = !!href && /^[a-z]+:/i.test(href);
    const resolved = !href || external || href.startsWith('#') ? href : fileUrl(href.replace(/^\.\//, ''));
    return (
      <a href={resolved} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  },
};

export default async function SkillsPage() {
  const skill = loadSkill();
  const preview = skill
    ? await MarkdownAsync({
        children: skill.body,
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeShiki],
        components: previewComponents,
      })
    : null;

  return (
    <>
      <main id="main" className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold text-accent">AI agent skill</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance text-fg sm:text-4xl">
            Teach your coding agent {site.name}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            The repository ships an agent skill: a folder of instructions that Claude Code and other coding agents load
            when you ask them to generate or use an API client. With it, the agent knows the CLI flags, the config
            file, every option and the usual pitfalls, instead of guessing from the original swagger-typescript-api.
          </p>

          <div className="mt-8 flex w-full max-w-xl items-center gap-2 rounded-xl border border-border bg-surface py-1.5 pr-1.5 pl-4 font-mono text-[13px] shadow-md sm:text-sm">
            <span className="text-fg-subtle select-none" aria-hidden>
              $
            </span>
            <code className="min-w-0 flex-1 text-left text-fg max-sm:break-all sm:truncate" data-testid="skill-install-command">
              {INSTALL_COMMAND}
            </code>
            <CopyButton text={INSTALL_COMMAND} label="Copy install command" />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={skillUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-fg px-3.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              <GithubIcon className="size-4" /> Browse the skill on GitHub
            </a>
            <a
              href={fileUrl('SKILL.md')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3.5 text-sm font-medium text-fg transition-colors hover:bg-muted"
            >
              <FileText className="size-4" aria-hidden /> Read SKILL.md
            </a>
          </div>
        </header>

        <section aria-labelledby="what-is-a-skill" className="mt-16">
          <SectionHeading id="what-is-a-skill">What is an agent skill?</SectionHeading>
          <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
            <div className="max-w-2xl space-y-4 text-[15px] leading-relaxed text-fg-muted">
              <p>
                A skill is a folder with a <Code>SKILL.md</Code> file: a short front matter (a name and a description
                of when to use it) followed by instructions in Markdown, plus optional reference files. Coding agents
                such as Claude Code load skills from <Code>.claude/skills/</Code> in your project or{' '}
                <Code>~/.claude/skills/</Code> in your home folder.
              </p>
              <p>
                Skills are loaded progressively, so an installed skill costs almost nothing until it is needed:
              </p>
              <ol className="grid gap-3 sm:grid-cols-3">
                {STEPS.map((step, index) => (
                  <li key={step.title} className="rounded-xl border border-border bg-surface p-4">
                    <span className="flex size-6 items-center justify-center rounded-full bg-accent-soft font-mono text-xs font-semibold text-accent">
                      {index + 1}
                    </span>
                    <p className="mt-3 text-sm font-semibold text-fg">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
            {skill?.description ? (
              <aside className="h-fit rounded-2xl border border-border bg-bg-subtle p-5">
                <p className="text-xs font-semibold tracking-wide text-fg-subtle uppercase">When it activates</p>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted" data-testid="skill-description">
                  {skill.description}
                </p>
                <p className="mt-4 font-mono text-xs text-fg-subtle">
                  {skill.name}
                  {skill.version ? ` · v${skill.version}` : ''}
                </p>
              </aside>
            ) : null}
          </div>
        </section>

        <section aria-labelledby="what-it-covers" className="mt-16">
          <SectionHeading id="what-it-covers">What it covers</SectionHeading>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {TOPICS.map(({ icon: Icon, title, body }) => (
              <li key={title} className="bg-surface p-5">
                <span className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-bg-subtle text-accent">
                  <Icon className="size-4" aria-hidden />
                </span>
                <h3 className="mt-3 text-[15px] font-semibold text-fg">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-fg-muted">{body}</p>
              </li>
            ))}
            <li className="flex flex-col justify-center bg-bg-subtle p-5">
              <p className="text-sm leading-relaxed text-fg-muted">The same ground as the human docs, written for an agent.</p>
              <Link href="/docs" className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-fg hover:text-accent">
                Read the docs <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </li>
          </ul>
        </section>

        <section aria-labelledby="install" className="mt-16 max-w-3xl">
          <SectionHeading id="install">Install</SectionHeading>
          <h3 className="mt-6 text-base font-semibold text-fg">With the skills CLI</h3>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            Installs the skill of this repository with <Code>npx</Code>, nothing to add to your dependencies:
          </p>
          <CodeBlock className="mt-3" lang="bash" title="Terminal" code={INSTALL_COMMAND} />

          <h3 className="mt-8 text-base font-semibold text-fg">Manually</h3>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            Copy the <Code>{SKILL_DIR}</Code> folder into a skills folder. In the project, the skill is shared with
            everyone who clones it; in your home folder, it is available in all your projects.
          </p>
          <CodeBlock
            className="mt-3"
            lang="bash"
            title="Terminal"
            code={`git clone --depth 1 ${site.repo}.git /tmp/sta-es

# for this project (commit it to share it with your team)
mkdir -p .claude/skills
cp -r /tmp/sta-es/${SKILL_DIR} .claude/skills/

# or for every project on your machine
mkdir -p ~/.claude/skills
cp -r /tmp/sta-es/${SKILL_DIR} ~/.claude/skills/`}
          />
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">
            Start a new agent session afterwards: skills are discovered when the session starts. Update the skill the
            same way when a new version of the library is released.
          </p>
        </section>

        <section aria-labelledby="example-prompts" className="mt-16">
          <SectionHeading id="example-prompts">Example prompts</SectionHeading>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted">
            No special syntax: ask for what you want and the agent loads the skill when the request is about
            generating or using the client.
          </p>
          <ul className="mt-6 grid gap-3 md:grid-cols-2" data-testid="skill-prompts">
            {PROMPTS.map((prompt) => (
              <li
                key={prompt}
                className="flex items-start gap-3 rounded-xl border border-border bg-surface py-3 pr-2 pl-4 shadow-sm"
              >
                <ChevronRight className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <p className="min-w-0 flex-1 text-sm leading-relaxed text-fg">{prompt}</p>
                <CopyButton text={prompt} label="Copy prompt" />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="whats-inside" className="mt-16">
          <SectionHeading id="whats-inside">What&apos;s inside</SectionHeading>
          {skill ? (
            <>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted">
                The files of <Code>{SKILL_DIR}</Code>, read when this site was built.
              </p>
              <div className="mt-6 overflow-hidden rounded-xl border border-border bg-surface" data-testid="skill-files">
                <div className="flex items-center gap-2 border-b border-border bg-bg-subtle px-4 py-2.5 font-mono text-xs text-fg-muted">
                  <Folder className="size-4 text-fg-subtle" aria-hidden />
                  {SKILL_DIR}/
                </div>
                <ul className="divide-y divide-border">
                  {skill.files.map((file) => {
                    const depth = file.path.split('/').length - 1;
                    return (
                      <li key={file.path}>
                        <a
                          href={fileUrl(file.path)}
                          target="_blank"
                          rel="noreferrer"
                          className="flex flex-col gap-0.5 px-4 py-3 transition-colors hover:bg-bg-subtle sm:flex-row sm:items-center sm:gap-4"
                        >
                          <span
                            className="flex min-w-0 items-center gap-2 font-mono text-[13px] text-fg sm:w-64 sm:shrink-0"
                            style={{ paddingLeft: depth ? `${depth * 0.75}rem` : undefined }}
                          >
                            <FileText className="size-4 shrink-0 text-fg-subtle" aria-hidden />
                            <span className="truncate">{file.path}</span>
                          </span>
                          <span className="min-w-0 flex-1 truncate pl-6 text-sm text-fg-muted sm:pl-0">
                            {file.heading ?? ''}
                          </span>
                          <span className="pl-6 font-mono text-xs text-fg-subtle tabular-nums sm:pl-0">
                            {file.lines} lines · {formatSize(file.bytes)}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          ) : (
            <p className="mt-2 text-sm text-fg-muted">
              The skill folder was not available when this site was built.{' '}
              <a href={skillUrl} className="font-medium text-fg underline underline-offset-4">
                See it on GitHub
              </a>
              .
            </p>
          )}

          {preview ? (
            <details className="group mt-6 rounded-xl border border-border bg-surface" data-testid="skill-preview">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-fg select-none hover:bg-bg-subtle [&::-webkit-details-marker]:hidden">
                <ChevronRight className="size-4 text-fg-subtle transition-transform group-open:rotate-90" aria-hidden />
                <Braces className="size-4 text-fg-subtle" aria-hidden />
                Preview SKILL.md
              </summary>
              <div className="prose-docs border-t border-border px-4 py-6 sm:px-6">{preview}</div>
            </details>
          ) : null}
        </section>

        <div className="mt-16 flex flex-wrap gap-x-6 gap-y-3">
          <Link href="/usage" className="inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-accent">
            Using the generated client <ArrowRight aria-hidden className="size-4" />
          </Link>
          <Link href="/docs" className="inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-accent">
            Read the docs <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
