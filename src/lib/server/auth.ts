import { kyselyAdapter } from "@better-auth/kysely-adapter";
import { betterAuth } from "better-auth/minimal";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
import { env } from "$env/dynamic/private";
import { getKysely } from "$lib/server/db";

const authConfig = {
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
	plugins: [
		sveltekitCookies(getRequestEvent), // make sure this is the last plugin in the array
	],
} satisfies Omit<Parameters<typeof betterAuth>[0], "database">;

export const createAuth = (d1: D1Database | null) =>
	betterAuth({
		...authConfig,
		database: kyselyAdapter(getKysely(d1), { type: "sqlite" }),
	});
