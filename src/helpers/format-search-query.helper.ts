export const SEARCH_ALIASES = [
  {
    pattern: /avatar \(?tlok\)?/i,
    title: "The Legend of Korra",
  },
  {
    pattern: /avatar -? ?the last airbender( movie)?/i,
    title: "The Last Airbender",
  },
];

/**
 * Get the search query for a given search term. Handles things like aliases and stripping non-english characters.
 * @param input The search term
 * @param spaceChar The character to use as a space, for example "_"
 * @returns undefined if the input is not valid, for example all spaces.
 */
export function formatSearchQuery(input: string, spaceChar = " "): string | undefined {
  const query = input
    .replace(/[^A-z0-9- ]/g, "")
    .split(/-| +/g)
    .join(" ")
    .toLowerCase()
    .trim();

  for (const alias of SEARCH_ALIASES) {
    const match = query.match(alias.pattern);
    if (match) return formatSearchQuery(alias.title, spaceChar);
  }

  return query.trim().replace(/ +/g, spaceChar) || undefined;
}
