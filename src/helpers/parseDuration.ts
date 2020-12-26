import { parse, toSeconds } from "iso8601-duration";

export function parseDuration(input: string) {
  return toSeconds(parse(input)) * 1000;
}
