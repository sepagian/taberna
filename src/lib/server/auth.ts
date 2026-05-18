import { kyselyAdapter } from "@better-auth/kysely-adapter";
import { betterAuth } from "better-auth/minimal";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
import { env } from "$env/dynamic/private";
import { getKysely } from "$lib/server/db";

const getAuthConfig = () =>
	({
		baseURL: env.ORIGIN,
		secret: env.BETTER_AUTH_SECRET,
		account: {
			accountLinking: {
				trustedProviders: ["google"],
			},
		},
		emailAndPassword: { enabled: false },
		socialProviders: {
			google: {
				clientId: env.GOOGLE_CLIENT_ID as string,
				clientSecret: env.GOOGLE_CLIENT_SECRET as string,
			},
		},
		session: {
			cookieCache: {
				enabled: true,
				maxAge: 60,
			},
		},
		plugins: [
			sveltekitCookies(getRequestEvent),
		],
		advanced: {
			defaultCookieAttributes: {
				sameSite: "none" as const,
				secure: true,
				httpOnly: true,
			},
			crossSubDomainCookies: {
				enabled: true,
				domain: "taberna.rizky.workers.dev",
			},
		},
	}) satisfies Omit<Parameters<typeof betterAuth>[0], "database">;

export const createAuth = (d1: D1Database | null) =>
	betterAuth({
		...getAuthConfig(),
		database: kyselyAdapter(getKysely(d1), { type: "sqlite" }),
	});
