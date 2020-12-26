import { search } from "./search";
import { IMDBTitleType } from "../types";

test.concurrent("Should handle invalid search terms", async () => {
  const result = await search(".");
  expect(result).toEqual([]);
});

test.concurrent("Should find Pulp Fiction", async () => {
  const result = await search("Pulp Fiction");
  const best = result.shift();
  expect(best).toBeDefined();
  expect(best?.id).toBe("tt0110912");
  expect(best?.type).toBe(IMDBTitleType.MOVIE);
});

test.concurrent("Should find The Expanse", async () => {
  const result = await search("The Expanse");
  const best = result.shift();
  expect(best).toBeDefined();
  expect(best?.id).toBe("tt3230854");
  expect(best?.type).toBe(IMDBTitleType.SERIES);
});
