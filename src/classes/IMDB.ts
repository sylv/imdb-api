import { getTitle } from "../methods/getTitle";
import { getTitlePartial } from "../methods/getTitlePartial";
import { search } from "../methods/search";
import { IMDBTitleType } from "../types";

export class IMDB {
  /**
   * Get a partial title by ID.
   */
  getTitlePartialById(id: string) {
    return getTitlePartial(id);
  }

  /**
   * Get a partial title by name.
   * @param name The name of the title to search for.
   * @param type The type of the title - results that do not match this type are ignored.
   */
  async getPartialTitleByName(name: string, type?: IMDBTitleType) {
    const results = await search(name, type);
    const best = results.shift();
    return best;
  }

  /**
   * Get a title by ID.
   */
  getTitleById(id: string) {
    return getTitle(id);
  }

  /**
   * Get a title by name.
   * @param name The name of the title to search for.
   * @param type The type of the title - results that do not match this type are ignored.
   */
  async getTitleByName(name: string, type?: IMDBTitleType) {
    const partial = await this.getPartialTitleByName(name, type);
    if (!partial) return;
    return partial.getFullTitle();
  }

  /**
   * Search for a title by name.
   */
  async search(query: string) {
    return search(query);
  }
}
