import { getTitle } from "../methods/getTitle";
import { IMDBErrorCodes } from "../types";
import { IMDBTitleBase } from "./IMDBTitleBase";

export class IMDBTitlePartial extends IMDBTitleBase {
  /**
   * Get the complete title data.
   */
  async getFullTitle() {
    const title = await getTitle(this.id);
    if (!title) throw new Error(IMDBErrorCodes.NOT_FOUND);
    return title;
  }
}
