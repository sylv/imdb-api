# imdb-api

This is a library that scrapes IMDb for title data.

## usage

```bash
npm install @ryanke/imdb-api
```

```ts
import { IMDB } from "@ryanke/imdb-api";
const imdb = new IMDB();
console.time("get title");
const partial = await imdb.getPartialTitleByName("the expanse");
const full = await partial.getFullTitle();
console.timeEnd("get title");
console.log(partial, full);
```

## todo

- [ ] Caching ([keyv](https://www.npmjs.com/package/keyv)?)
- [ ] Support pulling from the [IMDb Interfaces](https://www.imdb.com/interfaces/) for partial titles and episode data.
- [ ] Support for getting title seasons and episodes (likely relies on interfaces)
- [ ] Support for people (bios, birth date, known for, etc)
- [ ] People should be an IMDBPeople object with utils like `person.link`
- [ ] [IMDBImage](./src/classes/IMDBImage.ts) should be replaced with strings with a [IMDB](./src/classes/IMDB) method for getting images in specific resolutions. (?)
- [ ] Get platforms where the given title can be streamed (?)
