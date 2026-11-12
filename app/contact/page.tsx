import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { ShieldIcon, TargetIcon } from "@/components/Icons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact APEX CSS LLC about federal opportunities, teaming, technology, staffing, and facility-support requirements.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Contact APEX CSS LLC" title={<>Start with the <span className="text-gold-300">requirement.</span></>}>
        Share the mission need, teaming opportunity, or service scope. We’ll route the inquiry to the right conversation.
      </PageHero>

      <section id="inquiry" className="scroll-mt-24 bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
          <div className="space-y-6">
            <article className="bg-navy-950 p-8 text-white">
              <TargetIcon className="h-8 w-8 text-gold-300" />
              <h2 className="mt-7 font-display text-3xl font-semibold">Business inquiries</h2>
              <p className="mt-4 leading-7 text-slate-300">For opportunity notices, capability requests, teaming discussions, and service inquiries, use the secure form.</p>
            </article>
            <article className="border border-slate-200 bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-gold-600">Confirmed business email</p>
              <a className="mt-4 block break-all font-display text-2xl font-semibold text-navy-950 transition hover:text-gold-600" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
              <span className="mt-4 inline-flex border border-emerald-300 bg-emerald-50 px-3 py-2 text-[.65rem] font-bold uppercase tracking-[.14em] text-emerald-800">Confirmed company contact</span>
              <p className="mt-4 text-sm leading-6 text-slate-600">Use this address for direct business, contracting, capability, and partnership inquiries. Independent delivery testing has not been performed by the website auditor.</p>
            </article>
            <article className="flex gap-4 border-l-2 border-gold-400 bg-white p-6">
              <ShieldIcon className="h-6 w-6 shrink-0 text-gold-500" />
              <p className="text-sm leading-6 text-slate-600">Online form delivery remains unavailable until AWS SES, runtime variables, and IAM access are verified. Use the confirmed email address for immediate contact.</p>
            </article>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
