import { SEARCH_ALIASES } from "../aliases";

/**
 * Get the search query for a given search term. Handles things like aliases and stripping non-english characters.
 * @param input The search term
 * @param spaceChar The character to use as a space, for example "_"
 * @returns undefined if the input is not valid, for example all spaces.
 */
export function getSearchQuery(input: string, spaceChar?: string): string | undefined {
  const query = input
    .replace(/[^A-z0-9- ]/g, "")
    .split(/-| +/g)
    .join(" ")
    .toLowerCase()
    .trim();

  for (const alias of SEARCH_ALIASES) {
    const match = query.match(alias.pattern);
    if (match) return getSearchQuery(alias.title);
  }

  if (spaceChar !== undefined) {
    return query.trim().replace(/ +/g, spaceChar) || undefined;
  }

  return query.trim() || undefined;
}
