import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "APEX CSS LLC",
    short_name: "APEX CSS",
    description: "Veteran-led federal contracting solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#061B3D",
    theme_color: "#061B3D",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
