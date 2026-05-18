import path from "node:path";
import { sveltekit } from "@sveltejs/kit/vite";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite-plus";

export default defineConfig({
	staged: {
		"*": "vp check --fix",
	},
	fmt: {},
	lint: { options: { typeAware: true, typeCheck: true } },
	plugins: [UnoCSS(), sveltekit()],
	server: {
		host: true,
		port: 5432,
	},
	resolve: {
		alias: {
			$test: path.resolve("./src/test"),
		},
	},
	test: {
		globals: true,
		setupFiles: ["./src/test/setup.ts"],
	},
});
