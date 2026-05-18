import { json } from "@sveltejs/kit";
import { ListQueries } from "$lib/server/db/query";
import { getDb, getUserId, unauthorized } from "$lib/server/helpers";
import { serializeList } from "$lib/server/serializers";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async (event) => {
	const userId = getUserId(event);
	if (!userId) {
		return unauthorized();
	}

	const body = await event.request.json();
	const { name = "New List" } = body as { name?: string };

	const db = getDb(event);
	const list = await ListQueries.create(db, userId, name);
	if (!list) {
		return json({ error: "failed to create list" }, { status: 500 });
	}

	return json({ list: serializeList(list) });
};
