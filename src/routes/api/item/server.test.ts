import { describe, expect, it } from "vitest";
import { createEvent, setupApiTest } from "$test/api-utils";
import { POST } from "./+server";

const { setUserId } = setupApiTest();

describe("POST /api/item", () => {
	it("returns 401 when unauthenticated", async () => {
		setUserId(null);
		const event = createEvent({
			request: new Request("http://localhost", {
				method: "POST",
				body: JSON.stringify({ listId: "list-1", name: "Telur" }),
			}),
		});

		const response = await POST(event);

		expect(response.status).toBe(401);
	});

	it("creates item in a list", async () => {
		setUserId("test-user-1");
		const event = createEvent({
			request: new Request("http://localhost", {
				method: "POST",
				body: JSON.stringify({ listId: "list-1", name: "Minyak Goreng" }),
			}),
		});

		const response = await POST(event);
		const body = (await response.json()) as {
			item: { name: string; listId: string };
		};

		expect(response.status).toBe(200);
		expect(body.item.name).toBe("Minyak Goreng");
		expect(body.item.listId).toBe("list-1");
	});

	it("returns 400 when listId is missing", async () => {
		setUserId("test-user-1");
		const event = createEvent({
			request: new Request("http://localhost", {
				method: "POST",
				body: JSON.stringify({ name: "Telur" }),
			}),
		});

		const response = await POST(event);

		expect(response.status).toBe(400);
	});

	it("returns 400 when name is missing", async () => {
		setUserId("test-user-1");
		const event = createEvent({
			request: new Request("http://localhost", {
				method: "POST",
				body: JSON.stringify({ listId: "list-1" }),
			}),
		});

		const response = await POST(event);

		expect(response.status).toBe(400);
	});

	it("returns 404 for non-existent list", async () => {
		setUserId("test-user-1");
		const event = createEvent({
			request: new Request("http://localhost", {
				method: "POST",
				body: JSON.stringify({ listId: "nonexistent", name: "Telur" }),
			}),
		});

		const response = await POST(event);

		expect(response.status).toBe(404);
	});
});
