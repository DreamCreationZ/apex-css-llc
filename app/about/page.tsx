import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { CompassIcon, PeopleIcon, ShieldIcon, TargetIcon, VisionIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about APEX CSS LLC's veteran-led identity, mission, vision, values, and commitment to government missions.",
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Mission First", copy: "We begin with the operational outcome and align every recommendation to the customer’s mission.", Icon: TargetIcon },
  { title: "Integrity", copy: "We communicate clearly, protect trust, and take responsibility for the work entrusted to us.", Icon: ShieldIcon },
  { title: "Service", copy: "Veteran-led service means showing up prepared, responsive, and focused on the team’s success.", Icon: PeopleIcon },
  { title: "Precision", copy: "We favor disciplined planning, measurable standards, and consistent execution over unnecessary complexity.", Icon: CompassIcon },
];

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="About APEX CSS LLC" title={<>Purpose built for <span className="text-gold-300">mission success.</span></>}>
        APEX CSS LLC is a veteran-led small business organized to deliver dependable technology, workforce, and facility support solutions for public- and private-sector clients.
      </PageHero>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <p className="section-kicker text-left">Company overview</p>
            <h2 className="section-title text-left">Veteran-led discipline. Commercial agility. Public-service purpose.</h2>
            <div className="mt-7 space-y-5 text-base leading-8 text-slate-600">
              <p>APEX CSS LLC brings together capabilities across IT infrastructure, cybersecurity, professional staffing, and facility services. Our multidisciplinary model helps customers coordinate essential support through one responsive partner.</p>
              <p>We approach federal work with respect for stewardship, security, documentation, and accountability. Every engagement is shaped around the customer’s stated requirements and the standards that govern the mission.</p>
            </div>
          </div>
          <div className="relative min-h-[460px] overflow-hidden bg-navy-950 p-8 text-white sm:p-12">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-gold-400/20" />
            <div className="absolute right-10 top-10 h-44 w-44 rounded-full border border-gold-400/30" />
            <p className="relative text-xs font-bold uppercase tracking-[.24em] text-gold-300">Veteran-led identity</p>
            <blockquote className="relative mt-20 font-display text-3xl leading-tight sm:text-4xl">Leadership grounded in service, readiness, and accountability.</blockquote>
            <p className="relative mt-8 text-sm leading-7 text-slate-300">Formal SDVOSB and VOSB certification documentation is pending verification and will be published only after confirmation.</p>
            <div className="absolute bottom-0 left-0 h-1.5 w-28 bg-gold-400" />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="border-t-4 border-gold-400 bg-white p-8 shadow-[0_18px_60px_rgba(6,27,61,.06)] sm:p-11">
              <TargetIcon className="h-9 w-9 text-gold-500" />
              <p className="mt-7 text-xs font-bold uppercase tracking-[.22em] text-gold-600">Our mission</p>
              <h2 className="mt-4 font-display text-3xl font-semibold">Deliver practical, mission-focused support with discipline and care.</h2>
              <p className="mt-5 leading-7 text-slate-600">We help customers strengthen operations by aligning the right people, processes, technologies, and facility services to the requirement at hand.</p>
            </article>
            <article className="border-t-4 border-gold-400 bg-navy-950 p-8 text-white shadow-[0_18px_60px_rgba(6,27,61,.12)] sm:p-11">
              <VisionIcon className="h-9 w-9 text-gold-300" />
              <p className="mt-7 text-xs font-bold uppercase tracking-[.22em] text-gold-300">Our vision</p>
              <h2 className="mt-4 font-display text-3xl font-semibold">Be the trusted small-business partner teams call when execution matters.</h2>
              <p className="mt-5 leading-7 text-slate-300">We aim to earn long-term confidence through responsive delivery, transparent communication, and continuous improvement.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-kicker">Core values</p>
            <h2 className="section-title">The standards behind every engagement.</h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ title, copy, Icon }, index) => (
              <article key={title} className="credential-card">
                <span className="text-xs font-semibold tracking-[.18em] text-slate-400">0{index + 1}</span>
                <Icon className="mt-7 h-8 w-8 text-gold-500" />
                <h3 className="mt-7 font-display text-2xl font-semibold">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-24 text-white sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <p className="section-kicker text-left text-gold-300">Commitment to government missions</p>
            <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">Service that respects the responsibility of public-sector work.</h2>
          </div>
          <ul className="grid gap-4 text-sm leading-7 text-slate-300 sm:grid-cols-2">
            {["Requirements-driven delivery", "Responsible handling of information", "Quality and performance visibility", "Responsive issue escalation", "Teaming-ready communication", "Continuous improvement mindset"].map((item) => (
              <li key={item} className="border-l border-gold-400/60 pl-4">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
