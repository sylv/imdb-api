import { getTitle } from "../methods/getTitle";
import { getTitlePartial } from "../methods/getTitlePartial";
import { search } from "../methods/search";

export class IMDB {
  /**
   * Get a partial title by ID.
   */
  getTitlePartialById(id: string) {
    return getTitlePartial(id);
  }

  /**
   * Get a partial title by name.
   * @param name
   */
  async getPartialTitleByName(name: string) {
    const results = await search(name);
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
   */
  async getTitleByName(name: string) {
    const partial = await this.getPartialTitleByName(name);
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
