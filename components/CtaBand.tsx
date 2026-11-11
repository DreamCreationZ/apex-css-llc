import Link from "next/link";
import { ArrowIcon } from "./Icons";

export function CtaBand({
  eyebrow = "Ready to move the mission forward?",
  title = "Let’s discuss your next requirement.",
  label = "Start a conversation",
  href = "/contact#inquiry",
}: {
  eyebrow?: string;
  title?: string;
  label?: string;
  href?: string;
}) {
  return (
    <section className="bg-gold-400 py-20 sm:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-navy-800">{eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-navy-950 sm:text-5xl">{title}</h2>
        </div>
        <Link className="inline-flex shrink-0 items-center justify-center gap-3 bg-navy-950 px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-navy-800" href={href}>
          {label} <ArrowIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
