import { IMDBImage } from "./IMDBImage";
import { IMDBTitleType } from "../types";
import { parseType } from "../helpers/parseType";
import { IMDBBase } from "./IMDBBase";

export interface IMDBTitleBaseData {
  id: string;
  name: string;
  type: string | number;
  description?: string;
  year?: number;
  image?: string | IMDBImage;
  media?: IMDBTitleBaseDataMedia[];
  rank?: number;
  tags?: string[];
}

export interface IMDBTitleBaseDataMedia {
  id: string;
  name: string;
  duration: string;
  image?: IMDBImage;
}

export class IMDBTitleBase extends IMDBBase {
  name: string;
  type: IMDBTitleType;
  description?: string;
  year?: number;
  rank?: number;
  tags?: string[];
  media?: IMDBTitleBaseDataMedia[];
  image?: IMDBImage;

  constructor(data: IMDBTitleBaseData) {
    super(data.id);
    this.name = data.name;
    this.type = typeof data.type === "number" ? data.type : parseType(data.type);
    this.description = data.description;
    this.year = data.year;
    this.rank = data.rank;
    this.tags = data.tags;
    this.media = data.media;
    if (data.image) {
      if (data.image instanceof IMDBImage) this.image = data.image;
      else this.image = new IMDBImage(data.image);
    }
  }
}
