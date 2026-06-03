interface StampProps {
  glyph: string;
  size?: 'sm' | 'lg';
  animate?: boolean;
  ariaLabel?: string;
}

const SIZE = {
  sm: 'h-10 w-10',
  lg: 'h-16 w-16 sm:h-[72px] sm:w-[72px]',
} as const;

const glyphFontSize = (length: number, size: 'sm' | 'lg'): string => {
  if (size === 'sm') {
    if (length <= 1) return 'text-lg';
    if (length === 2) return 'text-[11px]';
    if (length === 3) return 'text-[8px]';
    return 'text-[7px] leading-[1.05]';
  }
  if (length <= 1) return 'text-3xl';
  if (length === 2) return 'text-lg';
  if (length === 3) return 'text-sm';
  if (length === 4) return 'text-xs';
  return 'text-[11px] leading-[1.1]';
};

export default function Stamp({ glyph, size = 'sm', animate = false, ariaLabel }: StampProps) {
  const wrap = animate ? 'stamp-animate' : '';
  const decorative = !ariaLabel;

  return (
    <span
      role={decorative ? undefined : 'img'}
      aria-label={ariaLabel}
      aria-hidden={decorative ? true : undefined}
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full border-2 border-[#c0392b] bg-[#c0392b] text-white shadow ${SIZE[size]} ${wrap}`}
    >
      <span className="pointer-events-none absolute inset-[3px] rounded-full border border-white/70" />
      <span
        className={`px-1 text-center font-bold tracking-tight ${glyphFontSize(Array.from(glyph).length, size)}`}
        style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
      >
        {glyph}
      </span>
    </span>
  );
}
