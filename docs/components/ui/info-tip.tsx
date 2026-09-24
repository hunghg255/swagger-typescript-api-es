'use client';

import { Info } from 'lucide-react';
import { useId, useRef, useState } from 'react';

const WIDTH = 240;

/** small (i) button showing a description on hover / focus, clamped to the viewport */
export function InfoTip({ text }: { text: string }) {
  const id = useId();
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  const show = () => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const left = Math.min(Math.max(8, rect.left + rect.width / 2 - WIDTH / 2), window.innerWidth - WIDTH - 8);
    setPos({ top: rect.bottom + 6, left });
  };
  const hide = () => setPos(null);

  return (
    <>
      <button
        ref={ref}
        type="button"
        aria-label="More info"
        aria-describedby={id}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onClick={(e) => {
          e.preventDefault();
          if (pos) hide();
          else show();
        }}
        onKeyDown={(e) => e.key === 'Escape' && hide()}
        className="inline-flex size-4 shrink-0 items-center justify-center rounded-full text-fg-subtle transition-colors hover:text-fg"
      >
        <Info className="size-3.5" aria-hidden />
      </button>
      <span
        id={id}
        role="tooltip"
        style={pos ? { top: pos.top, left: pos.left, width: WIDTH } : { width: WIDTH }}
        className={`pointer-events-none fixed z-[70] rounded-lg border border-border bg-surface px-3 py-2 text-xs leading-relaxed font-normal text-fg-muted shadow-lg ${
          pos ? 'opacity-100' : 'invisible top-0 left-0 opacity-0'
        }`}
      >
        {text}
      </span>
    </>
  );
}
