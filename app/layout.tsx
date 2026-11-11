import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "APEX CSS LLC | Veteran-Led Federal Contracting",
    template: "%s | APEX CSS LLC",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["federal contracting", "SDVOSB", "cybersecurity", "IT modernization", "professional staffing", "facility management"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "APEX CSS LLC | Veteran-Led Federal Contracting",
    description: siteConfig.description,
    url: "/",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
