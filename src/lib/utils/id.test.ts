import { describe, expect, it } from "vitest";
import { createItemId, createListId } from "./id";

describe("createItemId", () => {
  it("generates a 6-character string", () => {
    const id = createItemId();
    expect(id).toHaveLength(6);
  });

  it("generates unique IDs across multiple calls", () => {
    const ids = new Set(Array.from({ length: 100 }, () => createItemId()));
    expect(ids.size).toBe(100);
  });

  it("generates alphanumeric IDs", () => {
    const id = createItemId();
    expect(id).toMatch(/^[a-z0-9]+$/);
  });
});

describe("createListId", () => {
  it("generates an 8-character string", () => {
    const id = createListId();
    expect(id).toHaveLength(8);
  });

  it("generates unique IDs across multiple calls", () => {
    const ids = new Set(Array.from({ length: 100 }, () => createListId()));
    expect(ids.size).toBe(100);
  });

  it("generates alphanumeric IDs", () => {
    const id = createListId();
    expect(id).toMatch(/^[a-z0-9]+$/);
  });
});
