import fetch from "node-fetch";
import { IMDBImage } from "../classes/IMDBImage";
import { IMDBTitlePartial } from "../classes/IMDBTitlePartial";
import { IMDB_SEARCH } from "../constants";
import { IMDBErrorCodes } from "../types";
import { IMDBSearchResultBody } from "../types/IMDBSearchResultBody";

/**
 * Search IMDb for the given query.
 */
export async function search(query: string): Promise<IMDBTitlePartial[]> {
  const clean = query
    .replace(/[^A-z0-9 ]+/, "")
    .trim()
    .toLowerCase();

  if (!clean) return [];
  const firstChar = clean[0];
  const url = IMDB_SEARCH(firstChar, clean);
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status >= 500) throw new Error(IMDBErrorCodes.SERVER_ERROR);
    return [];
  }

  const body: IMDBSearchResultBody = await response.json();
  return body.d
    .filter((result) => result.q)
    .map((result) => {
      return new IMDBTitlePartial({
        id: result.id,
        name: result.l,
        type: result.q,
        rank: result.rank,
        year: result.y,
        image: result.i ? new IMDBImage(result.i?.imageUrl, result.i?.width, result.i?.height) : undefined,
        media: result.v?.map((media) => ({
          duration: media.s,
          id: media.id,
          name: media.l,
          image: media.i ? new IMDBImage(media.i?.imageUrl, media.i?.width, media.i?.height) : undefined,
        })),
      });
    });
}
