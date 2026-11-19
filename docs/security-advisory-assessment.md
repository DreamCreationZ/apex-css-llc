# Production Dependency Advisory Assessment

Assessment date: 2026-11-19

Scope: committed dependency tree installed from `package-lock.json`, evaluated with `npm audit --omit=dev`, full `npm audit`, and `npm ls`.

## Current result

- Production audit: one high-severity package finding and one moderate-severity package finding; no critical findings.
- Full audit including development tooling: one high and seven moderate package findings; no critical findings.
- `sharp@0.35.5` remains on the patched release and is not reported by the current audit.

| Package | Installed through | Severity | Current applicability | Disposition |
| --- | --- | --- | --- | --- |
| `postcss@8.4.31` | Private dependency bundled with `next@15.5.29` | High | The current advisories involve CSS stringification or attacker-controlled `sourceMappingURL` values. This website compiles repository-controlled CSS during the Amplify build and has no upload, CSS-processing, theme-editor, or user-controlled stylesheet path at request time. No remotely reachable exploit path was identified through intended website functionality. | Unresolved scanner finding. Requires a documented temporary risk acceptance or a separately tested framework upgrade before official launch approval. |
| `next@15.5.29` | Direct production dependency | Moderate | npm reports Next.js because it contains the affected PostCSS version. The audit does not identify a separate request-time vulnerability in the application. | Keep pinned unless a controlled upgrade is approved. |
| `minimatch@10.2.6` and affected `@typescript-eslint/*` packages | Development lint/parser toolchain | Moderate | Used during local and Amplify validation against repository-controlled paths. These packages are not part of the intended public website functionality. | Update through compatible ESLint/TypeScript-ESLint releases when available; not a demonstrated production request path. |

## PostCSS advisories reported

- `GHSA-qx2v-qp2m-jg93`: unescaped `</style>` in CSS stringify output.
- `GHSA-6g55-p6wh-862q`: arbitrary file read through attacker-controlled CSS source-map comments.
- `GHSA-fxqj-rqcc-2cmp`: incomplete source-map handling fix when `from` is unset.
- `GHSA-r28c-9q8g-f849`: path traversal through previous source-map auto-loading.

The additional source-map advisories increase the importance of tracking the dependency, but they do not change the application exposure model: APEX CSS LLC does not accept or process user-supplied CSS.

## Remediation options

1. **Controlled Next.js 16 evaluation.** The current npm recommendation is `next@16.4.6`, a semver-major change. Test it in an isolated branch against Node 22, React, middleware behavior, Amplify SSR, metadata, headers, and all browser tests before adoption.
2. **Wait for a supported patched 15.x path.** Monitor Next.js and npm advisories for a compatible release that updates the private PostCSS dependency without a major framework migration.
3. **Temporary formal risk acceptance.** If launch proceeds on Next.js 15.5.29, record the absence of user-controlled CSS, locked `npm ci` installs, disabled uploads, security headers, monitoring owner, review date, and upgrade trigger.
4. **Do not force an unsupported nested override.** Overriding Next.js's private PostCSS version without upstream compatibility confirmation could create build or runtime failures and is not recommended as a launch shortcut.

## Launch decision

No new critical advisory or demonstrated remote exploitation path was found. Organizations that prohibit unresolved high-severity scanner findings must treat the PostCSS result as a launch blocker. Otherwise, launch requires explicit technical or company risk acceptance plus a scheduled framework-remediation review; silence or the absence of a public form is not sufficient acceptance.
