import type { NextConfig } from "next";

const productionHeaders = process.env.NODE_ENV === "production"
  ? [
      { key: "Strict-Transport-Security", value: "max-age=31536000" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      {
        key: "Content-Security-Policy",
        value: "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; upgrade-insecure-requests",
      },
    ]
  : [];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  output: "standalone",
  outputFileTracingRoot: process.cwd(),
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          ...productionHeaders,
        ],
      },
    ];
  },
};

export default nextConfig;
