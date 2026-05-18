import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import UnoCSS from "@unocss/svelte-scoped/preprocess";

const newLocal = /[/\\]/;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) =>
			filename.split(newLocal).includes("node_modules") ? undefined : true,
	},
	kit: {
		adapter: adapter(),
		typescript: {
			config: (config) => ({
				...config,
				include: [
					...config.include,
					"../drizzle.config.ts",
					"./drizzle.local.config.ts",
				],
			}),
		},
	},
	preprocess: [
		vitePreprocess(),
		UnoCSS({ configOrPath: "./uno.config.ts", exclude: ["./node_modules"] }),
	],
};

export default config;
