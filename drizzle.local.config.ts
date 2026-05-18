import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/lib/server/db/schema",
	dialect: "sqlite",
	dbCredentials: {
		url: "./src/lib/server/db/data.sqlite",
	},
	verbose: true,
	strict: true,
});
