import { describe, expect, it } from "vitest";
import { createEvent, setupApiTest } from "$test/api-utils";
import { DELETE, GET, PATCH } from "./+server";

const { setUserId } = setupApiTest();

describe("GET /api/list/:id", () => {
  it("returns list with items for anonymous user", async () => {
    setUserId(null);
    const event = createEvent({ params: { id: "list-1" } });

    const response = await GET(event);
    const body = (await response.json()) as {
      list: { name: string };
      items: unknown[];
    };

    expect(response.status).toBe(200);
    expect(body.list.name).toBe("Belanja Mingguan");
    expect(body.items).toHaveLength(3);
  });

  it("returns 404 for non-existent list", async () => {
    setUserId(null);
    const event = createEvent({ params: { id: "nonexistent" } });

    const response = await GET(event);

    expect(response.status).toBe(404);
  });
});

describe("PATCH /api/list/:id", () => {
  it("returns 401 when unauthenticated", async () => {
    setUserId(null);
    const event = createEvent({
      params: { id: "list-1" },
      request: new Request("http://localhost", {
        method: "PATCH",
        body: JSON.stringify({ name: "New" }),
      }),
    });

    const response = await PATCH(event);

    expect(response.status).toBe(401);
  });

  it("renames list when owner", async () => {
    setUserId("test-user-1");
    const event = createEvent({
      params: { id: "list-1" },
      request: new Request("http://localhost", {
        method: "PATCH",
        body: JSON.stringify({ name: "Belanja Baru" }),
      }),
    });

    const response = await PATCH(event);
    const body = (await response.json()) as { list: { name: string } };

    expect(response.status).toBe(200);
    expect(body.list.name).toBe("Belanja Baru");
  });

  it("returns 404 when not owned by user", async () => {
    setUserId("other-user");
    const event = createEvent({
      params: { id: "list-1" },
      request: new Request("http://localhost", {
        method: "PATCH",
        body: JSON.stringify({ name: "Stolen" }),
      }),
    });

    const response = await PATCH(event);

    expect(response.status).toBe(404);
  });

  it("returns 400 when name is missing", async () => {
    setUserId("test-user-1");
    const event = createEvent({
      params: { id: "list-1" },
      request: new Request("http://localhost", {
        method: "PATCH",
        body: JSON.stringify({}),
      }),
    });

    const response = await PATCH(event);

    expect(response.status).toBe(400);
  });
});

describe("DELETE /api/list/:id", () => {
  it("returns 401 when unauthenticated", async () => {
    setUserId(null);
    const event = createEvent({
      params: { id: "list-1" },
      request: new Request("http://localhost", { method: "DELETE" }),
    });

    const response = await DELETE(event);

    expect(response.status).toBe(401);
  });

  it("deletes list when owner", async () => {
    setUserId("test-user-1");
    const event = createEvent({
      params: { id: "list-1" },
      request: new Request("http://localhost", { method: "DELETE" }),
    });

    const response = await DELETE(event);
    const body = (await response.json()) as { success: boolean };

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
  });

  it("returns 404 when not owned by user", async () => {
    setUserId("other-user");
    const event = createEvent({
      params: { id: "list-1" },
      request: new Request("http://localhost", { method: "DELETE" }),
    });

    const response = await DELETE(event);

    expect(response.status).toBe(404);
  });
});
