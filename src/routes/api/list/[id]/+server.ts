import { json } from "@sveltejs/kit";
import { ItemQueries, ListQueries } from "$lib/server/db/query";
import { getDb, getUserId, unauthorized } from "$lib/server/helpers";
import { serializeItem, serializeList } from "$lib/server/serializers";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async (event) => {
	const { id } = event.params;
	const db = getDb(event);

	const list = await ListQueries.get(db, id);
	if (!list) {
		return json({ error: "list not found" }, { status: 404 });
	}

	const items = await ItemQueries.getAll(db, id);

	return json({
		list: serializeList(list),
		items: items.map(serializeItem),
	});
};

export const PATCH: RequestHandler = async (event) => {
	const userId = getUserId(event);
	if (!userId) {
		return unauthorized();
	}

	const { id } = event.params;
	const body = await event.request.json();
	const { name } = body as { name?: string };

	if (!name || typeof name !== "string") {
		return json({ error: "name required" }, { status: 400 });
	}

	const db = getDb(event);
	const updated = await ListQueries.update(db, id, userId, name);
	if (!updated) {
		return json({ error: "not found or not owned" }, { status: 404 });
	}

	return json({ list: serializeList(updated) });
};

export const DELETE: RequestHandler = async (event) => {
	const userId = getUserId(event);
	if (!userId) {
		return unauthorized();
	}

	const { id } = event.params;
	const db = getDb(event);

	const deleted = await ListQueries.delete(db, id, userId);
	if (!deleted) {
		return json({ error: "not found or not owned" }, { status: 404 });
	}

	return json({ success: true });
};
