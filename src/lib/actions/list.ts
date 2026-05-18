import { get } from "svelte/store";
import { _ } from "svelte-i18n";
import { goto, invalidateAll } from "$app/navigation";
import { page } from "$app/state";
import { api, withToast } from "$lib/client/api";
import { titleCase } from "$lib/utils/parse";

const toastError = () => get(_)("toast.error");

export async function refreshList() {
	return await withToast(
		(async () => {
			await invalidateAll();
		})(),
		{
			loading: get(_)("toast.loading"),
			success: get(_)("toast.list.refresh_success"),
			error: toastError,
		}
	);
}

export function shareList(name: string, url: string) {
	if (navigator.share && navigator.canShare?.({ url })) {
		navigator.share({
			title: titleCase(name),
			text: "Belanja bareng yuk!",
			url,
		});
	} else {
		navigator.clipboard.writeText(url);
		import("svelte-sonner").then(({ toast }) => {
			toast.info(`${titleCase(name)} URL has been copied`);
		});
	}
}

export async function renameList(listId: string, newName: string) {
	return await withToast(
		(async () => {
			await api.patch<{ list: { name: string } }>(
				`/api/list/${encodeURIComponent(listId)}`,
				{
					name: newName,
				}
			);
			await invalidateAll();
		})(),
		{
			loading: get(_)("toast.loading"),
			success: get(_)("toast.list.rename_success"),
			error: toastError,
		}
	);
}

export async function deleteList(listId: string, name: string) {
	return await withToast(
		(async () => {
			await api.delete<{ success: boolean }>(
				`/api/list/${encodeURIComponent(listId)}`
			);
			if (page.url.pathname.includes("/list/")) {
				await goto("/app");
			}
			await invalidateAll();
		})(),
		{
			loading: get(_)("toast.loading"),
			success: get(_)("toast.list.delete_success", {
				values: { name: titleCase(name) },
			}),
			error: toastError,
		}
	);
}
