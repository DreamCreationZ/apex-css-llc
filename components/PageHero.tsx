import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children: ReactNode }) {
  return (
    <section className="hero-grid relative overflow-hidden bg-navy-950 pb-20 pt-40 text-white sm:pb-24 sm:pt-44">
      <div className="hero-glow absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="animate-rise max-w-4xl">
          <div className="eyebrow mb-6 text-gold-300"><span className="h-px w-10 bg-gold-400" />{eyebrow}</div>
          <h1 className="font-display text-[clamp(2.8rem,7vw,5.7rem)] font-semibold leading-[.98] tracking-[-.04em]">{title}</h1>
          <div className="mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{children}</div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-1/3 bg-gold-400" />
    </section>
  );
}
