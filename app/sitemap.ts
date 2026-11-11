import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/government-contracting", "/teaming", "/contact"];
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route ? "monthly" : "weekly",
    priority: route === "" ? 1 : route === "/government-contracting" ? 0.9 : 0.8,
  }));
}
