'use client';

export function Switch({
  checked,
  onChange,
  id,
  label,
  describedBy,
  size = 'md',
  testId,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  /** accessible name when there is no <label htmlFor> */
  label?: string;
  describedBy?: string;
  size?: 'sm' | 'md';
  testId?: string;
}) {
  const track = size === 'sm' ? 'h-4 w-7' : 'h-5 w-9';
  const thumb = size === 'sm' ? 'size-3 data-[on=true]:translate-x-3' : 'size-4 data-[on=true]:translate-x-4';
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      aria-label={label}
      aria-describedby={describedBy}
      data-testid={testId}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent p-[1px] transition-colors ${track} ${
        checked ? 'bg-accent' : 'bg-border-strong'
      }`}
    >
      <span
        data-on={checked}
        className={`pointer-events-none block rounded-full bg-white shadow-sm ring-0 transition-transform dark:data-[on=false]:bg-fg-muted dark:data-[on=true]:bg-accent-fg ${thumb}`}
      />
    </button>
  );
}
