import { expect, test } from "@playwright/test";

const pages = [
  ["/", /Veteran-Led Excellence/],
  ["/about", /Purpose built for/],
  ["/services", /Integrated support/],
  ["/government-contracting", /Ready to support/],
  ["/teaming", /Stronger solutions/],
  ["/contact", /Start with the requirement/],
  ["/privacy", /Responsible handling/],
] as const;

for (const [path, heading] of pages) {
  test(`${path} renders without a runtime error`, async ({ page }) => {
    const runtimeErrors: Error[] = [];
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];
    page.on("pageerror", (error) => runtimeErrors.push(error));
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("requestfailed", (request) => failedRequests.push(`${request.method()} ${request.url()}`));
    const response = await page.goto(path, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    expect(await page.locator("body").innerText()).not.toMatch(/webpack_modules|Runtime TypeError/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    expect(runtimeErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
    expect(failedRequests).toEqual([]);
  });
}

test("desktop navigation reaches government contracting", async ({ page, isMobile }) => {
  test.skip(isMobile, "Desktop navigation check");
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Government" }).click();
  await expect(page).toHaveURL(/government-contracting/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Ready to support");
});

test("mobile navigation expands and follows links", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile navigation check");
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Toggle navigation" }).click();
  const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(mobileNav).toBeVisible();
  await mobileNav.getByRole("link", { name: "Services" }).click();
  await expect(page).toHaveURL(/services/);
});

test("contact backend validates and accepts preview submissions", async ({ request }, testInfo) => {
  const baseURL = String(testInfo.project.use.baseURL ?? "");
  const explicitlyEnabled = process.env.PLAYWRIGHT_ALLOW_VALID_CONTACT_TEST === "true";
  test.skip(
    !explicitlyEnabled || !/^http:\/\/(127\.0\.0\.1|localhost)/.test(baseURL),
    "Valid submissions require an explicit local-only test opt-in",
  );
  const response = await request.post("/api/contact", {
    headers: { "x-forwarded-for": "203.0.113.10" },
    data: {
      name: "Preview Tester",
      company: "APEX QA",
      email: "tester@example.com",
      inquiryType: "General inquiry",
      message: "This is a local browser test of the inquiry validation workflow.",
      website: "",
      startedAt: Date.now() - 5000,
    },
  });
  expect(response.status()).toBe(202);
  await expect(response.json()).resolves.toMatchObject({ message: expect.stringContaining("validated") });
});

test("contact backend rejects invalid payloads", async ({ request }) => {
  const response = await request.post("/api/contact", { data: { name: "x" } });
  expect(response.status()).toBe(400);
});

test("contact page clearly exposes the verified email fallback", async ({ page }) => {
  await page.goto("/contact", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("Online submission is temporarily unavailable")).toBeVisible();
  await expect(page.getByRole("button", { name: "Submit inquiry" })).toBeDisabled();
  await expect(page.getByRole("link", { name: "apexcssllc@gmail.com" }).first()).toHaveAttribute(
    "href",
    "mailto:apexcssllc@gmail.com",
  );
  await expect(page.getByRole("link", { name: "(410) 575-4377" }).first()).toHaveAttribute(
    "href",
    "tel:+14105754377",
  );
});

test("verified credentials and remaining pre-launch notices are accurate", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("SDVOSB & VOSB", { exact: true })).toBeVisible();
  await expect(page.getByText("October 21, 2026", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("VP2LS7WJGFP3", { exact: true })).toBeVisible();
  await expect(page.getByText("261U4", { exact: true })).toBeVisible();

  await page.goto("/government-contracting", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("SBA Certified", { exact: true })).toHaveCount(2);
  await expect(page.getByText("Status not published", { exact: true })).toBeVisible();
  await expect(page.getByText("541511", { exact: true })).toBeVisible();
  await expect(page.getByText("Primary", { exact: true })).toBeVisible();
  for (const code of ["423430", "518210", "541512", "541519", "541618", "541690"]) {
    await expect(page.getByText(code, { exact: true })).toBeVisible();
  }
  await expect(page.getByText("(410) 575-4377", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "View official SBA profile" })).toHaveAttribute("href", /search\.certifications\.sba\.gov/);
  await expect(page.getByRole("link", { name: "Download Draft Capability Statement" })).toHaveAttribute("href", /Draft\.pdf$/);

  await page.goto("/privacy", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("Proposed privacy policy for company and legal review.", { exact: false })).toBeVisible();
  await expect(page.getByText("does not have a finite expiration setting", { exact: false })).toBeVisible();
});

test("canonical and Open Graph URLs match each public page", async ({ page }) => {
  const routes = ["/", "/about", "/services", "/government-contracting", "/teaming", "/contact", "/privacy"];

  for (const path of routes) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    const expected = `https://apexcssllc.com${path === "/" ? "" : path}`;
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", expected);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", expected);
  }
});

test("Amplify preview responses are noindex while the apex host remains indexable", async ({ request }) => {
  const previewHeaders = { Host: "main.d6muetodzpv4k.amplifyapp.com" };
  const previewPage = await request.get("/", { headers: previewHeaders });
  const previewPdf = await request.get("/downloads/APEX-CSS-LLC-Capability-Statement-Draft.pdf", { headers: previewHeaders });
  const apexPage = await request.get("/", { headers: { Host: "apexcssllc.com" } });

  expect(previewPage.headers()["x-robots-tag"]).toBe("noindex, nofollow");
  expect(previewPdf.headers()["x-robots-tag"]).toBe("noindex, nofollow");
  expect(apexPage.headers()["x-robots-tag"]).toBeUndefined();
});

test("production security headers remain active", async ({ request }) => {
  const response = await request.get("/");
  const headers = response.headers();

  expect(headers["strict-transport-security"]).toBe("max-age=31536000");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toContain("camera=()");
  expect(headers["cross-origin-opener-policy"]).toBe("same-origin");
  expect(headers["content-security-policy"]).toContain("default-src 'self'");
  expect(headers["content-security-policy"]).toContain("upgrade-insecure-requests");
});

test("SEO and public assets are available", async ({ request }) => {
  const checks = [
    ["/robots.txt", /text\/plain/],
    ["/sitemap.xml", /application\/xml/],
    ["/manifest.webmanifest", /application\/manifest\+json/],
    ["/downloads/APEX-CSS-LLC-Capability-Statement-Draft.pdf", /application\/pdf/],
  ] as const;

  for (const [path, contentType] of checks) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    expect(response.headers()["content-type"], path).toMatch(contentType);
  }
});
