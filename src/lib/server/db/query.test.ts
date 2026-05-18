import type { Kysely } from "kysely";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
	createTestDb,
	seedTestData,
	seedTestUser,
	TEST_USER_ID,
} from "$test/db";
import { ItemQueries, ListQueries } from "./query";

let db: Kysely<import("$lib/db").DB>;

beforeEach(async () => {
	db = await createTestDb();
});

afterEach(async () => {
	await db.destroy();
});

describe("ListQueries", () => {
	describe("create", () => {
		it("creates a list for a user", async () => {
			await seedTestUser(db);

			const list = await ListQueries.create(db, TEST_USER_ID, "Belanja");

			expect(list).toBeDefined();
			expect(list?.name).toBe("Belanja");
			expect(list?.userId).toBe(TEST_USER_ID);
			expect(list?.id).toHaveLength(8);
		});
	});

	describe("get", () => {
		it("retrieves a list by ID", async () => {
			await seedTestData(db);

			const list = await ListQueries.get(db, "list-1");

			expect(list).toBeDefined();
			expect(list?.name).toBe("Belanja Mingguan");
		});

		it("returns undefined for non-existent list", async () => {
			await seedTestData(db);

			const list = await ListQueries.get(db, "nonexistent");

			expect(list).toBeUndefined();
		});
	});

	describe("getByUser", () => {
		it("returns all lists for a user", async () => {
			await seedTestData(db);

			const lists = await ListQueries.getByUser(db, TEST_USER_ID);

			expect(lists).toHaveLength(2);
			expect(lists.map((l) => l.name)).toContain("Belanja Mingguan");
			expect(lists.map((l) => l.name)).toContain("Kebutuhan Rumah");
		});

		it("returns empty array for user with no lists", async () => {
			await seedTestUser(db);

			const lists = await ListQueries.getByUser(db, TEST_USER_ID);

			expect(lists).toEqual([]);
		});
	});

	describe("getByUserWithStats", () => {
		it("returns lists with item counts", async () => {
			await seedTestData(db);

			const lists = await ListQueries.getByUserWithStats(db, TEST_USER_ID);

			const mainList = lists.find((l) => l.id === "list-1");
			expect(mainList).toBeDefined();
			expect(Number(mainList?.totalCount)).toBe(3);
			expect(Number(mainList?.checkedCount)).toBe(1);
		});

		it("returns zero counts for empty list", async () => {
			await seedTestData(db);

			const lists = await ListQueries.getByUserWithStats(db, TEST_USER_ID);

			const emptyList = lists.find((l) => l.id === "list-2");
			expect(emptyList).toBeDefined();
			expect(Number(emptyList?.totalCount)).toBe(0);
			expect(Number(emptyList?.checkedCount)).toBe(0);
		});
	});

	describe("update", () => {
		it("updates list name when owned by user", async () => {
			await seedTestData(db);

			const updated = await ListQueries.update(
				db,
				"list-1",
				TEST_USER_ID,
				"Belanja Baru"
			);

			expect(updated).toBeDefined();
			expect(updated?.name).toBe("Belanja Baru");
		});

		it("returns undefined when not owned by user", async () => {
			await seedTestData(db);

			const updated = await ListQueries.update(
				db,
				"list-1",
				"other-user",
				"Stolen"
			);

			expect(updated).toBeUndefined();
		});

		it("returns undefined for non-existent list", async () => {
			await seedTestUser(db);

			const updated = await ListQueries.update(
				db,
				"nonexistent",
				TEST_USER_ID,
				"Test"
			);

			expect(updated).toBeUndefined();
		});
	});

	describe("delete", () => {
		it("deletes list and returns true when owned", async () => {
			await seedTestData(db);

			const deleted = await ListQueries.delete(db, "list-1", TEST_USER_ID);

			expect(deleted).toBe(true);

			const gone = await ListQueries.get(db, "list-1");
			expect(gone).toBeUndefined();
		});

		it("returns false when not owned by user", async () => {
			await seedTestData(db);

			const deleted = await ListQueries.delete(db, "list-1", "other-user");

			expect(deleted).toBe(false);

			const stillThere = await ListQueries.get(db, "list-1");
			expect(stillThere).toBeDefined();
		});
	});

	describe("claim", () => {
		it("assigns an anonymous list to a user", async () => {
			await seedTestUser(db);

			await db
				.insertInto("list")
				.values({
					id: "anon-1",
					userId: null,
					name: "Anon List",
					createdAt: Date.now(),
					updatedAt: Date.now(),
				})
				.execute();

			await ListQueries.claim(db, "anon-1", TEST_USER_ID);

			const claimed = await ListQueries.get(db, "anon-1");
			expect(claimed?.userId).toBe(TEST_USER_ID);
		});
	});
});

describe("ItemQueries", () => {
	describe("create", () => {
		it("creates an item in a list", async () => {
			await seedTestData(db);

			const item = await ItemQueries.create(db, {
				id: "new-item",
				listId: "list-1",
				name: "Minyak",
			});

			expect(item).toBeDefined();
			expect(item?.name).toBe("Minyak");
			expect(item?.checked).toBe(0); // default false
		});
	});

	describe("getAll", () => {
		it("returns all items for a list", async () => {
			await seedTestData(db);

			const items = await ItemQueries.getAll(db, "list-1");

			expect(items).toHaveLength(3);
		});

		it("returns empty array for list with no items", async () => {
			await seedTestData(db);

			const items = await ItemQueries.getAll(db, "list-2");

			expect(items).toEqual([]);
		});
	});

	describe("get", () => {
		it("retrieves item by ID", async () => {
			await seedTestData(db);

			const item = await ItemQueries.get(db, "item-1");

			expect(item).toBeDefined();
			expect(item?.name).toBe("Telur");
		});

		it("returns undefined for non-existent item", async () => {
			await seedTestData(db);

			const item = await ItemQueries.get(db, "nonexistent");

			expect(item).toBeUndefined();
		});
	});

	describe("getWithListOwner", () => {
		it("returns item with list owner ID", async () => {
			await seedTestData(db);

			const result = await ItemQueries.getWithListOwner(db, "item-1");

			expect(result).toBeDefined();
			expect(result?.listOwnerId).toBe(TEST_USER_ID);
			expect(result?.name).toBe("Telur");
		});
	});

	describe("update", () => {
		it("updates item name", async () => {
			await seedTestData(db);

			const updated = await ItemQueries.update(db, "item-1", {
				name: "Telur Omega",
			});

			expect(updated?.name).toBe("Telur Omega");
		});

		it("updates item checked state", async () => {
			await seedTestData(db);

			const updated = await ItemQueries.update(db, "item-1", { checked: true });

			expect(updated?.checked).toBe(1);
		});

		it("updates both name and checked state", async () => {
			await seedTestData(db);

			const updated = await ItemQueries.update(db, "item-1", {
				name: "Telur Baru",
				checked: true,
			});

			expect(updated?.name).toBe("Telur Baru");
			expect(updated?.checked).toBe(1);
		});
	});

	describe("delete", () => {
		it("deletes an item", async () => {
			await seedTestData(db);

			await ItemQueries.delete(db, "item-1");

			const gone = await ItemQueries.get(db, "item-1");
			expect(gone).toBeUndefined();
		});
	});
});
