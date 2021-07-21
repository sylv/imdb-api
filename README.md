# imdb-api

A library for searching for ~~and scraping~~ media data.

```ts
import { search, TitleType } from "@ryanke/imdb-api";

const results = await search("infinity war");
const results = await search("top gear", TitleType.SERIES);
console.log(results.shift());
```

## todo

- [ ] Support pulling extra data from the [IMDb Datasets](https://www.imdb.com/interfaces/)
- [ ] Support for people (bios, birth date, known for, etc)
- [ ] Get platforms where the given title can be streamed (?)
