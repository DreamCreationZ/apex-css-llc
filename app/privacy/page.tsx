import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy information for the APEX CSS LLC website inquiry forms.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Privacy" title={<>Responsible handling of <span className="text-gold-300">inquiry data.</span></>}>
        A concise overview of the information collected through this website and how it is intended to be used.
      </PageHero>
      <section className="bg-white py-20 sm:py-28">
        <div className="prose-apex mx-auto max-w-3xl px-5 sm:px-8">
          <h2>Information collected</h2>
          <p>The contact and partnership forms request a name, company or agency, business email, inquiry type, and message. Technical request metadata may be used for security and abuse prevention.</p>
          <h2>Purpose</h2>
          <p>Information is intended only to evaluate and respond to business, contracting, capability, and partnership inquiries. Do not submit classified, controlled unclassified, export-controlled, procurement-sensitive, or otherwise restricted information through the public form.</p>
          <h2>Processing and retention</h2>
          <p>Local preview submissions are validated but not transmitted. Before production launch, APEX CSS LLC must approve a retention schedule, access controls, delivery configuration, and privacy contact.</p>
          <h2>Security</h2>
          <p>The production design uses server-side validation and delivery. Credentials and provider secrets are not included in browser code. No internet transmission can be guaranteed risk-free.</p>
          <h2>Status</h2>
          <p>This is a pre-launch privacy notice and requires company and legal review before production deployment.</p>
        </div>
      </section>
    </main>
  );
}
