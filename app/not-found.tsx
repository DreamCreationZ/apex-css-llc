import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="grid min-h-[78vh] place-items-center bg-navy-950 px-5 pb-20 pt-36 text-center text-white">
      <div>
        <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">404 / Page not found</p>
        <h1 className="mt-6 font-display text-5xl font-semibold sm:text-6xl">This route is outside the mission.</h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-300">The page may have moved or the address may be incomplete.</p>
        <Link className="button-gold mt-9 px-7 py-4" href="/">Return home</Link>
      </div>
    </main>
  );
}
