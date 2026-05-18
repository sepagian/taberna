import { expect, test } from "@playwright/test";

const AUTH_URL = /\/auth/;

test.describe("Auth redirect guards", () => {
	test("unauthenticated user is redirected from /app to /auth", async ({
		page,
	}) => {
		const response = await page.goto("/app");

		await expect(page).toHaveURL(AUTH_URL, { timeout: 10_000 });
		expect(response?.status()).toBe(200);
	});
});
