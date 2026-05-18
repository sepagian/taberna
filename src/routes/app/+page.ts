import type { ListWithStats } from "$lib/types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch("/api/lists");
	if (!response.ok) {
		return { lists: [] as ListWithStats[] };
	}

	const data = (await response.json()) as { lists: ListWithStats[] };
	return {
		lists: data.lists,
	};
};
