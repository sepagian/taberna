import { get } from "svelte/store";
import { _ } from "svelte-i18n";
import { invalidateAll } from "$app/navigation";
import { api, withToast } from "$lib/client/api";
import { parseInput } from "$lib/utils/parse";

const toastError = () => get(_)("toast.error");

/**
 * Adds one or more items to a list.
 * Parses comma/newline-separated strings into individual items.
 * Refreshes the list after adding.
 * @param listId - Target list ID
 * @param names - Item name(s), either a single string or array of strings
 */
export async function addItems(listId: string, names: string | string[]) {
  const nameList = Array.isArray(names) ? names : parseInput(names);
  if (nameList.length === 0) {
    return;
  }

  return await withToast(
    (async () => {
      for (const name of nameList) {
        await api.post("/api/item", { listId, name });
      }
      await invalidateAll();
    })(),
    {
      loading: get(_)("toast.loading"),
      success: get(_)("toast.item.add_success", {
        values: { count: nameList.length },
      }),
      error: toastError,
    },
  );
}

/**
 * Toggles the checked state of an item.
 * Refreshes the list after toggling.
 * @param itemId - ID of the item to toggle
 * @param checked - Current checked state
 */
export async function toggleItem(itemId: string, checked: boolean) {
  return await withToast(
    (async () => {
      await api.patch(`/api/item/${encodeURIComponent(itemId)}`, {
        checked: !checked,
      });
      await invalidateAll();
    })(),
    {
      loading: get(_)("toast.loading"),
      success: get(_)("toast.item.toggle_success"),
      error: toastError,
    },
  );
}

/**
 * Updates an item's name.
 * Refreshes the list after editing.
 * @param itemId - ID of the item to edit
 * @param name - New item name
 */
export async function editItem(itemId: string, name: string) {
  return await withToast(
    (async () => {
      await api.patch(`/api/item/${encodeURIComponent(itemId)}`, { name });
      await invalidateAll();
    })(),
    {
      loading: get(_)("toast.loading"),
      success: get(_)("toast.item.edit_success"),
      error: toastError,
    },
  );
}

/**
 * Deletes an item from a list.
 * Refreshes the list after deletion.
 * @param itemId - ID of the item to delete
 */
export async function deleteItem(itemId: string) {
  return await withToast(
    (async () => {
      await api.delete(`/api/item/${encodeURIComponent(itemId)}`);
      await invalidateAll();
    })(),
    {
      loading: get(_)("toast.loading"),
      success: get(_)("toast.item.delete_success"),
      error: toastError,
    },
  );
}

/**
 * Resets the checked state of multiple items to false.
 * Refreshes the list after resetting.
 * @param itemIds - Array of item IDs to reset
 */
export async function resetItems(itemIds: string[]) {
  if (itemIds.length === 0) {
    return;
  }

  return await withToast(
    (async () => {
      for (const id of itemIds) {
        await api.patch(`/api/item/${encodeURIComponent(id)}`, {
          checked: false,
        });
      }
      await invalidateAll();
    })(),
    {
      loading: get(_)("toast.loading"),
      success: get(_)("toast.item.reset_success", {
        values: { count: itemIds.length },
      }),
      error: toastError,
    },
  );
}
