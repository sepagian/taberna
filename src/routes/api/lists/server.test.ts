import { describe, expect, it } from "vitest";
import { createEvent, setupApiTest } from "$test/api-utils";
import { GET } from "./+server";

const { setUserId } = setupApiTest();

describe("GET /api/lists", () => {
  it("returns 401 when unauthenticated", async () => {
    setUserId(null);
    const event = createEvent();

    const response = await GET(event);

    expect(response.status).toBe(401);
    const body = await response.json();
    expect(body.error).toBe("unauthorized");
  });

  it("returns lists with stats for authenticated user", async () => {
    setUserId("test-user-1");
    const event = createEvent();

    const response = await GET(event);
    const body = (await response.json()) as { lists: unknown[] };

    expect(response.status).toBe(200);
    expect(body.lists).toHaveLength(2);
    const listWithItems = body.lists.find(
      (l: Record<string, unknown>) => l.name === "Belanja Mingguan",
    );
    expect(listWithItems).toBeDefined();
    expect((listWithItems as Record<string, unknown>).totalCount).toBe(3);
    expect((listWithItems as Record<string, unknown>).checkedCount).toBe(1);
  });

  it("returns empty list for user with no lists", async () => {
    setUserId("new-user");
    const event = createEvent();

    const response = await GET(event);
    const body = (await response.json()) as { lists: unknown[] };

    expect(response.status).toBe(200);
    expect(body.lists).toEqual([]);
  });
});
