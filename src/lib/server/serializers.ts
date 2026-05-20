import type { Item, List, ListWithStats } from "$lib/types";
export function serializeList(list: {
  id: string;
  name: string;
  createdAt: unknown;
  updatedAt: unknown;
  userId: string | null;
}): List {
  return {
    id: list.id,
    name: list.name,
    createdAt: Number(list.createdAt),
    updatedAt: Number(list.updatedAt),
    userId: list.userId ?? null,
  };
}
export function serializeItem(item: {
  id: string;
  listId: string;
  name: string;
  checked: number | null;
  createdAt: unknown;
  updatedAt: unknown;
}): Item {
  return {
    id: item.id,
    listId: item.listId,
    name: item.name,
    checked: Boolean(item.checked),
    createdAt: Number(item.createdAt),
    updatedAt: Number(item.updatedAt),
  };
}
export function serializeListWithStats(
  list: { totalCount: number; checkedCount: number } & Parameters<typeof serializeList>[0],
): ListWithStats {
  return {
    ...serializeList(list),
    totalCount: list.totalCount,
    checkedCount: list.checkedCount,
  };
}
