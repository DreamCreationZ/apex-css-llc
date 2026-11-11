import { expect, test } from "@playwright/test";

const pages = [
  ["/", /Veteran-Led Excellence/],
  ["/about", /Purpose built for/],
  ["/services", /Integrated support/],
  ["/government-contracting", /Ready to support/],
  ["/teaming", /Stronger solutions/],
  ["/contact", /Start with the requirement/],
] as const;

for (const [path, heading] of pages) {
  test(`${path} renders without a runtime error`, async ({ page }) => {
    const runtimeErrors: Error[] = [];
    page.on("pageerror", (error) => runtimeErrors.push(error));
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    expect(await page.locator("body").innerText()).not.toMatch(/webpack_modules|Runtime TypeError/);
    expect(runtimeErrors).toEqual([]);
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

test("contact backend validates and accepts preview submissions", async ({ request }) => {
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
