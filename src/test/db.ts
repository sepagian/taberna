import { CamelCasePlugin, Kysely, SqliteDialect } from "kysely";
import initSqlJs from "sql.js";
import type { DB } from "$lib/db";

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS "user" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "email" text NOT NULL UNIQUE,
  "email_verified" integer DEFAULT 0 NOT NULL,
  "image" text,
  "created_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)),
  "updated_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer))
);

CREATE TABLE IF NOT EXISTS "session" (
  "id" text PRIMARY KEY NOT NULL,
  "expires_at" integer NOT NULL,
  "token" text NOT NULL UNIQUE,
  "created_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)),
  "updated_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)),
  "ip_address" text,
  "user_agent" text,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "account" (
  "id" text PRIMARY KEY NOT NULL,
  "account_id" text NOT NULL,
  "provider_id" text NOT NULL,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "access_token" text,
  "refresh_token" text,
  "id_token" text,
  "access_token_expires_at" integer,
  "refresh_token_expires_at" integer,
  "scope" text,
  "password" text,
  "created_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)),
  "updated_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer))
);

CREATE TABLE IF NOT EXISTS "verification" (
  "id" text PRIMARY KEY NOT NULL,
  "identifier" text NOT NULL,
  "value" text NOT NULL,
  "expires_at" integer NOT NULL,
  "created_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)),
  "updated_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer))
);

CREATE TABLE IF NOT EXISTS "list" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text REFERENCES "user"("id") ON DELETE CASCADE,
  "name" text NOT NULL,
  "created_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)),
  "updated_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer))
);

CREATE TABLE IF NOT EXISTS "item" (
  "id" text PRIMARY KEY NOT NULL,
  "list_id" text NOT NULL REFERENCES "list"("id") ON DELETE CASCADE,
  "name" text NOT NULL,
  "checked" integer DEFAULT 0,
  "created_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)),
  "updated_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer))
);

CREATE INDEX IF NOT EXISTS "session_userId_idx" ON "session" ("user_id");
CREATE INDEX IF NOT EXISTS "account_userId_idx" ON "account" ("user_id");
CREATE INDEX IF NOT EXISTS "verification_identifier_idx" ON "verification" ("identifier");
CREATE INDEX IF NOT EXISTS "list_user_id_idx" ON "list" ("user_id");
CREATE INDEX IF NOT EXISTS "list_last_updated_idx" ON "list" ("updated_at");
CREATE INDEX IF NOT EXISTS "item_list_id_idx" ON "item" ("list_id");
CREATE INDEX IF NOT EXISTS "item_last_updated_idx" ON "item" ("updated_at");
`;

function isSelectSQL(sql: string): boolean {
	const upper = sql.trim().toUpperCase();
	return upper.startsWith("SELECT") || upper.startsWith("WITH");
}

class SqlJsStatement {
	readonly #db: initSqlJs.Database;
	readonly #sql: string;
	#stmt: ReturnType<initSqlJs.Database["prepare"]> | null = null;
	readonly reader: boolean;

	constructor(db: initSqlJs.Database, sql: string) {
		this.#db = db;
		this.#sql = sql;
		this.reader = isSelectSQL(sql);
	}

	#prepare(): ReturnType<initSqlJs.Database["prepare"]> {
		if (!this.#stmt) {
			this.#stmt = this.#db.prepare(this.#sql);
		}
		return this.#stmt;
	}

	all(parameters: unknown[] = []): Record<string, unknown>[] {
		const stmt = this.#prepare();
		stmt.bind(parameters as Parameters<typeof stmt.bind>);

		const rows: Record<string, unknown>[] = [];
		while (stmt.step()) {
			const cols = stmt.getColumnNames();
			const vals = stmt.get();
			const row: Record<string, unknown> = {};
			for (let i = 0; i < cols.length; i++) {
				row[cols[i]] = vals[i];
			}
			rows.push(row);
		}
		stmt.free();
		return rows;
	}

	run(parameters: unknown[] = []): {
		changes: number;
		lastInsertRowid: number;
	} {
		if (this.reader) {
			this.all(parameters);
			return { changes: 0, lastInsertRowid: 0 };
		}

		this.#db.run(this.#sql, parameters);
		return {
			changes: this.#db.getRowsModified(),
			lastInsertRowid: 0,
		};
	}

	iterate(
		_parameters: unknown[]
	): IterableIterator<{ rows: Record<string, unknown>[] }> {
		throw new Error("Streaming not supported in sql.js adapter");
	}
}

class SqlJsDatabase {
	readonly #db: initSqlJs.Database;

	constructor(db: initSqlJs.Database) {
		this.#db = db;
	}

	prepare(sql: string): SqlJsStatement {
		return new SqlJsStatement(this.#db, sql);
	}

	close(): void {
		this.#db.close();
	}
}

let sqlPromise: Promise<initSqlJs.SqlJsStatic> | null = null;

export async function createTestDb(): Promise<Kysely<DB>> {
	if (!sqlPromise) {
		sqlPromise = initSqlJs();
	}
	const SQL = await sqlPromise;
	const sqlite = new SQL.Database();
	sqlite.run(SCHEMA_SQL);

	return new Kysely<DB>({
		dialect: new SqliteDialect({ database: new SqlJsDatabase(sqlite) }),
		plugins: [new CamelCasePlugin()],
	});
}

export const TEST_USER_ID = "test-user-1";
export const TEST_USER_EMAIL = "test@example.com";

export async function seedTestUser(db: Kysely<DB>) {
	const now = Date.now();
	await db
		.insertInto("user")
		.values({
			id: TEST_USER_ID,
			name: "Test User",
			email: TEST_USER_EMAIL,
			emailVerified: 1,
			image: null,
			createdAt: now,
			updatedAt: now,
		})
		.execute();
}

export async function seedTestList(
	db: Kysely<DB>,
	id: string,
	name = "Test List"
) {
	const now = Date.now();
	await db
		.insertInto("list")
		.values({
			id,
			userId: TEST_USER_ID,
			name,
			createdAt: now,
			updatedAt: now,
		})
		.execute();
}

export async function seedTestItem(
	db: Kysely<DB>,
	id: string,
	listId: string,
	name: string,
	checked = false
) {
	const now = Date.now();
	await db
		.insertInto("item")
		.values({
			id,
			listId,
			name,
			checked: checked ? 1 : 0,
			createdAt: now,
			updatedAt: now,
		})
		.execute();
}

export async function seedTestData(db: Kysely<DB>) {
	await seedTestUser(db);
	await seedTestList(db, "list-1", "Belanja Mingguan");
	await seedTestItem(db, "item-1", "list-1", "Telur", false);
	await seedTestItem(db, "item-2", "list-1", "Susu", true);
	await seedTestItem(db, "item-3", "list-1", "Roti", false);
	await seedTestList(db, "list-2", "Kebutuhan Rumah");
}
