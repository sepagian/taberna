import { json } from "@sveltejs/kit";
import { ItemQueries, ListQueries } from "$lib/server/db/query";
import { getDb, getUserId, unauthorized } from "$lib/server/helpers";
import { serializeItem } from "$lib/server/serializers";
import { createItemId } from "$lib/utils/id";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async (event) => {
	const userId = getUserId(event);
	if (!userId) {
		return unauthorized();
	}

	const body = await event.request.json();
	const { listId, name } = body as { listId: string; name: string };

	if (!(listId && name)) {
		return json({ error: "listId and name required" }, { status: 400 });
	}

	const db = getDb(event);

	const list = await ListQueries.get(db, listId);
	if (!list) {
		return json({ error: "list not found" }, { status: 404 });
	}

	const id = createItemId();
	const item = await ItemQueries.create(db, { id, listId, name });
	if (!item) {
		return json({ error: "failed to create item" }, { status: 500 });
	}

	return json({ item: serializeItem(item) });
};
