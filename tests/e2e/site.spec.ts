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
});

test("unverified credentials and pre-launch notices remain qualified", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("Certification, registration, and identifier status shown here should not be treated as active until verified.")).toBeVisible();
  await expect(page.locator("body")).not.toContainText("APEX CSS LLC is a Service-Disabled Veteran-Owned Small Business");

  await page.goto("/government-contracting", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("No pending classification or identifier should be treated as active.", { exact: false })).toBeVisible();
  await expect(page.getByRole("link", { name: "Download Draft Capability Statement" })).toHaveAttribute("href", /Draft\.pdf$/);

  await page.goto("/privacy", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("This is a pre-launch privacy notice and requires company and legal review before production deployment.")).toBeVisible();
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
