import { IMDBTitleType, IMDBErrorCodes } from "../types";

export const TYPE_MAP = new Map<string, IMDBTitleType>([
  ["feature", IMDBTitleType.MOVIE],
  ["movie", IMDBTitleType.MOVIE],
  ["tvmovie", IMDBTitleType.MOVIE],
  ["tv series", IMDBTitleType.SERIES],
  ["tvspecial", IMDBTitleType.SPECIAL],
  ["tvseries", IMDBTitleType.SERIES],
  ["tvminiseries", IMDBTitleType.SERIES],
  ["tv mini-series", IMDBTitleType.SERIES],
  ["tv short", IMDBTitleType.SHORT],
  ["tvshort", IMDBTitleType.SHORT],
  ["short", IMDBTitleType.SHORT],
  ["tvepisode", IMDBTitleType.EPISODE],
  ["video game", IMDBTitleType.GAME],
  ["videogame", IMDBTitleType.GAME],
  ["video", IMDBTitleType.VIDEO],
]);

export function parseType(input: string) {
  const query = input.toLowerCase().trim();
  const type = TYPE_MAP.get(query);
  if (type === undefined) throw new Error(`${IMDBErrorCodes.UNKNOWN_TYPE}: ${query}`);
  return type;
}
