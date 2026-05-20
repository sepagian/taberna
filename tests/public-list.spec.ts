import { expect, test } from "@playwright/test";

const AKTIF_REGEX = /Aktif/;
const SELESAI_REGEX = /Selesai/;

test.describe("Public list viewing", () => {
  test("API returns list with items", async ({ page }) => {
    const response = await page.goto("/api/list/vopy29lo");
    expect(response?.status()).toBe(200);

    const body = await response?.json();
    expect(body).toHaveProperty("list");
    expect(body).toHaveProperty("items");
    expect(body.list.name).toBe("Weekly");
    expect(body.items.length).toBeGreaterThan(0);
  });

  test("displays list name in header", async ({ page }) => {
    await page.goto("/app/list/vopy29lo");

    await expect(page.getByText("Weekly")).toBeVisible({ timeout: 15_000 });
  });

  test("shows active items count in tab", async ({ page }) => {
    await page.goto("/app/list/vopy29lo");

    const activeTab = page.getByRole("tab", { name: AKTIF_REGEX });
    await expect(activeTab).toBeVisible({ timeout: 10_000 });
    const text = (await activeTab.textContent()) ?? "";
    expect(text).toContain("6");
  });

  test("completed tab shows empty state", async ({ page }) => {
    await page.goto("/app/list/vopy29lo");

    const completedTab = page.getByRole("tab", { name: SELESAI_REGEX });
    await completedTab.click();

    await expect(page.getByText("Tidak ada item selesai")).toBeAttached({
      timeout: 5000,
    });
  });

  test("can toggle an item via API", async ({ page }) => {
    const itemId = "kbmcq0";

    const patchResp = await page.request.patch(`/api/item/${itemId}`, {
      data: { checked: true },
    });
    expect(patchResp.status()).toBe(200);
    const patched = await patchResp.json();
    expect(patched.item.checked).toBe(true);

    const uncheckResp = await page.request.patch(`/api/item/${itemId}`, {
      data: { checked: false },
    });
    expect(uncheckResp.status()).toBe(200);
  });

  test("can toggle an item in UI", async ({ page }) => {
    await page.goto("/app/list/vopy29lo");

    const firstCheckbox = page.locator("[role='checkbox']").first();
    await expect(firstCheckbox).toBeVisible({ timeout: 10_000 });

    await firstCheckbox.click();
    await page.waitForTimeout(2000);

    await page.goto("/app/list/vopy29lo");
    const checkboxes = page.locator("[role='checkbox']");
    await expect(checkboxes.first()).toBeVisible({ timeout: 10_000 });
  });
});
