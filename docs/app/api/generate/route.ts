import { createGenerateHandler } from '@/lib/server/handler';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
/** seconds; downloading (10s) + generation (20s) are bounded below this */
export const maxDuration = 30;

export const POST = createGenerateHandler();
