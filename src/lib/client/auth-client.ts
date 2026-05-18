import { createAuthClient } from "better-auth/svelte";
import { env } from "$env/dynamic/private";

export const authClient = createAuthClient({
	baseURL: env.ORIGIN,
});
