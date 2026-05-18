import type { Item, List } from "$lib/types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, fetch }) => {
	const response = await fetch(`/api/list/${encodeURIComponent(params.id)}`);
	if (!response.ok) {
		return {
			list: null as List | null,
			items: [] as Item[],
			listName: null as string | null,
		};
	}

	const data = (await response.json()) as { list: List; items: Item[] };
	return {
		list: data.list,
		items: [...data.items].sort((a, b) => a.createdAt - b.createdAt),
		listName: data.list.name,
	};
};
