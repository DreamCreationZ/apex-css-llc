# APEX CSS LLC Website

Standalone Next.js 15, TypeScript, and Tailwind CSS website for APEX CSS LLC.

## Local development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:4173` when starting the server with the approved local port, or the URL printed by Next.js.

Development output is written to `.next-dev`. Production builds use `.next`, so `npm run build` can run without overwriting an active development server's cache.

## Validation

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment

The repository-root `amplify.yml` is configured for a standalone AWS Amplify Hosting SSR deployment. Review `docs/aws-deployment-readiness.md` before connecting the repository. Cloudflare remains the authoritative DNS provider; deployment does not require moving DNS to Route 53.
