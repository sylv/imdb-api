import { parseType } from "./parseType";
import { IMDBTitleType } from "../types";

test("Parse types", () => {
  expect(parseType("feature")).toBe(IMDBTitleType.MOVIE);
  expect(parseType("Movie")).toBe(IMDBTitleType.MOVIE);
  expect(parseType("TV series")).toBe(IMDBTitleType.SERIES);
});
