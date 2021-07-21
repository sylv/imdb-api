import { TitleType } from "../enums/title-type.enum";

const STRIP_REGEX = /[^A-z]+/g;
const TYPE_MAP = new Map<string, TitleType>([
  ["feature", TitleType.MOVIE],
  ["movie", TitleType.MOVIE],
  ["tvmovie", TitleType.MOVIE],
  ["tvspecial", TitleType.SPECIAL],
  ["tvseries", TitleType.SERIES],
  ["tvminiseries", TitleType.SERIES],
  ["series", TitleType.SERIES],
  ["tvshort", TitleType.SHORT],
  ["short", TitleType.SHORT],
  ["tvepisode", TitleType.EPISODE],
  ["episode", TitleType.EPISODE],
  ["videogame", TitleType.GAME],
  ["video", TitleType.VIDEO],
]);

export function parseType(input: string): TitleType {
  const query = input.toLowerCase().replace(STRIP_REGEX, "").trim();
  const type = TYPE_MAP.get(query);
  if (type === undefined) throw new Error(`Could not parse type "${query}"`);
  return type;
}
