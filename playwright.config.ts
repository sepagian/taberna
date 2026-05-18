import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	timeout: 30_000,
	retries: 0,
	use: {
		baseURL: "http://localhost:5432",
		headless: true,
	},
	webServer: {
		command: "NODE_ENV=development vp dev",
		url: "http://localhost:5432/auth",
		reuseExistingServer: !process.env.CI,
		timeout: 30_000,
	},
});
