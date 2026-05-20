const newLocal = /[,\n]/;

export function parseInput(input: string): string[] {
  return input
    .split(newLocal)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function titleCase(str: string): string {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}
