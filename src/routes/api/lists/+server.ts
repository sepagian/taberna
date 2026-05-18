import { json } from "@sveltejs/kit";
import { ListQueries } from "$lib/server/db/query";
import { getDb, getUserId, unauthorized } from "$lib/server/helpers";
import { serializeListWithStats } from "$lib/server/serializers";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async (event) => {
	const userId = getUserId(event);
	if (!userId) {
		return unauthorized();
	}

	const db = getDb(event);
	const lists = await ListQueries.getByUserWithStats(db, userId);

	return json({
		lists: lists.map(serializeListWithStats),
	});
};
