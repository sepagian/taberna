import { ItemQueries, ListQueries } from "$lib/server/db/query";
import { getDb } from "$lib/server/helpers";
import { serializeItem, serializeList } from "$lib/server/serializers";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  const db = getDb(event);
  const list = await ListQueries.get(db, event.params.id);

  if (!list) {
    return {
      list: null,
      items: [],
      listName: null,
    };
  }

  const items = await ItemQueries.getAll(db, list.id);

  return {
    list: serializeList(list),
    items: items.map(serializeItem).sort((a, b) => a.createdAt - b.createdAt),
    listName: list.name,
  };
};
