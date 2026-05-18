import Database from "better-sqlite3";
import { CamelCasePlugin, Kysely, SqliteDialect } from "kysely";
import { D1Dialect } from "kysely-d1";
import type { DB } from "$lib/db";

const prod = process.env.NODE_ENV !== "development";

/**
 * Returns a Kysely query builder instance configured for the current environment.
 * Uses D1 dialect in production; falls back to a local SQLite dialect in development.
 * Applies camelCase plugin to column names.
 * @param d1 - Cloudflare D1 database binding or null
 * @returns Configured Kysely instance
 */
export const getKysely = (d1: D1Database | null) => {
	if (prod && d1) {
		return new Kysely<DB>({
			dialect: new D1Dialect({ database: d1 }),
			plugins: [new CamelCasePlugin()],
		});
	}
	return new Kysely({
		dialect: new SqliteDialect({
			database: async () => new Database("./src/lib/server/db/data.sqlite"),
		}),
		plugins: [new CamelCasePlugin()],
	});
};
