import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Logo } from "@/components/Logo";
import {
  ArrowIcon,
  CheckIcon,
  CloudIcon,
  FacilityIcon,
  PartnerIcon,
  PeopleIcon,
  ShieldIcon,
  TargetIcon,
} from "@/components/Icons";

const credentials = [
  { label: "SAM.gov Registration", value: "Verification pending" },
  { label: "SDVOSB Certification", value: "Verification pending" },
  { label: "UEI", value: "Not yet provided" },
  { label: "CAGE Code", value: "Not yet provided" },
];

const services = [
  {
    title: "IT & Cloud Solutions",
    copy: "Secure, resilient technology services designed to modernize operations and support mission continuity.",
    Icon: CloudIcon,
    tags: ["Cloud readiness", "IT modernization", "Managed support"],
  },
  {
    title: "Cybersecurity",
    copy: "Practical security services that strengthen systems, reduce risk, and help protect sensitive operations.",
    Icon: ShieldIcon,
    tags: ["Risk assessment", "Security operations", "Compliance support"],
  },
  {
    title: "Professional Staffing",
    copy: "Qualified, mission-aligned professionals for technical, administrative, and program support requirements.",
    Icon: PeopleIcon,
    tags: ["Talent sourcing", "Program support", "Surge capacity"],
  },
  {
    title: "Cleaning & Facility Management",
    copy: "Reliable facility support that promotes safe, efficient, and professional work environments.",
    Icon: FacilityIcon,
    tags: ["Janitorial services", "Facility support", "Quality assurance"],
  },
];

export default function Home() {
  return (
    <main id="main-content" className="overflow-hidden bg-white text-navy-950">

      <section className="hero-grid relative flex min-h-[760px] items-center bg-navy-950 pb-24 pt-36 text-white sm:pt-40 lg:min-h-[820px]">
        <div className="hero-glow absolute inset-0" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div className="animate-rise max-w-4xl">
            <div className="eyebrow mb-7 text-gold-300">
              <span className="h-px w-10 bg-gold-400" />
              Veteran-led. Mission-driven.
            </div>
            <h1 className="font-display text-[clamp(3.1rem,7vw,6.6rem)] font-semibold leading-[.94] tracking-[-0.045em]">
              Veteran-Led Excellence in <span className="text-gold-300">Federal Contracting</span>
            </h1>
            <p className="mt-8 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              APEX CSS LLC is a veteran-led small business providing mission-focused technology,
              cybersecurity, professional staffing, and facility support solutions to government and commercial clients.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/services" className="button-gold px-7 py-4">
                Explore Our Capabilities <ArrowIcon className="h-4 w-4" />
              </Link>
              <Link href="/teaming" className="button-outline px-7 py-4">
                Partner With Us
              </Link>
            </div>
          </div>

          <div className="relative hidden justify-self-end lg:block" aria-hidden="true">
            <div className="orbit h-[390px] w-[390px] rounded-full border border-gold-400/20 p-10">
              <div className="grid h-full w-full place-items-center rounded-full border border-white/10 bg-white/[.025] p-12 backdrop-blur-sm">
                <div className="grid h-full w-full place-items-center rounded-full border border-gold-400/30 bg-navy-900/70 shadow-[0_0_80px_rgba(201,160,68,.12)]">
                  <Logo compact />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-14 border-l-2 border-gold-400 bg-navy-900/90 px-5 py-4 shadow-2xl backdrop-blur">
              <span className="block text-[.62rem] font-bold uppercase tracking-[.28em] text-gold-300">Our standard</span>
              <span className="mt-1 block font-display text-lg">Precision in every mission.</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-1/3 bg-gold-400" />
      </section>

      <section id="capabilities" className="scroll-mt-20 bg-slate-50 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-mark"><CheckIcon className="h-6 w-6" /></span>
            <p className="section-kicker">Business credentials</p>
            <h2 className="section-title">Capability Statement Snapshot</h2>
            <p className="section-lede">Credential details are published only after verification against official documentation.</p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((credential, index) => (
              <article key={credential.label} className="credential-card group">
                <span className="text-xs font-semibold tracking-[.18em] text-slate-400">0{index + 1}</span>
                <CheckIcon className="mt-7 h-9 w-9 text-gold-500 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mt-7 font-display text-xl font-semibold text-navy-950">{credential.label}</h3>
                <p className="mt-2 text-sm text-slate-500">{credential.value}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-7 max-w-3xl text-center text-xs leading-5 text-slate-500">
            Certification, registration, and identifier status shown here should not be treated as active until verified.
          </p>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div className="relative min-h-[430px] overflow-hidden bg-navy-950 p-8 text-white sm:p-12">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-gold-400/20" />
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-gold-400/30" />
            <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">The APEX commitment</p>
            <blockquote className="mt-16 font-display text-3xl leading-tight sm:text-4xl">
              “Disciplined execution. Accountable service. Results that advance the mission.”
            </blockquote>
            <div className="absolute bottom-0 left-0 h-1.5 w-28 bg-gold-400" />
          </div>

          <div>
            <p className="section-kicker text-left">Who we are</p>
            <h2 className="section-title text-left">Built to serve with clarity, discipline, and purpose.</h2>
            <p className="mt-7 text-lg leading-8 text-slate-600">
              APEX CSS LLC brings a veteran-led perspective to complex client requirements. We align people, process,
              and technology around one objective: dependable outcomes that help each customer carry out its mission.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="border-l-2 border-gold-400 pl-5">
                <h3 className="font-display text-xl font-semibold">Mission First</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">Solutions shaped around operational need, not off-the-shelf assumptions.</p>
              </div>
              <div className="border-l-2 border-gold-400 pl-5">
                <h3 className="font-display text-xl font-semibold">Accountability Always</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">Clear communication, responsible delivery, and measurable standards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-20 bg-navy-950 py-24 text-white sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="section-kicker text-left text-gold-300">Core services</p>
              <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Capabilities designed for demanding missions.</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-slate-300 lg:justify-self-end">
              From secure infrastructure to the people and facilities that keep organizations moving, our service portfolio
              is built for flexibility, consistency, and responsible execution.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
            {services.map(({ title, copy, Icon, tags }, index) => (
              <article key={title} className="service-card group bg-navy-950 p-8 sm:p-10">
                <div className="flex items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center border border-gold-400/35 text-gold-300 transition-colors group-hover:bg-gold-400 group-hover:text-navy-950">
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className="font-display text-4xl text-white/10">0{index + 1}</span>
                </div>
                <h3 className="mt-10 font-display text-2xl font-semibold">{title}</h3>
                <p className="mt-4 max-w-xl leading-7 text-slate-400">{copy}</p>
                <ul className="mt-8 flex flex-wrap gap-2" aria-label={`${title} capabilities`}>
                  {tags.map((tag) => <li key={tag} className="border border-white/10 px-3 py-1.5 text-xs text-slate-300">{tag}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contracting" className="scroll-mt-20 bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-mark"><TargetIcon className="h-6 w-6" /></span>
            <p className="section-kicker">Government contracting</p>
            <h2 className="section-title">A capable partner for public-sector priorities.</h2>
            <p className="section-lede">Structured to support prime contractors and public agencies with focused capabilities and responsive delivery.</p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            <article className="contract-card">
              <TargetIcon className="h-8 w-8 text-gold-500" />
              <h3 className="mt-7 font-display text-2xl font-semibold">Federal Focus</h3>
              <p className="mt-4 leading-7 text-slate-600">Technology, cyber, workforce, and facility support aligned to government mission requirements.</p>
            </article>
            <article className="contract-card">
              <ShieldIcon className="h-8 w-8 text-gold-500" />
              <h3 className="mt-7 font-display text-2xl font-semibold">Business Classification</h3>
              <p className="mt-4 leading-7 text-slate-600">Veteran-led small business. Formal SDVOSB certification and related credentials remain pending verification.</p>
            </article>
            <article className="contract-card">
              <PartnerIcon className="h-8 w-8 text-gold-500" />
              <h3 className="mt-7 font-display text-2xl font-semibold">Teaming Opportunities</h3>
              <p className="mt-4 leading-7 text-slate-600">Open to thoughtful prime–subcontractor relationships where complementary strengths improve delivery.</p>
            </article>
          </div>

          <div className="mt-16 grid overflow-hidden bg-slate-50 lg:grid-cols-2">
            <div className="p-8 sm:p-12">
              <p className="text-xs font-bold uppercase tracking-[.22em] text-gold-600">Core competencies</p>
              <ul className="mt-8 grid gap-4 text-sm font-semibold sm:grid-cols-2">
                {["IT & cloud enablement", "Cybersecurity support", "Technical staffing", "Program support", "Facility operations", "Quality-focused delivery"].map((item) => (
                  <li key={item} className="flex items-center gap-3"><CheckIcon className="h-5 w-5 shrink-0 text-gold-500" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-navy-900 p-8 text-white sm:p-12">
              <p className="text-xs font-bold uppercase tracking-[.22em] text-gold-300">Partner with APEX</p>
              <h3 className="mt-5 font-display text-3xl font-semibold">Build a stronger response together.</h3>
              <p className="mt-4 leading-7 text-slate-300">Connect with us to discuss capability alignment, upcoming requirements, and responsible teaming.</p>
              <Link href="/teaming" className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-gold-300 transition-colors hover:text-white">Start a conversation <ArrowIcon className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
