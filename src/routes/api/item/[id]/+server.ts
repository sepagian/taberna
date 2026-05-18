import { json } from "@sveltejs/kit";
import { ItemQueries } from "$lib/server/db/query";
import { getDb, getUserId, unauthorized } from "$lib/server/helpers";
import { serializeItem } from "$lib/server/serializers";
import type { RequestHandler } from "./$types";

export const PATCH: RequestHandler = async (event) => {
	const userId = getUserId(event);
	const { id } = event.params;
	const body = await event.request.json();
	const { name, checked } = body as { name?: string; checked?: boolean };

	const db = getDb(event);
	const record = await ItemQueries.getWithListOwner(db, id);
	if (!record) {
		return json({ error: "item not found" }, { status: 404 });
	}

	const updateData: { name?: string; checked?: boolean } = {};

	if (name !== undefined) {
		if (!userId || record.listOwnerId !== userId) {
			return json({ error: "forbidden" }, { status: 403 });
		}
		updateData.name = name;
	}

	if (checked !== undefined) {
		updateData.checked = checked;
	}

	if (!Object.keys(updateData).length) {
		return json({ error: "no fields to update" }, { status: 400 });
	}

	const updated = await ItemQueries.update(db, id, updateData);
	if (!updated) {
		return json({ error: "failed to update item" }, { status: 500 });
	}

	return json({ item: serializeItem(updated) });
};

export const DELETE: RequestHandler = async (event) => {
	const userId = getUserId(event);
	if (!userId) {
		return unauthorized();
	}

	const { id } = event.params;
	const db = getDb(event);

	const record = await ItemQueries.getWithListOwner(db, id);
	if (!record) {
		return json({ error: "item not found" }, { status: 404 });
	}
	if (record.listOwnerId !== userId) {
		return json({ error: "forbidden" }, { status: 403 });
	}

	await ItemQueries.delete(db, id);
	return json({ success: true });
};
