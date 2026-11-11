import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, PartnerIcon, ShieldIcon, TargetIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { credentials, naicsCandidates, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Government Contracting",
  description: "Review APEX CSS LLC's federal contracting focus, credential status, core competencies, differentiators, and capability statement.",
  alternates: { canonical: "/government-contracting" },
};

const competencies = [
  "IT infrastructure and cloud enablement",
  "Cybersecurity and security operations support",
  "IT service delivery and modernization",
  "Professional staffing and program support",
  "Commercial janitorial and facility services",
  "Window washing and site-support coordination",
];

const differentiators = [
  { title: "Integrated capability model", copy: "Technology, staffing, and facility support coordinated through one responsive small-business partner." },
  { title: "Veteran-led operating discipline", copy: "A service-minded approach centered on preparation, accountability, and mission alignment." },
  { title: "Transparent credential posture", copy: "Registrations and classifications are published only after verification, reducing proposal and teaming risk." },
  { title: "Flexible teaming orientation", copy: "Structured to complement prime contractors with focused capabilities and responsive communication." },
];

export default function GovernmentContractingPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Government contracting" title={<>Ready to support the <span className="text-gold-300">federal mission.</span></>}>
        APEX CSS LLC is building a disciplined federal contracting platform around technology, cybersecurity, workforce, and facility-support requirements.
      </PageHero>

      <section className="bg-slate-50 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="section-kicker text-left">Business classifications & identifiers</p>
              <h2 className="section-title text-left">Credential status, without assumptions.</h2>
              <p className="mt-6 leading-7 text-slate-600">The company has supplied a veteran-owned and service-disabled veteran-owned identity. Formal certification and registration records have not yet been provided for independent verification.</p>
            </div>
            <span className="inline-flex w-fit items-center border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-amber-800">Verification in progress</span>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {credentials.map((credential) => (
              <article key={credential.label} className="min-h-56 border border-slate-200 bg-white p-6 shadow-[0_14px_45px_rgba(6,27,61,.05)]">
                <ShieldIcon className="h-7 w-7 text-gold-500" />
                <h3 className="mt-7 font-display text-xl font-semibold">{credential.label}</h3>
                <p className="mt-3 text-sm font-bold text-amber-700">{credential.value}</p>
                <p className="mt-3 text-xs leading-5 text-slate-500">{credential.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div className="sticky top-28">
            <p className="section-kicker text-left">Core competencies</p>
            <h2 className="section-title text-left">Multidisciplinary support for operational requirements.</h2>
            <p className="mt-6 leading-7 text-slate-600">APEX CSS LLC’s service portfolio is designed for direct requirements and for focused workshare under prime contractor teams.</p>
            <Link className="button-gold mt-9 px-6 py-4" href="/teaming">Explore teaming opportunities <ArrowIcon className="h-4 w-4" /></Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {competencies.map((item, index) => (
              <li key={item} className="flex min-h-32 flex-col justify-between border-t-2 border-gold-400 bg-slate-50 p-6">
                <span className="text-xs font-semibold tracking-[.18em] text-slate-400">0{index + 1}</span>
                <span className="mt-7 font-display text-xl font-semibold">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-navy-950 py-24 text-white sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <p className="section-kicker text-left text-gold-300">Relevant NAICS alignment</p>
              <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">Codes aligned to the planned capability portfolio.</h2>
              <p className="mt-6 leading-7 text-slate-300">These are candidate NAICS codes, not a representation of the company’s current SAM.gov record. Confirm selections before production publication.</p>
            </div>
            <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
              {naicsCandidates.map(({ code, label }) => (
                <article key={code} className="bg-navy-950 p-7">
                  <p className="font-display text-3xl text-gold-300">{code}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{label}</p>
                  <p className="mt-4 text-[.65rem] font-bold uppercase tracking-[.16em] text-amber-300">Pending SAM confirmation</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <TargetIcon className="mx-auto h-9 w-9 text-gold-500" />
            <p className="section-kicker mt-6">Differentiators</p>
            <h2 className="section-title">A practical small-business advantage.</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {differentiators.map(({ title, copy }, index) => (
              <article key={title} className="contract-card">
                <div className="flex items-start gap-5">
                  <span className="font-display text-3xl text-gold-500">0{index + 1}</span>
                  <div><h3 className="font-display text-2xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-slate-600">{copy}</p></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.22em] text-gold-600">Capability statement</p>
            <h2 className="mt-4 font-display text-4xl font-semibold">Download the current draft profile.</h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-600">This draft intentionally marks SAM, SBA VetCert, UEI, CAGE, NAICS, contact email, and past-performance fields as pending. Replace it after documentary verification.</p>
          </div>
          <a className="button-gold px-7 py-4" href={siteConfig.capabilityStatement} download>
            Download Capability Statement <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="bg-gold-400 py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[.22em] text-navy-800">Prime contractor or agency buyer?</p><h2 className="mt-4 font-display text-4xl font-semibold text-navy-950">Discuss alignment before the next requirement.</h2></div>
          <Link className="inline-flex items-center justify-center gap-3 bg-navy-950 px-7 py-4 text-sm font-bold text-white" href="/contact#inquiry">Contact APEX <PartnerIcon className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
  );
}
