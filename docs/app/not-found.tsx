import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <main id="main" className="relative isolate flex min-h-[calc(100dvh-3.5rem)] items-center justify-center px-4">
      <div
        aria-hidden
        className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_45%,#000_30%,transparent_100%)]"
      />
      <div className="text-center">
        <p className="font-mono text-sm font-medium text-accent">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">This route is not in the spec</h1>
        <p className="mx-auto mt-4 max-w-md text-fg-muted">
          The page you are looking for does not exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-fg px-4 text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            <ArrowLeft className="size-4" aria-hidden /> Back home
          </Link>
          <Link
            href="/docs"
            className="inline-flex h-10 items-center rounded-lg border border-border px-4 text-sm font-medium text-fg transition-colors hover:bg-muted"
          >
            Read the docs
          </Link>
        </div>
      </div>
    </main>
  );
}
