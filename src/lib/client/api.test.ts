import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiError, api } from "./api";

describe("api", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("get", () => {
    it("returns JSON on success", async () => {
      const data = { lists: [] };
      vi.spyOn(global, "fetch").mockResolvedValue(
        new Response(JSON.stringify(data), { status: 200 }),
      );

      const result = await api.get("/api/lists");

      expect(result).toEqual(data);
      expect(fetch).toHaveBeenCalledWith("/api/lists");
    });

    it("throws ApiError on non-ok response", async () => {
      vi.spyOn(global, "fetch").mockResolvedValue(
        new Response(JSON.stringify({ error: "not found" }), { status: 404 }),
      );

      try {
        await api.get("/api/lists");
      } catch (err) {
        expect(err).toBeInstanceOf(ApiError);
        expect((err as ApiError).status).toBe(404);
        expect((err as ApiError).message).toBe("not found");
      }
    });

    it("throws ApiError with default message when body has no error", async () => {
      vi.spyOn(global, "fetch").mockResolvedValue(new Response("", { status: 500 }));

      try {
        await api.get("/api/lists");
      } catch (err) {
        expect(err).toBeInstanceOf(ApiError);
        expect((err as ApiError).status).toBe(500);
        expect((err as ApiError).message).toBe("Request failed with status 500");
      }
    });
  });

  describe("post", () => {
    it("sends JSON body and returns response", async () => {
      const responseData = { list: { id: "1", name: "Test" } };
      vi.spyOn(global, "fetch").mockResolvedValue(
        new Response(JSON.stringify(responseData), { status: 200 }),
      );

      const result = await api.post("/api/list", { name: "Test" });

      expect(result).toEqual(responseData);
      expect(fetch).toHaveBeenCalledWith("/api/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Test" }),
      });
    });

    it("throws ApiError on error response", async () => {
      vi.spyOn(global, "fetch").mockResolvedValue(
        new Response(JSON.stringify({ error: "bad request" }), { status: 400 }),
      );

      try {
        await api.post("/api/list", {});
      } catch (err) {
        expect(err).toBeInstanceOf(ApiError);
        expect((err as ApiError).status).toBe(400);
        expect((err as ApiError).message).toBe("bad request");
      }
    });
  });

  describe("patch", () => {
    it("sends PATCH request with JSON body", async () => {
      const responseData = { item: { checked: true } };
      vi.spyOn(global, "fetch").mockResolvedValue(
        new Response(JSON.stringify(responseData), { status: 200 }),
      );

      const result = await api.patch("/api/item/1", { checked: true });

      expect(result).toEqual(responseData);
      expect(fetch).toHaveBeenCalledWith("/api/item/1", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checked: true }),
      });
    });
  });

  describe("delete", () => {
    it("sends DELETE request and returns response", async () => {
      const responseData = { success: true };
      vi.spyOn(global, "fetch").mockResolvedValue(
        new Response(JSON.stringify(responseData), { status: 200 }),
      );

      const result = await api.delete("/api/list/1");

      expect(result).toEqual(responseData);
      expect(fetch).toHaveBeenCalledWith("/api/list/1", {
        method: "DELETE",
      });
    });
  });
});

describe("ApiError", () => {
  it("sets name to ApiError", () => {
    const error = new ApiError("test", 400);
    expect(error.name).toBe("ApiError");
    expect(error.status).toBe(400);
    expect(error.message).toBe("test");
    expect(error).toBeInstanceOf(Error);
  });
});
