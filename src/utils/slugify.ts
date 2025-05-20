export function slugify(text: string): string {
  return text
    .replace(/\.pdf$/, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
