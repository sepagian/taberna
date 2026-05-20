import { type Kysely, sql } from "kysely";
import type { DB } from "$lib/db";
import { createListId } from "$lib/utils/id";

/**
 * Database query operations for shopping lists.
 */
export const ListQueries = {
  /**
   * Creates a new list for the given user and returns it.
   * @param db - Kysely database instance
   * @param userId - ID of the user owning the list
   * @returns The newly created list row
   */
  async create(db: Kysely<DB>, userId: string, name: string) {
    const id = createListId();
    await db.insertInto("list").values({ id, userId, name }).executeTakeFirst();
    const [row] = await db
      .selectFrom("list")
      .selectAll()
      .where("userId", "=", userId)
      .orderBy("createdAt", "desc")
      .limit(1)
      .execute();
    return row;
  },

  /**
   * Retrieves a single list by its ID.
   * @param db - Kysely database instance
   * @param id - List ID
   * @returns The list row or undefined if not found
   */
  async get(db: Kysely<DB>, id: string) {
    return await db.selectFrom("list").selectAll().where("id", "=", id).executeTakeFirst();
  },

  /**
   * Retrieves all lists belonging to a specific user.
   * @param db - Kysely database instance
   * @param userId - User ID
   * @returns Array of list rows
   */
  async getByUser(db: Kysely<DB>, userId: string) {
    return await db.selectFrom("list").selectAll().where("userId", "=", userId).execute();
  },

  /**
   * Retrieves all lists belonging to a specific user with item counts.
   * Left-joins the item table to compute total and checked item counts per list.
   * @param db - Kysely database instance
   * @param userId - User ID
   * @returns Array of list rows augmented with totalCount and checkedCount
   */
  async getByUserWithStats(db: Kysely<DB>, userId: string) {
    return await db
      .selectFrom("list")
      .leftJoin("item", "item.listId", "list.id")
      .select([
        "list.id",
        "list.name",
        "list.userId",
        "list.createdAt",
        "list.updatedAt",
        sql<number>`count(item.id)`.as("totalCount"),
        sql<number>`coalesce(sum(case when item.checked = 1 then 1 else 0 end), 0)`.as(
          "checkedCount",
        ),
      ])
      .where("list.userId", "=", userId)
      .groupBy("list.id")
      .orderBy("list.updatedAt", "desc")
      .execute();
  },

  /**
   * Claims an anonymous list by assigning it to a user.
   * Only succeeds if the list currently has no owner.
   * @param db - Kysely database instance
   * @param id - List ID
   * @param userId - User ID to assign
   */
  async claim(db: Kysely<DB>, id: string, userId: string) {
    await db
      .updateTable("list")
      .set({ userId })
      .where("id", "=", id)
      .where("userId", "is", null)
      .execute();
  },

  /**
   * Updates a list's name. Only the owning user may update.
   * @param db - Kysely database instance
   * @param id - List ID
   * @param userId - User ID (must match the list owner)
   * @param name - New list name
   * @returns The updated list row or undefined if not found/not owned
   */
  async update(db: Kysely<DB>, id: string, userId: string, name: string) {
    const result = await db
      .updateTable("list")
      .set({ name, updatedAt: Date.now() })
      .where("id", "=", id)
      .where("userId", "=", userId)
      .executeTakeFirst();
    if (Number(result.numUpdatedRows) === 0) {
      return;
    }
    return await db.selectFrom("list").selectAll().where("id", "=", id).executeTakeFirst();
  },

  /**
   * Deletes a list by its ID. Only the owning user may delete their own lists.
   * Items are cascade-deleted by the foreign key constraint.
   * @param db - Kysely database instance
   * @param id - List ID
   * @param userId - User ID (must match the list owner)
   * @returns Whether a row was deleted
   */
  async delete(db: Kysely<DB>, id: string, userId: string) {
    const result = await db
      .deleteFrom("list")
      .where("id", "=", id)
      .where("userId", "=", userId)
      .executeTakeFirst();
    return Number(result.numDeletedRows) > 0;
  },
};

/**
 * Database query operations for shopping items.
 */
export const ItemQueries = {
  /**
   * Creates a new item inside a list.
   * @param db - Kysely database instance
   * @param data - Item creation payload including id, listId, name, and optional checked state
   * @returns The newly created item row
   */
  async create(
    db: Kysely<DB>,
    data: { id: string; listId: string; name: string; checked?: boolean },
  ) {
    const now = Date.now();
    await db
      .insertInto("item")
      .values({
        id: data.id,
        listId: data.listId,
        name: data.name,
        checked: data.checked ? 1 : 0,
        createdAt: now,
        updatedAt: now,
      })
      .execute();
    const row = await db
      .selectFrom("item")
      .selectAll()
      .where("id", "=", data.id)
      .executeTakeFirst();
    return row;
  },

  /**
   * Retrieves all items belonging to a specific list.
   * @param db - Kysely database instance
   * @param listId - List ID
   * @returns Array of item rows
   */
  async getAll(db: Kysely<DB>, listId: string) {
    return await db.selectFrom("item").selectAll().where("listId", "=", listId).execute();
  },

  /**
   * Retrieves a single item by its ID.
   * @param db - Kysely database instance
   * @param id - Item ID
   * @returns The item row or undefined if not found
   */
  async get(db: Kysely<DB>, id: string) {
    return await db.selectFrom("item").selectAll().where("id", "=", id).executeTakeFirst();
  },

  /**
   * Retrieves a single item by its ID along with the owning list's userId.
   * @param db - Kysely database instance
   * @param id - Item ID
   * @returns Item row plus listOwnerId or undefined if not found
   */
  async getWithListOwner(db: Kysely<DB>, id: string) {
    return await db
      .selectFrom("item")
      .innerJoin("list", "list.id", "item.listId")
      .select([
        "item.id",
        "item.listId",
        "item.name",
        "item.checked",
        "item.createdAt",
        "item.updatedAt",
        "list.userId as listOwnerId",
      ])
      .where("item.id", "=", id)
      .executeTakeFirst();
  },

  /**
   * Updates an item's name and/or checked state.
   * @param db - Kysely database instance
   * @param id - Item ID
   * @param data - Partial update payload
   * @returns The updated item row
   */
  async update(db: Kysely<DB>, id: string, data: { name?: string; checked?: boolean }) {
    const update: { name?: string; checked?: number; updatedAt: number } = {
      updatedAt: Date.now(),
    };
    if (data.name !== undefined) {
      update.name = data.name;
    }
    if (data.checked !== undefined) {
      update.checked = data.checked ? 1 : 0;
    }
    await db.updateTable("item").set(update).where("id", "=", id).execute();
    const row = await db.selectFrom("item").selectAll().where("id", "=", id).executeTakeFirst();
    return row;
  },

  /**
   * Deletes an item by its ID.
   * @param db - Kysely database instance
   * @param id - Item ID
   */
  async delete(db: Kysely<DB>, id: string) {
    await db.deleteFrom("item").where("id", "=", id).execute();
  },
};
