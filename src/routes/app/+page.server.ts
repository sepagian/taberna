import { redirect } from "@sveltejs/kit";
import { ListQueries } from "$lib/server/db/query";
import { getDb } from "$lib/server/helpers";
import { serializeListWithStats } from "$lib/server/serializers";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) {
    redirect(302, "/auth");
  }

  const db = getDb(event);
  const lists = await ListQueries.getByUserWithStats(db, event.locals.user.id);

  return {
    lists: lists.map(serializeListWithStats),
  };
};
