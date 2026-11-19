import { PageHero } from "@/components/PageHero";
import { createPageMetadata, siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Privacy",
  description: "Proposed privacy notice describing APEX CSS LLC's email-only contact process and website hosting practices.",
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Privacy — proposed for review" title={<>Responsible handling of <span className="text-gold-300">visitor information.</span></>}>
        This proposed notice reflects the website’s current email-only contact process and hosting configuration. It remains subject to company and legal approval.
      </PageHero>
      <section className="bg-white py-20 sm:py-28">
        <div className="prose-apex mx-auto max-w-3xl px-5 sm:px-8">
          <p><strong>Status:</strong> Proposed privacy policy for company and legal review. It is not yet an approved final policy or a statement that pending retention controls have been implemented.</p>

          <h2>Who we are</h2>
          <p>APEX CSS LLC operates this website to describe its capabilities and support business, contracting, and partnership communications. Privacy questions may be directed to <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> or <a href={`tel:${siteConfig.businessPhoneHref}`}>{siteConfig.businessPhone}</a>.</p>

          <h2>Information you provide</h2>
          <p>The website currently uses direct email and telephone contact. The visible inquiry forms are disabled and do not provide online delivery. Selecting an email link opens your email service, where you decide what information to send. APEX may receive your name, email address, organization, message, email headers, attachments, and any other information you voluntarily include.</p>
          <p>Do not send classified information, controlled unclassified information, export-controlled information, procurement-sensitive information, credentials, financial account information, government identifiers, health information, or other restricted or highly sensitive material through public email or this website.</p>

          <h2>Information collected automatically</h2>
          <p>AWS Amplify Hosting, Amazon CloudFront, and related AWS logging services may process standard request and diagnostic information such as IP address, request date and time, requested URL, HTTP status, browser or user-agent information, referrer, and operational error details. APEX does not currently add analytics, advertising trackers, or marketing cookies to the website.</p>
          <p>Cloudflare provides authoritative DNS for the planned custom domain and may process DNS-query information under its own service terms. Cloudflare is not currently approved as a reverse proxy for website traffic. If proxying, analytics, or additional tracking is enabled later, this notice must be reviewed and updated first.</p>

          <h2>How information is used</h2>
          <p>Information may be used to respond to inquiries, evaluate business or teaming opportunities, maintain website availability and security, investigate abuse, comply with legal obligations, and protect APEX CSS LLC, its clients, and the public. APEX does not sell personal information or use website information for third-party behavioral advertising.</p>

          <h2>Service providers and disclosure</h2>
          <p>Information may be processed by service providers that support website hosting, content delivery, DNS, security, logging, and email. Current providers include Amazon Web Services for hosting and operational logging, Cloudflare for authoritative DNS, and Google for the company Gmail mailbox. Information may also be disclosed when required by law, to protect legal rights or security, or in connection with an approved business transaction subject to appropriate safeguards.</p>

          <h2>Retention</h2>
          <p>APEX CSS LLC has not yet approved final retention periods. AWS Amplify access logs may be retained for the life of the hosted application, and the current CloudWatch runtime log group does not have a finite expiration setting. Direct business emails may remain in the company mailbox until an approved business-record schedule requires deletion. These are current conditions disclosed for review, not representations that a final retention program has been implemented.</p>
          <p>Before this policy is approved, APEX CSS LLC must select and document retention periods for email inquiries, security and access logs, operational records, backups, and any future online form submissions.</p>

          <h2>Security</h2>
          <p>APEX uses HTTPS, security headers, access controls, and service-provider safeguards appropriate to the current website. No method of transmission or storage is completely secure, and public email should not be used for sensitive or restricted information.</p>

          <h2>Your choices and requests</h2>
          <p>You may choose not to send information to APEX CSS LLC. Subject to applicable law and recordkeeping obligations, you may ask about information you submitted, request a correction, or request deletion by emailing <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. APEX must approve the final request-verification and response process before launch.</p>

          <h2>Children’s privacy</h2>
          <p>This business-to-business website is not directed to children, and APEX CSS LLC does not knowingly solicit personal information from children through the website.</p>

          <h2>Policy changes</h2>
          <p>The approved policy should include an effective date and last-updated date. Material changes to collection, providers, form delivery, analytics, or retention practices should be reflected here before those changes are activated.</p>

          <h2>Approval required</h2>
          <p>This proposed policy remains pending company and legal approval. The privacy contact, retention schedule, request-handling procedure, effective date, and any mailing address to be published still require an authorized decision.</p>
        </div>
      </section>
    </main>
  );
}
