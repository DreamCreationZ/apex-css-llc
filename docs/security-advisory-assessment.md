# Production Dependency Advisory Assessment

Assessment date: 2026-11-12

Scope: production dependencies reported by `npm audit --omit=dev` after pinning Next.js and `eslint-config-next` to 15.5.29.

## Result

The initial production audit reported three affected packages: two high severity and one moderate severity. The review replaced the vulnerable optional `sharp` installation with the Next-supported 0.35.5 release, leaving one high severity and one moderate severity production finding. There are no critical production findings.

| Package | Installed through | Audit severity | Applicability to this website | Disposition |
| --- | --- | --- | --- | --- |
| `postcss@8.4.31` | Next.js 15.5.29 private dependency | High | The advisories require attacker-controlled CSS, CSS stringification input, or `sourceMappingURL` comments. This deployment compiles CSS from the controlled repository during the Amplify build and does not accept or process user-supplied CSS at request time. Practical exposure is low, but the vulnerable package remains present in the build/runtime artifact. | Track the Next.js fix. The audit-proposed resolution is Next.js 16.4.6, a major framework change that requires separate Amplify and application compatibility testing. Do not force-upgrade during this correction release. |
| `sharp@0.34.5` | Next.js optional image-processing dependency | High in the initial audit; resolved locally | The site has no `next/image` imports, raster assets, image uploads, or user-controlled image-processing workflow. Public assets are a static SVG favicon and a PDF. The package is nevertheless pinned to a patched version so clean installs remain reproducible. | Updated to `sharp@0.35.5`, which is explicitly accepted by Next.js 15.5.29. The final production audit no longer reports `sharp`. |
| `next@15.5.29` | Direct production dependency | Moderate | This is the audit's aggregate effect from the bundled vulnerable PostCSS version, not a separate demonstrated request-time path in this website. | Retain the security-patched 15.5.29 release for this deployment and schedule a controlled major-version evaluation. |

## Compensating conditions

- The application does not accept file uploads, CSS, images, source maps, or executable content from users.
- Contact submissions are limited to validated text fields and remain disabled by independent browser and server feature gates.
- The production Content Security Policy restricts scripts, styles, images, connections, framing, and form actions to the application origin, with inline allowances required by the current Next.js rendering model.
- Dependencies are installed from the committed lockfile with `npm ci` in Amplify.

## Launch decision

The remaining PostCSS/Next.js findings should stay visible in release notes and dependency monitoring. Based on the website's current feature set, they do not present a demonstrated exploitable path through intended functionality, but they are unresolved scanner findings and require either a tested upstream upgrade or formal risk acceptance before a long-term production launch.
