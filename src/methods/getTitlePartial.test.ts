import { getTitlePartial } from "./getTitlePartial";

const THE_EXPANSE_ID = "tt3230854";

test.concurrent("Should get a partial The Expanse title", async () => {
  const partial = await getTitlePartial(THE_EXPANSE_ID);
  expect(partial).toBeDefined();
  expect(partial?.id).toBe(THE_EXPANSE_ID);
  expect(partial?.name).toBe("The Expanse");
});

test.concurrent("Should support getting full titles", async () => {
  const partial = await getTitlePartial(THE_EXPANSE_ID);
  const title = await partial!.getFullTitle();
  expect(title).toBeDefined();
  expect(title?.id).toBe(THE_EXPANSE_ID);
  expect(title?.name).toBe("The Expanse");
});
