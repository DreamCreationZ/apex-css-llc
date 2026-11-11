"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const links = [
  ["About", "/about"],
  ["Services", "/services"],
  ["Government", "/government-contracting"],
  ["Teaming", "/teaming"],
  ["Contact", "/contact"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy-950/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link className="min-w-0" href="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link key={href} className={`nav-link ${pathname === href ? "nav-link--active" : ""}`} href={href} aria-current={pathname === href ? "page" : undefined}>
              {label}
            </Link>
          ))}
          <Link className="button-gold ml-1 px-5 py-3 text-sm" href="/contact#inquiry">
            Request a Quote
          </Link>
        </nav>

        <button
          type="button"
          className="ml-3 grid h-11 w-11 shrink-0 place-items-center rounded-md border border-white/15 text-white lg:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-navy-950 px-5 pb-6 pt-4 lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-7xl flex-col">
            {links.map(([label, href]) => (
              <Link key={href} className="border-b border-white/10 py-4 text-sm text-slate-200" href={href} onClick={() => setOpen(false)} aria-current={pathname === href ? "page" : undefined}>
                {label}
              </Link>
            ))}
            <Link className="button-gold mt-5 justify-center py-3" href="/contact#inquiry" onClick={() => setOpen(false)}>
              Request a Quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
