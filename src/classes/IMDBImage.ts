import { Exclude } from "class-transformer";

export const IMDB_IMAGE_REGEX = /(?<=V1_).*?(?=\.)/;

export class IMDBImage {
  @Exclude()
  readonly nopicture: boolean;
  readonly url: string;
  readonly width?: number;
  readonly height?: number;

  constructor(url: string, width?: number, height?: number) {
    this.url = url.replace(IMDB_IMAGE_REGEX, "");
    this.width = width;
    this.height = height;
    this.nopicture = url.includes("nopicture");
  }

  /**
   * Get the image, optionally with the given resolution.
   * @param width The width in px of the image
   * @param height The height in px of the image
   * @param cap Whether to cap the height and width given to the max resolution of the image. Without resolution capping the image might have white borders or other artifacts.
   */
  get(width?: number, height?: number, cap = true): string {
    if (this.nopicture) return this.url;
    if (width !== undefined && height !== undefined) {
      if (cap && this.width !== undefined && this.width < width) width = this.width;
      if (cap && this.height !== undefined && this.height < height) height = this.height;
      return this.url.replace(IMDB_IMAGE_REGEX, `UX${width}_CR0,0,${width},${height}_AL_`);
    }

    return this.url;
  }

  toString() {
    return this.url;
  }
}
