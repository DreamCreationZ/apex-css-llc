export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3" aria-label="APEX CSS LLC">
      <svg
        aria-hidden="true"
        className="h-11 w-11 shrink-0"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path d="M24 2.5 43 13.4v21.2L24 45.5 5 34.6V13.4L24 2.5Z" fill="#C9A044" />
        <path d="M24 6.7 39.3 15.5v17L24 41.3 8.7 32.5v-17L24 6.7Z" fill="#061B3D" />
        <path d="m14.2 31.3 9.8-17 9.8 17h-5.2L24 23.2l-4.6 8.1h-5.2Z" fill="#fff" />
        <path d="M20.4 30.5h7.2L24 24.3l-3.6 6.2Z" fill="#C9A044" />
      </svg>
      {!compact && (
        <span className="min-w-0 leading-none">
          <span className="block whitespace-nowrap font-display text-[1.1rem] font-bold tracking-[0.08em] text-white max-[440px]:text-base">
            APEX CSS
          </span>
          <span className="mt-1 block whitespace-nowrap text-[0.58rem] font-semibold tracking-[0.28em] text-gold-300 max-[440px]:text-[.45rem] max-[440px]:tracking-[.13em]">
            MISSION. PRECISION. SERVICE.
          </span>
        </span>
      )}
    </span>
  );
}
