import { json } from "@sveltejs/kit";
import type { Kysely } from "kysely";
import type { DB } from "$lib/db";
import { getKysely } from "$lib/server/db";

/**
 * Extracts the D1 binding from the SvelteKit platform and returns a Kysely instance.
 * @param event - SvelteKit request event or object containing platform
 * @returns Kysely database instance typed for the application schema
 */
export function getDb(event: { platform?: App.Platform | null }): Kysely<DB> {
  const d1 = event.platform?.env?.DB ?? null;
  return getKysely(d1) as Kysely<DB>;
}

/**
 * Retrieves the authenticated user's ID from SvelteKit locals.
 * @param event - SvelteKit request event or object containing locals
 * @returns The user's ID or null if not authenticated
 */
export function getUserId(event: { locals: App.Locals }): string | null {
  return event.locals.user?.id ?? null;
}

/**
 * Returns a standardized 401 Unauthorized JSON response.
 */
export function unauthorized(): Response {
  return json({ error: "unauthorized" }, { status: 401 });
}

/**
 * Returns a standardized 404 Not Found JSON response.
 * @param message - Optional custom error message
 */
export function notFound(message = "not found"): Response {
  return json({ error: message }, { status: 404 });
}
