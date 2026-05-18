import { describe, expect, it } from "vitest";
import { createEvent, setupApiTest } from "$test/api-utils";
import { POST } from "./+server";

const { setUserId } = setupApiTest();

describe("POST /api/list", () => {
	it("returns 401 when unauthenticated", async () => {
		setUserId(null);
		const event = createEvent({
			request: new Request("http://localhost", {
				method: "POST",
				body: JSON.stringify({ name: "Test" }),
			}),
		});

		const response = await POST(event);

		expect(response.status).toBe(401);
	});

	it("creates a list with given name", async () => {
		setUserId("test-user-1");
		const event = createEvent({
			request: new Request("http://localhost", {
				method: "POST",
				body: JSON.stringify({ name: "Belanja Baru" }),
			}),
		});

		const response = await POST(event);
		const body = (await response.json()) as { list: { name: string } };

		expect(response.status).toBe(200);
		expect(body.list.name).toBe("Belanja Baru");
	});

	it("defaults name to 'New List' when not provided", async () => {
		setUserId("test-user-1");
		const event = createEvent({
			request: new Request("http://localhost", {
				method: "POST",
				body: JSON.stringify({}),
			}),
		});

		const response = await POST(event);
		const body = (await response.json()) as { list: { name: string } };

		expect(response.status).toBe(200);
		expect(body.list.name).toBe("New List");
	});
});
