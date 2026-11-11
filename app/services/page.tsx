import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ArrowIcon, CleanIcon, CloudIcon, PeopleIcon, ShieldIcon, SupportIcon, WindowIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Services & Capabilities",
  description: "Explore APEX CSS LLC services across cloud infrastructure, cybersecurity, IT modernization, staffing, cleaning, and facility management.",
  alternates: { canonical: "/services" },
};

const services = [
  {
    id: "it-cloud",
    title: "IT Infrastructure & Cloud Solutions",
    summary: "Modern, resilient infrastructure designed around availability, security, and operational continuity.",
    details: "We support infrastructure assessment, cloud-readiness planning, migration coordination, systems integration, and ongoing platform operations. Our approach emphasizes right-sized architecture, clear documentation, and solutions that can be sustained by the customer team.",
    capabilities: ["Infrastructure assessment", "Cloud readiness and migration support", "Network and systems coordination", "Backup and continuity planning"],
    Icon: CloudIcon,
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Security Operations",
    summary: "Risk-informed security support that helps protect systems, data, and mission-critical operations.",
    details: "APEX CSS LLC helps teams organize security priorities, strengthen operational practices, and improve visibility into risk. Support can span security assessments, control implementation, vulnerability coordination, incident readiness, and compliance documentation.",
    capabilities: ["Cyber risk assessment", "Security operations support", "Vulnerability coordination", "Compliance and documentation support"],
    Icon: ShieldIcon,
  },
  {
    id: "it-support",
    title: "IT Support & Modernization",
    summary: "Responsive technical support paired with practical modernization planning and execution.",
    details: "We help organizations maintain reliable day-to-day technology while moving toward a more modern operating environment. Services can include service-desk support, endpoint coordination, systems administration, lifecycle planning, and modernization program assistance.",
    capabilities: ["Service desk and user support", "Endpoint and systems support", "Technology lifecycle planning", "Modernization program coordination"],
    Icon: SupportIcon,
  },
  {
    id: "staffing",
    title: "Professional Staffing & Consulting",
    summary: "Mission-aligned professionals for technical, administrative, operational, and program support needs.",
    details: "Our staffing approach starts with the work requirement and the environment in which it will be performed. We focus on role clarity, candidate alignment, responsive communication, and support throughout the assignment lifecycle.",
    capabilities: ["Technical and professional staffing", "Program and project support", "Administrative support", "Surge and contingent workforce support"],
    Icon: PeopleIcon,
  },
  {
    id: "cleaning",
    title: "Commercial Cleaning & Janitorial Services",
    summary: "Consistent cleaning programs that support safe, professional, mission-ready facilities.",
    details: "APEX CSS LLC can support recurring and requirement-specific cleaning needs with task documentation, quality checks, and responsive issue resolution. Service plans are shaped to the facility, schedule, access requirements, and performance standards.",
    capabilities: ["Routine janitorial services", "Restroom and common-area care", "Floor care coordination", "Quality-control inspections"],
    Icon: CleanIcon,
  },
  {
    id: "facilities",
    title: "Window Washing & Facility Management",
    summary: "Specialized exterior and facility support that keeps properties safe, presentable, and operational.",
    details: "We coordinate window cleaning and broader facility support around site requirements, safety expectations, schedules, and inspection criteria. Our goal is a dependable service rhythm with visible accountability.",
    capabilities: ["Interior and exterior window cleaning", "Facility support coordination", "Preventive service scheduling", "Site inspection and reporting"],
    Icon: WindowIcon,
  },
] as const;

export default function ServicesPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Services & capabilities" title={<>Integrated support for <span className="text-gold-300">complex requirements.</span></>}>
        Technology, workforce, and facility services delivered through one disciplined, mission-focused operating model.
      </PageHero>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ id, title, Icon }, index) => (
              <a key={id} href={`#${id}`} className="group flex items-center gap-4 border border-slate-200 p-5 transition hover:border-gold-400 hover:shadow-[0_14px_40px_rgba(6,27,61,.08)]">
                <span className="grid h-11 w-11 shrink-0 place-items-center bg-navy-950 text-gold-300"><Icon className="h-5 w-5" /></span>
                <span className="text-sm font-bold text-navy-950">0{index + 1}. {title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl space-y-8 px-5 sm:px-8">
          {services.map(({ id, title, summary, details, capabilities, Icon }, index) => (
            <article id={id} key={id} className="scroll-mt-28 grid overflow-hidden bg-white shadow-[0_18px_60px_rgba(6,27,61,.06)] lg:grid-cols-[.42fr_.58fr]">
              <div className={`relative min-h-[300px] overflow-hidden p-8 text-white sm:p-10 ${index % 2 ? "bg-navy-900" : "bg-navy-950"}`}>
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-gold-400/20" />
                <div className="absolute right-8 top-8 h-28 w-28 rounded-full border border-gold-400/30" />
                <span className="relative grid h-16 w-16 place-items-center border border-gold-400/40 text-gold-300"><Icon className="h-8 w-8" /></span>
                <span className="absolute bottom-8 right-8 font-display text-7xl text-white/5">0{index + 1}</span>
                <h2 className="relative mt-10 font-display text-3xl font-semibold leading-tight">{title}</h2>
                <p className="relative mt-5 leading-7 text-slate-300">{summary}</p>
              </div>
              <div className="p-8 sm:p-10 lg:p-12">
                <p className="text-base leading-8 text-slate-600">{details}</p>
                <h3 className="mt-8 text-xs font-bold uppercase tracking-[.2em] text-gold-600">Selected capabilities</h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {capabilities.map((capability) => <li key={capability} className="border-l-2 border-gold-400 pl-3 text-sm font-semibold text-navy-950">{capability}</li>)}
                </ul>
                <Link className="mt-9 inline-flex items-center gap-3 text-sm font-bold text-navy-950 transition hover:text-gold-600" href={`/contact?service=${encodeURIComponent(title)}#inquiry`}>
                  Discuss this capability <ArrowIcon className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand eyebrow="Have a defined scope or emerging need?" title="Bring us the requirement. We’ll help shape the response." />
    </main>
  );
}
