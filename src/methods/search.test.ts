import { search } from "./search";
import { IMDBTitleType } from "../types";
import crypto from "crypto";

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

// limitless has a movie and a lesser known tv show, making it pretty much the perfect test for this.
test.concurrent("Should find the Limitless TV Show with a type filter", async () => {
  const result = await search("Limitless", IMDBTitleType.SERIES);
  const best = result.shift();
  expect(best).toBeDefined();
  expect(best?.id).toBe("tt4422836");
  expect(best?.type).toBe(IMDBTitleType.SERIES);
});

test.concurrent("Should return an empty array when there are no search results", async () => {
  const query = crypto.randomBytes(16).toString("hex");
  const result = await search(query);
  expect(result).toEqual([]);
});
