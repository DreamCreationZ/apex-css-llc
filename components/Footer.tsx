import Link from "next/link";
import { Logo } from "./Logo";

const footerLinks = [
  ["About", "/about"],
  ["Services", "/services"],
  ["Government Contracting", "/government-contracting"],
  ["Teaming", "/teaming"],
  ["Contact", "/contact"],
] as const;

export function Footer() {
  return (
    <footer className="bg-navy-950 py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
        <div>
          <Logo />
          <p className="mt-6 max-w-md text-sm leading-6 text-slate-400">
            Mission-focused solutions for government and commercial clients.
          </p>
          <nav className="mt-7 flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer navigation">
            {footerLinks.map(([label, href]) => (
              <Link key={href} className="text-xs font-semibold text-slate-300 transition hover:text-gold-300" href={href}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="text-sm text-slate-400 lg:text-right">
          <p>© {new Date().getFullYear()} APEX CSS LLC. All rights reserved.</p>
          <p className="mt-2 text-xs">Credential information subject to verification.</p>
          <Link className="mt-3 inline-block text-xs transition hover:text-white" href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
