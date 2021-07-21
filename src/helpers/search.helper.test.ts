import { TitleType } from "../enums/title-type.enum";
import { search } from "./search.helper";

it('should find "Top Gear"', async () => {
  const result = await search("top gear");
  const best = result.shift();
  expect(best).toBeDefined();
  expect(best?.id).toBe("tt1628033");
  expect(best?.name).toBe("Top Gear");
});

it('should find "Infinity War"', async () => {
  const result = await search("infinity war");
  const best = result.shift();
  expect(best).toBeDefined();
  expect(best?.id).toBe("tt4154756");
  expect(best?.name).toBe("Avengers: Infinity War");
});

it("should support filtering by type", async () => {
  // "limitless" is the name of a popular movie and a very unpopular tv show,
  // its the perfect test
  const result = await search("limitless", TitleType.SERIES);
  const best = result.shift();
  expect(best).toBeDefined();
  expect(best?.id).toBe("tt4422836");
});
