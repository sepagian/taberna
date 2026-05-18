import { relations, sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createListId } from "$lib/utils/id";
import { user } from "./auth";
import { item } from "./item";

export const list = sqliteTable(
	"list",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => createListId()),
		userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
		name: text("name").notNull(),
		createdAt: integer("created_at", { mode: "timestamp_ms" })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
			.notNull(),
		updatedAt: integer("updated_at", { mode: "timestamp_ms" })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
			.$onUpdate((/* @__PURE__ */) => new Date())
			.notNull(),
	},
	(table) => ({
		lastUpdatedIdx: index("list_last_updated_idx").on(table.updatedAt),
		userIdIdx: index("list_user_id_idx").on(table.userId),
	})
);

export const listRelations = relations(list, ({ one, many }) => ({
	user: one(user, { fields: [list.userId], references: [user.id] }),
	item: many(item),
}));
