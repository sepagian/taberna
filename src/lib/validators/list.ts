import { z } from "zod";

export const listCreateSchema = z.object({
	name: z.string("Nama wajib diisi").min(1, "Nama wajib diisi").max(255),
});

export type ListCreateSchema = typeof listCreateSchema;
