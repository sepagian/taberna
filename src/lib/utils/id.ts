import { init } from "@paralleldrive/cuid2";

export const createItemId = init({ length: 6 });
export const createListId = init({ length: 8 });
