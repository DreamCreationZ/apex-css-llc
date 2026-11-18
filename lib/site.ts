export const siteConfig = {
  name: "APEX CSS LLC",
  legalName: "APEX CSS LLC",
  description:
    "SBA-certified SDVOSB and VOSB delivering mission-focused technology, cybersecurity, staffing, and facility support solutions.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://apexcssllc.com",
  contactEmail: "apexcssllc@gmail.com",
  businessPhone: "(410) 575-4377",
  businessPhoneHref: "+14105754377",
  contactEmailConfirmed: true,
  contactFormEnabled: process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED === "true",
  capabilityStatement: "/downloads/APEX-CSS-LLC-Capability-Statement-Draft.pdf",
  sbaProfileUrl: "https://search.certifications.sba.gov/profile/VP2LS7WJGFP3/261U4",
  certificationApprovalDate: "October 21, 2026",
} as const;

export const credentials = [
  { label: "SDVOSB", value: "SBA Certified", note: "Active in the official SBA public record; approved October 21, 2026", verified: true },
  { label: "VOSB", value: "SBA Certified", note: "Active in the official SBA public record; approved October 21, 2026", verified: true },
  { label: "SAM.gov", value: "Status not published", note: "Confirm active registration directly in SAM.gov before reliance", verified: false },
  { label: "UEI", value: "VP2LS7WJGFP3", note: "Matched in the official SBA public record", verified: true },
  { label: "CAGE Code", value: "261U4", note: "Matched in the official SBA public record", verified: true },
  { label: "Business Phone", value: "(410) 575-4377", note: "Company-confirmed public business contact", verified: true },
] as const;

export const verifiedNaicsCodes = [
  { code: "541512", label: "Computer Systems Design Services" },
] as const;
