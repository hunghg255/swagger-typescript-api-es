import { ArrowRight, BookOpen, FlaskConical } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { DocsMobileNav, DocsSidebar, DocsToc } from '@/components/docs/docs-nav';
import { site } from '@/components/site-config';
import { SiteFooter } from '@/components/site-footer';

import { createHeadings, Note, Snippet, SnippetTabs } from './_lib/ui';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Using the generated client',
  description: `What to do after generating a client with ${site.name}: create it, call endpoints, add headers and auth, handle errors, cancel requests, upload files, and use it with React Query, SWR and Node.js.`,
  openGraph: { title: `Using the generated client · ${site.name}` },
};

const { list: headings, Heading } = createHeadings({
  generate: { text: 'Generate the client', depth: 2 },
  'create-a-client': { text: 'Create a client', depth: 2 },
  'fetch-client': { text: 'fetch', depth: 3 },
  'axios-client': { text: 'axios', depth: 3 },
  'axios-instance': { text: 'Your own axios instance', depth: 3 },
  'client-options': { text: 'Client options', depth: 3 },
  'call-endpoints': { text: 'Call endpoints', depth: 2 },
  'request-params': { text: 'Per-request options', depth: 3 },
  'headers-and-auth': { text: 'Headers and auth', depth: 2 },
  'inject-headers': { text: 'injectHeaders', depth: 3 },
  'security-worker': { text: 'Tokens with securityWorker', depth: 3 },
  'secure-routes': { text: 'Secure routes', depth: 3 },
  'single-http-client': { text: 'Share one HttpClient', depth: 2 },
  'modular-output': { text: 'Modular output', depth: 2 },
  'responses-and-errors': { text: 'Responses and errors', depth: 2 },
  'fetch-responses': { text: 'fetch: HttpResponse', depth: 3 },
  'disable-throw-on-error': { text: 'disableThrowOnError', depth: 3 },
  'axios-responses': { text: 'axios: AxiosError', depth: 3 },
  'unwrap-response-data': { text: 'unwrapResponseData', depth: 3 },
  cancellation: { text: 'Cancel requests', depth: 2 },
  files: { text: 'Upload and download files', depth: 2 },
  'custom-fetch': { text: 'Custom fetch', depth: 2 },
  'react-query-swr': { text: 'React Query and SWR', depth: 2 },
  nodejs: { text: 'Node.js', depth: 2 },
  'typing-tips': { text: 'Typing tips', depth: 2 },
  'data-contracts': { text: 'Data contracts', depth: 3 },
  'route-types': { text: 'Route types', depth: 3 },
});

/** `code` spans in table cells */
function rich(text: string) {
  return text.split(/(`[^`]+`)/).map((part, index) =>
    part.startsWith('`') ? <code key={index}>{part.slice(1, -1)}</code> : part
  );
}

const CLIENT_OPTIONS: [option: string, fetch: string, axios: string, description: string][] = [
  ['Server URL', '`baseUrl`', '`baseURL`', 'Defaults to the first `servers[].url` of the spec.'],
  ['Request defaults', '`baseApiParams`', 'any `AxiosRequestConfig` option', 'Headers, credentials, timeout, … for every request.'],
  ['`securityWorker`', '✓', '✓', 'Returns extra request params for secure requests, from `setSecurityData()`.'],
  ['Always secure', '`baseApiParams.secure`', '`secure`', 'Call the `securityWorker` for every request.'],
  ['Response format', '`baseApiParams.format`', '`format`', 'Default way to read the response body.'],
  ['`injectHeaders`', '✓', '✓', 'Rewrites the final headers of every request (may be async).'],
  ['`customFetch`', '✓', '–', 'Replaces `fetch` (retries, tests, SSR).'],
  ['`instance`', '–', '✓', 'Your own `AxiosInstance` instead of `axios.create()`.'],
];

export default function UsagePage() {
  return (
    <>
      <div className="mx-auto flex w-full max-w-[1440px] px-4 sm:px-6">
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-64 shrink-0 border-r border-border lg:block">
          <DocsSidebar headings={headings} title="Usage" label="Usage sections" />
        </aside>

        <main id="main" className="min-w-0 flex-1 lg:px-10 xl:px-14">
          <DocsMobileNav headings={headings} />
          <div className="mx-auto max-w-3xl pt-10 pb-24 lg:pt-12">
            <header className="mb-12 border-b border-border pb-10">
              <p className="text-sm font-semibold text-accent">Usage</p>
              <h1 className="mt-2 text-[1.7rem] font-semibold tracking-tight text-balance text-fg sm:text-4xl">
                Using the generated client
              </h1>
              <div className="prose-docs mt-4 text-[17px]">
                <p>
                  You generated <code>Api.ts</code>. Now what? This guide covers everything after generation:
                  configuring the client, auth, errors, cancellation, files and framework integration. Every example
                  uses the <code>petstore</code> test schema of the repository and is type-checked in strict mode
                  against the code the generator emits today.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/docs"
                  className="inline-flex h-9 items-center gap-2 rounded-lg bg-fg px-3.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
                >
                  <BookOpen className="size-4" aria-hidden /> Generator docs
                </Link>
                <Link
                  href="/playground"
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3.5 text-sm font-medium text-fg transition-colors hover:bg-muted"
                >
                  <FlaskConical className="size-4" aria-hidden /> See the generated code
                </Link>
              </div>
            </header>

            <article className="prose-docs" data-testid="usage-content">
              <Heading id="generate" />
              <p>
                Install the generator as a dev dependency and point it at your schema. The generated files are plain
                TypeScript with no runtime dependency, except <code>axios</code> for the axios client.
              </p>
              <Snippet id="generateCli" />
              <p>
                Or keep the options in a config file and run <code>npx swagger-typescript-api-es</code> (for example
                from a <code>gen-api</code> script). All options are described in the{' '}
                <Link href="/docs#options-reference">options reference</Link>.
              </p>
              <Snippet id="generateConfig" />
              <p>
                The examples below use the generated names of the petstore schema: <code>api.pets.listPets</code>,{' '}
                <code>api.pets.getPet</code>, <code>api.store.getInventory</code>, … Method names come from{' '}
                <code>operationId</code>, and routes are grouped by the first path segment (<code>/pets/…</code> →{' '}
                <code>api.pets</code>).
              </p>

              <Heading id="create-a-client" />
              <p>
                Create the client once, in its own module, and import it everywhere. <code>Api</code> extends{' '}
                <code>HttpClient</code>, so the constructor takes the HTTP client config.
              </p>
              <Heading id="fetch-client">
                <code>fetch</code>
              </Heading>
              <Snippet id="fetchCreate" />
              <Note title="Defaults are replaced, not merged">
                <code>baseApiParams</code> replaces the built-in defaults (
                <code>credentials: &apos;same-origin&apos;</code>, <code>redirect: &apos;follow&apos;</code>,{' '}
                <code>referrerPolicy: &apos;no-referrer&apos;</code>), so repeat the ones you still want. In the same
                way, <code>baseUrl: undefined</code> (an unset environment variable) removes the default server URL:
                write <code>process.env.API_URL ?? &apos;https://…&apos;</code>.
              </Note>
              <Heading id="axios-client">
                <code>axios</code>
              </Heading>
              <p>
                The axios client passes the config to <code>axios.create()</code>, so every{' '}
                <code>AxiosRequestConfig</code> option works.
              </p>
              <Snippet id="axiosCreate" />
              <Heading id="axios-instance" />
              <p>
                Pass <code>instance</code> to reuse an axios instance that already has interceptors, retries or
                a custom adapter. The client then uses it as is.
              </p>
              <Snippet id="axiosInstance" />
              <Heading id="client-options" />
              <div className="scrollbar-thin my-6 overflow-x-auto rounded-xl border border-border" role="region" aria-label="Client options" tabIndex={0}>
                <table className="min-w-[640px]">
                  <thead>
                    <tr>
                      <th scope="col">Option</th>
                      <th scope="col">fetch</th>
                      <th scope="col">axios</th>
                      <th scope="col">What it does</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CLIENT_OPTIONS.map(([option, fetchValue, axiosValue, description]) => (
                      <tr key={option}>
                        <td className="font-medium text-fg">{rich(option)}</td>
                        <td>{rich(fetchValue)}</td>
                        <td>{rich(axiosValue)}</td>
                        <td>{rich(description)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Heading id="call-endpoints" />
              <p>
                Each operation is a method. Path parameters come first as positional arguments, then the query object,
                then the request body. The last argument is always an optional <code>RequestParams</code>. Everything is
                typed from the schema, so a wrong field or a missing required property is a compile error.
              </p>
              <Snippet id="callMethods" />
              <Heading id="request-params" />
              <p>
                <code>RequestParams</code> is the per-call escape hatch. For the fetch client it accepts any{' '}
                <code>RequestInit</code> option plus <code>secure</code>, <code>type</code>, <code>format</code>,{' '}
                <code>baseUrl</code> and <code>cancelToken</code>. For axios it is an <code>AxiosRequestConfig</code>{' '}
                plus <code>secure</code>, <code>type</code> and <code>format</code>.
              </p>
              <SnippetTabs fetch="requestParams" axios="requestParamsAxios" />

              <Heading id="headers-and-auth" />
              <p>Headers are merged in this order, the last one wins:</p>
              <ol>
                <li>
                  client defaults: <code>baseApiParams.headers</code> (fetch) or <code>headers</code> (axios);
                </li>
                <li>
                  the <code>headers</code> of the call&apos;s <code>RequestParams</code>;
                </li>
                <li>
                  what the <code>securityWorker</code> returns, for secure requests;
                </li>
                <li>
                  the <code>Content-Type</code> of the operation (not set for <code>multipart/form-data</code>, the
                  browser adds the boundary);
                </li>
                <li>
                  finally <code>injectHeaders</code> can rewrite the result.
                </li>
              </ol>
              <Heading id="inject-headers">
                <code>injectHeaders</code>
              </Heading>
              <p>
                Both clients accept <code>injectHeaders: (headers) =&gt; headers | Promise&lt;headers&gt;</code>. It
                runs before every request, after all the merging, which makes it the place for values that change
                over time: a CSRF token, the current locale, a tracing id.
              </p>
              <Snippet id="injectHeaders" />
              <Heading id="security-worker">
                Tokens with <code>securityWorker</code>
              </Heading>
              <p>
                The type argument of <code>Api</code> is the type of your security data. Store it with{' '}
                <code>api.setSecurityData()</code> after login, and the <code>securityWorker</code> turns it into
                request params (usually an <code>Authorization</code> header) for every secure request.
              </p>
              <SnippetTabs fetch="securityWorker" axios="securityWorkerAxios" />
              <p>The worker can be async, for example to refresh an expired token first:</p>
              <Snippet id="securityWorkerAsync" />
              <Heading id="secure-routes" />
              <ul>
                <li>
                  Operations with a <code>security</code> requirement, their own or the schema&apos;s global one, are
                  generated with <code>secure: true</code> and a <code>@secure</code> JSDoc tag. Only those call the
                  worker. An operation with <code>security: []</code> opts out (like <code>GET /</code> in the
                  petstore).
                </li>
                <li>
                  To send credentials with every request, set <code>baseApiParams: {'{ secure: true }'}</code> (fetch) or{' '}
                  <code>secure: true</code> (axios) in the client config.
                </li>
                <li>
                  To skip the worker for one call, pass <code>{'{ secure: false }'}</code> as <code>RequestParams</code>.
                </li>
              </ul>

              <Heading id="single-http-client" />
              <p>
                With <code>singleHttpClient: true</code>, <code>Api</code> no longer extends <code>HttpClient</code>:
                it receives one in its constructor and keeps it in <code>api.http</code>. The transport (base URL,
                auth, fetch or axios instance) is configured and replaced independently of the API surface, which
                helps with dependency injection and tests.
              </p>
              <Snippet id="singleHttpClient" />
              <Note title="One output, one HttpClient">
                <code>HttpClient</code> has private fields, so TypeScript treats the class of each generated output as
                a different type. Share an instance between the modules of one output, not between two separately
                generated APIs.
              </Note>

              <Heading id="modular-output" />
              <p>
                With <code>modular: true</code> the output is split into <code>http-client.ts</code>,{' '}
                <code>data-contracts.ts</code> and one class per module (<code>Pets.ts</code>, <code>Store.ts</code>,{' '}
                <code>Users.ts</code>, plus <code>Common.ts</code> for routes like <code>GET /</code>). By default each
                module class extends <code>HttpClient</code>, so give them the same config:
              </p>
              <Snippet id="modularSeparate" />
              <p>
                Add <code>singleHttpClient: true</code> to share one client instead: one config, one{' '}
                <code>setSecurityData()</code> call, and you can group the modules into a single object.
              </p>
              <Snippet id="modularShared" />

              <Heading id="responses-and-errors" />
              <Heading id="fetch-responses">
                fetch: <code>HttpResponse</code>
              </Heading>
              <p>
                Methods resolve with an <code>HttpResponse&lt;Data, Error&gt;</code>: the native{' '}
                <code>Response</code> (<code>status</code>, <code>headers</code>, <code>ok</code>, …) with the parsed body in{' '}
                <code>data</code>. A non-2xx response <strong>rejects</strong> with the same object, the parsed error
                body in <code>error</code>, typed from the schema&apos;s error responses.
              </p>
              <Snippet id="fetchErrors" />
              <Heading id="disable-throw-on-error">
                <code>disableThrowOnError</code>
              </Heading>
              <p>
                Generate with <code>disableThrowOnError: true</code> to resolve every HTTP response and branch on{' '}
                <code>ok</code> instead of using <code>try</code>/<code>catch</code>. Network errors still reject.
              </p>
              <Snippet id="noThrow" />
              <Heading id="axios-responses">
                axios: <code>AxiosError</code>
              </Heading>
              <p>
                The axios client resolves with an <code>AxiosResponse&lt;Data&gt;</code> and rejects with an{' '}
                <code>AxiosError</code>. Pass the error type to <code>axios.isAxiosError</code> to type{' '}
                <code>e.response.data</code>.
              </p>
              <Snippet id="axiosErrors" />
              <Heading id="unwrap-response-data">
                <code>unwrapResponseData</code>
              </Heading>
              <p>
                Generate with <code>unwrapResponseData: true</code> to get the body directly. This works for both
                clients; failed requests still reject (with the <code>HttpResponse</code> or the{' '}
                <code>AxiosError</code>).
              </p>
              <Snippet id="unwrap" />

              <Heading id="cancellation" />
              <p>
                The fetch client can cancel by token: tag a request with <code>cancelToken</code> and call{' '}
                <code>api.abortRequest(token)</code>. Both clients also accept a standard <code>AbortSignal</code>{' '}
                through <code>signal</code>. With the fetch client, <code>cancelToken</code> takes precedence over{' '}
                <code>signal</code>.
              </p>
              <SnippetTabs fetch="cancelFetch" axios="cancelAxios" />

              <Heading id="files" />
              <p>
                Operations with a <code>multipart/form-data</code> body are generated with{' '}
                <code>type: ContentType.FormData</code>. Pass a plain object that matches the schema:{' '}
                <code>File</code> and <code>Blob</code> values are appended as they are, other objects are sent as
                JSON. Do not set the <code>Content-Type</code> header yourself.
              </p>
              <Snippet id="upload" />
              <p>
                For downloads, the <code>format</code> decides how the body is read. Responses declared as{' '}
                <code>type: string, format: binary</code> are generated with <code>format: &apos;blob&apos;</code> and
                typed <code>File</code> (at runtime the value is a <code>Blob</code>). For other routes, pass{' '}
                <code>format</code> in <code>RequestParams</code> or call <code>api.request()</code>:
              </p>
              <Snippet id="download" />
              <p>
                With axios, <code>format</code> is the <code>responseType</code>: use <code>&apos;blob&apos;</code> in
                the browser and <code>&apos;arraybuffer&apos;</code> or <code>&apos;stream&apos;</code> in Node.js.
              </p>

              <Heading id="custom-fetch" />
              <p>
                The fetch client calls <code>customFetch</code> instead of the global <code>fetch</code> when you pass
                one. Wrap any fetch-compatible function: retries, logging, a polyfill, a test double.
              </p>
              <Snippet id="customFetchRetry" />
              <p>In tests, answer with real <code>Response</code> objects: no network and no mocking library.</p>
              <Snippet id="customFetchTest" />
              <p>
                For server-side rendering, create one client per incoming request so that headers such as cookies are
                never shared between users:
              </p>
              <Snippet id="ssr" />
              <Note title="Pass a function, not window.fetch">
                The client calls <code>this.customFetch(…)</code>. Passing <code>window.fetch</code> itself can fail
                with <em>Illegal invocation</em> in browsers; use <code>(...args) =&gt; fetch(...args)</code>.
              </Note>

              <Heading id="react-query-swr" />
              <p>
                Generated methods return promises, so they plug into any data-fetching library. Map the response to
                its <code>data</code> (or generate with <code>unwrapResponseData</code> and pass the method directly),
                and forward the library&apos;s <code>AbortSignal</code> so unused requests are canceled.
              </p>
              <Snippet id="reactQuery" />
              <Snippet id="swr" />
              <p>
                A rejected request surfaces as the query&apos;s <code>error</code>: the <code>HttpResponse</code>{' '}
                (fetch) or the <code>AxiosError</code> (axios).
              </p>

              <Heading id="nodejs" />
              <p>
                Node.js 18 and later have <code>fetch</code>, <code>FormData</code>, <code>Blob</code> and{' '}
                <code>File</code> built in, so the fetch client runs unchanged in scripts, CLIs and servers. The
                axios client works too, with <code>axios</code> installed.
              </p>
              <Snippet id="node" />

              <Heading id="typing-tips" />
              <Heading id="data-contracts" />
              <p>
                Every schema of <code>components/schemas</code> is exported as a type (and enums as{' '}
                <code>enum</code>s, or unions with <code>generateUnionEnums</code>). Import them from{' '}
                <code>Api.ts</code>, or from <code>data-contracts.ts</code> in modular mode. Inline parameter and
                response types can be derived from the methods.
              </p>
              <Snippet id="typesContracts" />
              <Heading id="route-types" />
              <p>
                With <code>generateRouteTypes: true</code>, each operation also gets a namespace with its{' '}
                <code>RequestParams</code>, <code>RequestQuery</code>, <code>RequestBody</code>,{' '}
                <code>RequestHeaders</code> and <code>ResponseBody</code> types, handy for forms, mocks and server
                handlers. In modular mode they are written to <code>PetsRoute.ts</code>, <code>StoreRoute.ts</code>, …
              </p>
              <Snippet id="typesRoutes" />
              <p>
                Need a different shape? Customize the output with{' '}
                <Link href="/docs#hooks">hooks</Link> or <Link href="/docs#custom-templates">custom templates</Link>,
                and preview the result in the <Link href="/playground">playground</Link>.
              </p>
            </article>

            <div className="mt-14 grid gap-3 sm:grid-cols-2">
              <Link
                href="/docs"
                className="group rounded-xl border border-border p-4 transition-colors hover:border-border-strong hover:bg-bg-subtle"
              >
                <span className="text-xs font-medium text-fg-subtle">Reference</span>
                <span className="mt-1 flex items-center gap-1.5 font-medium text-fg">
                  Options, CLI and hooks
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
              <Link
                href="/skills"
                className="group rounded-xl border border-border p-4 transition-colors hover:border-border-strong hover:bg-bg-subtle"
              >
                <span className="text-xs font-medium text-fg-subtle">AI agent skill</span>
                <span className="mt-1 flex items-center gap-1.5 font-medium text-fg">
                  Teach your coding agent
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </div>
          </div>
        </main>

        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-56 shrink-0 xl:block">
          <DocsToc headings={headings} editHref={`${site.repo}/edit/main/docs/app/usage/page.tsx`} />
        </aside>
      </div>
      <SiteFooter />
    </>
  );
}
