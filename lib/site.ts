export const siteConfig = {
  name: "APEX CSS LLC",
  legalName: "APEX CSS LLC",
  description:
    "Veteran-led, mission-focused technology, cybersecurity, staffing, and facility support solutions for government and commercial clients.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://apexcssllc.com",
  contactEmail: "apexcssllc@gmail.com",
  contactEmailConfirmed: true,
  contactFormEnabled: process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED === "true",
  capabilityStatement: "/downloads/APEX-CSS-LLC-Capability-Statement-Draft.pdf",
} as const;

export const credentials = [
  { label: "SDVOSB", value: "Verification pending", note: "SBA VetCert documentation not yet provided" },
  { label: "VOSB", value: "Verification pending", note: "SBA VetCert documentation not yet provided" },
  { label: "SAM.gov", value: "Verification pending", note: "Active registration record not yet provided" },
  { label: "UEI", value: "Not provided", note: "Required before publication" },
  { label: "CAGE Code", value: "Not provided", note: "Required before publication" },
] as const;

export const naicsCandidates = [
  { code: "541512", label: "Computer Systems Design Services" },
  { code: "541513", label: "Computer Facilities Management Services" },
  { code: "541519", label: "Other Computer Related Services" },
  { code: "561210", label: "Facilities Support Services" },
  { code: "561320", label: "Temporary Help Services" },
  { code: "561720", label: "Janitorial Services" },
] as const;
