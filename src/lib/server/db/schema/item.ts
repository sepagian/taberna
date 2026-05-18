import { relations, sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createItemId } from "$lib/utils/id";
import { list } from "./list";

export const item = sqliteTable(
	"item",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => createItemId()),
		listId: text("list_id")
			.references(() => list.id, { onDelete: "cascade" })
			.notNull(),
		name: text("name").notNull(),
		checked: integer("checked", { mode: "boolean" }).default(false),
		createdAt: integer("created_at", { mode: "timestamp_ms" })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
			.notNull(),
		updatedAt: integer("updated_at", { mode: "timestamp_ms" })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
			.$onUpdate((/* @__PURE__ */) => new Date())
			.notNull(),
	},
	(table) => ({
		listIdIdx: index("item_list_id_idx").on(table.listId),
		lastUpdatedIdx: index("item_last_updated_idx").on(table.updatedAt),
	})
);

export const itemRelations = relations(item, ({ one }) => ({
	list: one(list, { fields: [item.listId], references: [list.id] }),
}));
