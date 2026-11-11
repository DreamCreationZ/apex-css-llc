import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { CloudIcon, FacilityIcon, PartnerIcon, PeopleIcon, ShieldIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Teaming & Partnerships",
  description: "Explore federal teaming, technology, cybersecurity, staffing, and facility-services partnership opportunities with APEX CSS LLC.",
  alternates: { canonical: "/teaming" },
};

const opportunities = [
  { title: "IT & cybersecurity partnerships", copy: "Complementary workshare for infrastructure, cloud, cybersecurity, service delivery, and modernization requirements.", Icon: ShieldIcon },
  { title: "Facility-services subcontracting", copy: "Janitorial, window washing, and facility-support work aligned to documented site and quality requirements.", Icon: FacilityIcon },
  { title: "Professional staffing partnerships", copy: "Technical, program, operational, and administrative talent support for contract and surge requirements.", Icon: PeopleIcon },
  { title: "Prime-contractor support", copy: "Focused small-business participation, responsive capture communication, and capability alignment for federal pursuits.", Icon: CloudIcon },
];

const process = [
  ["01", "Capability alignment", "We compare requirements, strengths, constraints, and realistic workshare."],
  ["02", "Opportunity qualification", "We establish the customer need, acquisition stage, timeline, and decision points."],
  ["03", "Teaming framework", "We define roles, communication, information handling, and proposal responsibilities."],
  ["04", "Disciplined execution", "If awarded, we operate against clear standards, reporting, and escalation paths."],
] as const;

export default function TeamingPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Teaming & partnerships" title={<>Stronger solutions through <span className="text-gold-300">aligned partnerships.</span></>}>
        APEX CSS LLC welcomes thoughtful relationships with federal prime contractors, qualified subcontractors, and capability partners.
      </PageHero>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div>
              <p className="section-kicker text-left">Where we can align</p>
              <h2 className="section-title text-left">Focused workshare. Clear roles. Mission-centered delivery.</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:justify-self-end">Our best partnerships begin with honest capability alignment and a shared commitment to the customer. We do not present unverified credentials, past performance, or relationships in pursuit materials.</p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {opportunities.map(({ title, copy, Icon }, index) => (
              <article key={title} className="group border border-slate-200 p-8 transition hover:border-gold-400 hover:shadow-[0_18px_60px_rgba(6,27,61,.08)] sm:p-10">
                <div className="flex items-start justify-between"><span className="grid h-14 w-14 place-items-center bg-navy-950 text-gold-300"><Icon className="h-7 w-7" /></span><span className="font-display text-4xl text-slate-200">0{index + 1}</span></div>
                <h3 className="mt-9 font-display text-2xl font-semibold">{title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-24 text-white sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <PartnerIcon className="mx-auto h-10 w-10 text-gold-300" />
            <p className="section-kicker mt-6 text-gold-300">A disciplined teaming process</p>
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">From first conversation to contract delivery.</h2>
          </div>
          <ol className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">
            {process.map(([number, title, copy]) => (
              <li key={number} className="min-h-72 bg-navy-950 p-7">
                <span className="font-display text-4xl text-gold-300">{number}</span>
                <h3 className="mt-10 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-400">{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="inquiry" className="scroll-mt-24 bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="section-kicker text-left">Partnership inquiry</p>
            <h2 className="section-title text-left">Bring us a specific opportunity or a capability fit.</h2>
            <p className="mt-6 leading-7 text-slate-600">Helpful details include the customer, solicitation or forecast reference, acquisition stage, anticipated workshare, response deadline, and the capability you would like APEX to provide.</p>
          </div>
          <ContactForm defaultInquiry="Teaming / subcontracting" heading="Start a teaming conversation." />
        </div>
      </section>
    </main>
  );
}
