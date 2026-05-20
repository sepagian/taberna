import { describe, expect, it } from "vitest";
import { serializeItem, serializeList, serializeListWithStats } from "./serializers";

describe("serializeList", () => {
  it("converts a DB list row to a List object", () => {
    const row = {
      id: "abc12345",
      name: "Belanja",
      createdAt: 1_700_000_000_000,
      updatedAt: 1_700_000_001_000,
      userId: "user-1",
    };
    expect(serializeList(row)).toEqual({
      id: "abc12345",
      name: "Belanja",
      createdAt: 1_700_000_000_000,
      updatedAt: 1_700_000_001_000,
      userId: "user-1",
    });
  });

  it("handles null userId", () => {
    const row = {
      id: "abc12345",
      name: "Belanja",
      createdAt: 1_700_000_000_000,
      updatedAt: 1_700_000_001_000,
      userId: null,
    };
    expect(serializeList(row)).toEqual({
      id: "abc12345",
      name: "Belanja",
      createdAt: 1_700_000_000_000,
      updatedAt: 1_700_000_001_000,
      userId: null,
    });
  });

  it("converts createdAt and updatedAt to numbers", () => {
    const row = {
      id: "x",
      name: "x",
      createdAt: "1700000000000",
      updatedAt: "1700000001000",
      userId: null,
    };
    const result = serializeList(row);
    expect(typeof result.createdAt).toBe("number");
    expect(typeof result.updatedAt).toBe("number");
  });
});

describe("serializeItem", () => {
  it("converts a DB item row to an Item object", () => {
    const row = {
      id: "abc123",
      listId: "list-1",
      name: "Telur",
      checked: 1,
      createdAt: 1_700_000_000_000,
      updatedAt: 1_700_000_001_000,
    };
    expect(serializeItem(row)).toEqual({
      id: "abc123",
      listId: "list-1",
      name: "Telur",
      checked: true,
      createdAt: 1_700_000_000_000,
      updatedAt: 1_700_000_001_000,
    });
  });

  it("converts checked=0 to false", () => {
    const row = {
      id: "abc123",
      listId: "list-1",
      name: "Telur",
      checked: 0,
      createdAt: 1_700_000_000_000,
      updatedAt: 1_700_000_001_000,
    };
    expect(serializeItem(row).checked).toBe(false);
  });

  it("converts checked=null to false", () => {
    const row = {
      id: "abc123",
      listId: "list-1",
      name: "Telur",
      checked: null,
      createdAt: 1_700_000_000_000,
      updatedAt: 1_700_000_001_000,
    };
    expect(serializeItem(row).checked).toBe(false);
  });
});

describe("serializeListWithStats", () => {
  it("includes totalCount and checkedCount", () => {
    const row = {
      id: "abc12345",
      name: "Belanja",
      createdAt: 1_700_000_000_000,
      updatedAt: 1_700_000_001_000,
      userId: "user-1",
      totalCount: 5,
      checkedCount: 3,
    };
    expect(serializeListWithStats(row)).toEqual({
      id: "abc12345",
      name: "Belanja",
      createdAt: 1_700_000_000_000,
      updatedAt: 1_700_000_001_000,
      userId: "user-1",
      totalCount: 5,
      checkedCount: 3,
    });
  });
});
