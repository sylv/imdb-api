import { getTitle } from "./getTitle";
import { IMDBTitleType } from "../types";

const THE_EXPANSE_ID = "tt3230854";
const THE_EXPANSE_EPISODE_ID = "tt12355672";
const BRITAINS_BIGGEST_WARSHIP_ID = "tt8296466";

// IMDb is slow as fuck and jest times out tests sometimes without this
jest.setTimeout(30000);

test.concurrent("Should get The Expanse", async () => {
  const title = await getTitle(THE_EXPANSE_ID);
  expect(title).toBeDefined();
  expect(title?.id).toBe(THE_EXPANSE_ID);
  expect(title?.storyline).toBeDefined();
  expect(title?.description).toBeDefined();
  expect(title?.type).toBe(IMDBTitleType.SERIES);
  expect(title?.related[0]).toBeDefined();
});

test.concurrent("Should get an episode from The Expanse", async () => {
  const episode = await getTitle(THE_EXPANSE_EPISODE_ID);
  expect(episode).toBeDefined();
  expect(episode?.id).toBe(THE_EXPANSE_EPISODE_ID);
  expect(episode?.seasonNumber).toBe(5);
  expect(episode?.episodeNumber).toBe(4);
  expect(episode?.episodesTotal).toBeDefined();
  expect(episode?.name).toBe("Gaugamela");
});

test.concurrent("Should get Britains Biggest Warship", async () => {
  const title = await getTitle(BRITAINS_BIGGEST_WARSHIP_ID);
  expect(title).toBeDefined();
  expect(title?.id).toBe(BRITAINS_BIGGEST_WARSHIP_ID);
  expect(title?.genre.includes("Documentary")).toBe(true);
  expect(title?.released.getFullYear()).toBe(2018);
  expect(title?.type).toBe(IMDBTitleType.SERIES);
});
