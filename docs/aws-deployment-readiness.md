# AWS Amplify Deployment Readiness

## Repository layout

This project is intended to be the root of a dedicated GitHub repository. `amplify.yml`, `package.json`, and the Next.js application are all at repository root, so no Amplify monorepo configuration or `AMPLIFY_MONOREPO_APP_ROOT` value is required.

## Amplify Hosting configuration

- Framework: Next.js 15 with SSR/API route support.
- Platform: Amplify Hosting compute (`WEB_COMPUTE`).
- Node.js: 22, selected in `.nvmrc` and the Amplify pre-build phase.
- Install: reproducible `npm ci` from `package-lock.json`.
- Quality gates: TypeScript, ESLint, and `next build`.
- Artifact directory: `.next`, as required by Amplify Hosting for Next.js SSR.
- Development output remains isolated in `.next-dev` and is never deployed.

The build phase writes only the explicitly named configuration values below to `.env.production`, allowing the Next.js SSR runtime to read them. Do not add AWS access keys, session tokens, API keys, or other secrets to this file or to public `NEXT_PUBLIC_` variables.

## Required Amplify environment variables

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Build/public | Canonical production URL, sitemap, and robots URL. Set to `https://apexcssllc.com` after the production hostname is approved. |
| `NEXT_PUBLIC_CONTACT_FORM_ENABLED` | Build/public | Keep `false` until end-to-end SES delivery is verified; set `true` only after approval. |
| `CONTACT_FORM_ENABLED` | Server runtime | Keep `false`; this independent delivery gate must be enabled only after SES identities, runtime IAM, and actual delivery are confirmed. |
| `SES_REGION` | Server runtime | AWS Region containing the verified SES identity. |
| `CONTACT_FORM_RECIPIENT` | Server runtime | Verified, monitored destination mailbox. |
| `CONTACT_FORM_SENDER` | Server runtime | SES-verified sender address or address on a verified domain. |

The contact route returns HTTP 503 when runtime delivery configuration is absent. Local preview submissions are validated but explicitly report that no email was sent.

## Required IAM and SES configuration

Attach an Amplify SSR Compute role rather than placing long-lived AWS credentials in environment variables.

The compute role must:

1. Trust `amplify.amazonaws.com` through `sts:AssumeRole`.
2. Grant only `ses:SendEmail` to the approved SES identity ARN, for example `arn:aws:ses:REGION:ACCOUNT_ID:identity/apexcssllc.com`.
3. Avoid wildcard service permissions and unrelated AWS access.

Also confirm:

- The SES domain or sender identity is verified in `SES_REGION`.
- The SES account has production access if mail must be sent outside verified sandbox recipients.
- `apexcssllc@gmail.com` is the company-confirmed official contact address; monitoring and end-to-end delivery were not independently tested during the audit.
- Amplify's required service role and CloudWatch logging configuration are enabled for the SSR application.

## DNS ownership and custom domain

Cloudflare remains authoritative. When connecting the Amplify custom domain, select manual configuration for a third-party DNS provider. Add only the Amplify/ACM validation and application routing records supplied by AWS. Do not replace the Cloudflare nameservers or remove Google Workspace MX, SPF, DKIM, or DMARC records.

## Remaining production launch requirements

1. Verify the final hostname and all Amplify environment variables.
2. Configure and test Google Workspace MX records in Cloudflare.
3. Verify the SES identity, production access, and least-privilege SSR Compute role.
4. Complete documentary review of SBA VetCert classification, SAM status, UEI, CAGE, and registered NAICS codes.
5. Replace the draft capability statement after credential and contact review.
6. Approve the privacy notice, retention schedule, access controls, and incident-handling process.
7. Connect the approved GitHub repository and review the first Amplify build before adding production DNS records.

## Readiness status

- Repository/build readiness: ready to connect after the local validation commands pass and the repository is pushed with approval.
- Staging deployment: ready after Amplify environment variables and IAM roles are configured.
- Production launch: blocked until company credentials, email/DNS, privacy approval, and the final capability statement are verified.
