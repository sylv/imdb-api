import { classToPlain, Expose } from "class-transformer";
import { IMDB_NAME, IMDB_TITLE } from "../constants";
import { IMDBErrorCodes } from "../types";

export class IMDBBase {
  readonly id: string;
  constructor(id: string) {
    this.id = id;
  }

  /**
   * Get a link to this resource.
   */
  @Expose()
  get link() {
    if (this.id.startsWith("tt")) return IMDB_TITLE(this.id);
    if (this.id.startsWith("nm")) return IMDB_NAME(this.id);
    throw new Error(IMDBErrorCodes.INVALID_ID);
  }

  /**
   * Convert this class to an object.
   */
  toJSON() {
    return classToPlain(this);
  }
}
