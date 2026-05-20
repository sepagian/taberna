import { describe, expect, it } from "vitest";
import { createEvent, setupApiTest } from "$test/api-utils";
import { DELETE, PATCH } from "./+server";

const { setUserId } = setupApiTest();

describe("PATCH /api/item/:id", () => {
  it("allows anonymous user to toggle checked state", async () => {
    setUserId(null);
    const event = createEvent({
      params: { id: "item-1" },
      request: new Request("http://localhost", {
        method: "PATCH",
        body: JSON.stringify({ checked: true }),
      }),
    });

    const response = await PATCH(event);
    const body = (await response.json()) as { item: { checked: boolean } };

    expect(response.status).toBe(200);
    expect(body.item.checked).toBe(true);
  });

  it("allows anonymous user to uncheck item", async () => {
    setUserId(null);
    const event = createEvent({
      params: { id: "item-2" },
      request: new Request("http://localhost", {
        method: "PATCH",
        body: JSON.stringify({ checked: false }),
      }),
    });

    const response = await PATCH(event);
    const body = (await response.json()) as { item: { checked: boolean } };

    expect(response.status).toBe(200);
    expect(body.item.checked).toBe(false);
  });

  it("returns 403 when anonymous tries to rename", async () => {
    setUserId(null);
    const event = createEvent({
      params: { id: "item-1" },
      request: new Request("http://localhost", {
        method: "PATCH",
        body: JSON.stringify({ name: "New" }),
      }),
    });

    const response = await PATCH(event);

    expect(response.status).toBe(403);
  });

  it("allows owner to rename item", async () => {
    setUserId("test-user-1");
    const event = createEvent({
      params: { id: "item-1" },
      request: new Request("http://localhost", {
        method: "PATCH",
        body: JSON.stringify({ name: "Telur Omega" }),
      }),
    });

    const response = await PATCH(event);
    const body = (await response.json()) as { item: { name: string } };

    expect(response.status).toBe(200);
    expect(body.item.name).toBe("Telur Omega");
  });

  it("returns 403 when non-owner tries to rename", async () => {
    setUserId("other-user");
    const event = createEvent({
      params: { id: "item-1" },
      request: new Request("http://localhost", {
        method: "PATCH",
        body: JSON.stringify({ name: "Stolen" }),
      }),
    });

    const response = await PATCH(event);

    expect(response.status).toBe(403);
  });

  it("returns 400 when no fields provided", async () => {
    setUserId(null);
    const event = createEvent({
      params: { id: "item-1" },
      request: new Request("http://localhost", {
        method: "PATCH",
        body: JSON.stringify({}),
      }),
    });

    const response = await PATCH(event);

    expect(response.status).toBe(400);
  });

  it("returns 404 for non-existent item", async () => {
    setUserId(null);
    const event = createEvent({
      params: { id: "nonexistent" },
      request: new Request("http://localhost", {
        method: "PATCH",
        body: JSON.stringify({ checked: true }),
      }),
    });

    const response = await PATCH(event);

    expect(response.status).toBe(404);
  });
});

describe("DELETE /api/item/:id", () => {
  it("returns 401 when unauthenticated", async () => {
    setUserId(null);
    const event = createEvent({
      params: { id: "item-1" },
      request: new Request("http://localhost", { method: "DELETE" }),
    });

    const response = await DELETE(event);

    expect(response.status).toBe(401);
  });

  it("deletes item when owner", async () => {
    setUserId("test-user-1");
    const event = createEvent({
      params: { id: "item-1" },
      request: new Request("http://localhost", { method: "DELETE" }),
    });

    const response = await DELETE(event);
    const body = (await response.json()) as { success: boolean };

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
  });

  it("returns 403 when non-owner tries to delete", async () => {
    setUserId("other-user");
    const event = createEvent({
      params: { id: "item-1" },
      request: new Request("http://localhost", { method: "DELETE" }),
    });

    const response = await DELETE(event);

    expect(response.status).toBe(403);
  });

  it("returns 404 for non-existent item", async () => {
    setUserId("test-user-1");
    const event = createEvent({
      params: { id: "nonexistent" },
      request: new Request("http://localhost", { method: "DELETE" }),
    });

    const response = await DELETE(event);

    expect(response.status).toBe(404);
  });
});
