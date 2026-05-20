import { describe, expect, it } from "vitest";
import { parseInput, titleCase } from "./parse";

describe("parseInput", () => {
  it("splits comma-separated strings", () => {
    const result = parseInput("telur, susu, roti");
    expect(result).toEqual(["telur", "susu", "roti"]);
  });

  it("splits newline-separated strings", () => {
    const result = parseInput("telur\nsusu\nroti");
    expect(result).toEqual(["telur", "susu", "roti"]);
  });

  it("trims whitespace from each item", () => {
    const result = parseInput("  telur ,  susu  , roti ");
    expect(result).toEqual(["telur", "susu", "roti"]);
  });

  it("filters out empty strings", () => {
    const result = parseInput("telur,,susu, ,roti,");
    expect(result).toEqual(["telur", "susu", "roti"]);
  });

  it("returns empty array for empty input", () => {
    expect(parseInput("")).toEqual([]);
  });

  it("returns empty array for whitespace-only input", () => {
    expect(parseInput("   ")).toEqual([]);
  });

  it("returns empty array for commas-only input", () => {
    expect(parseInput(",,,")).toEqual([]);
  });

  it("handles mixed comma and newline separators", () => {
    const result = parseInput("telur,susu\nroti,madu");
    expect(result).toEqual(["telur", "susu", "roti", "madu"]);
  });

  it("returns single item array for single input", () => {
    expect(parseInput("telur")).toEqual(["telur"]);
  });
});

describe("titleCase", () => {
  it("title-cases a string", () => {
    expect(titleCase("hello world")).toBe("Hello World");
  });

  it("capitalizes first letter of each word", () => {
    expect(titleCase("daftar belanja")).toBe("Daftar Belanja");
  });

  it("returns empty string for empty input", () => {
    expect(titleCase("")).toBe("");
  });

  it("handles single word", () => {
    expect(titleCase("telur")).toBe("Telur");
  });

  it("handles already capitalized words", () => {
    expect(titleCase("HELLO WORLD")).toBe("Hello World");
  });
});
