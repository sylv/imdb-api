import fetch from "cross-fetch";
import { TitleType } from "../enums/title-type.enum";
import { SearchBody } from "../interfaces/search-body.interface";
import { SearchResult } from "../interfaces/search-result.interface";
import { formatSearchQuery } from "./format-search-query.helper";
import { parseType } from "./parse-type.helper";

export async function search(query: string, type?: TitleType): Promise<SearchResult[]> {
  const clean = formatSearchQuery(query, "_");
  if (!clean) return [];
  const firstChar = clean[0];
  const url = `https://v2.sg.media-imdb.com/suggestion/${firstChar}/${clean}.json`;
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status >= 500) throw new Error(response.statusText);
    return [];
  }

  const body: SearchBody = await response.json();
  if (!body.d) return [];
  const results = body.d
    .filter((result) => result.q)
    .map((result) => ({
      id: result.id,
      name: result.l,
      type: parseType(result.q),
      rank: result.rank,
      year: result.y,
      poster: result.i?.imageUrl,
      media: result.v?.map((media) => ({
        duration: media.s,
        id: media.id,
        name: media.l,
        image: media.i?.imageUrl,
      })),
    }));

  if (type !== undefined) return results.filter((result) => result.type === type);
  return results;
}
