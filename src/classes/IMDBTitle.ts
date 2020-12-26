import { AggregateRating, Person, Review, VideoObject } from "schema-dts";
import { parseDuration } from "../helpers/parseDuration";
import { IMDBTitleType } from "../types";
import { IMDBTitleBase } from "./IMDBTitleBase";
import { IMDBTitlePartial } from "./IMDBTitlePartial";

// export interface IMDBTitleData extends Omit<TVSeries, "@type"> {
export interface IMDBTitleData {
  "@type": string;
  id: string;
  url: string;
  name: string;
  image: string;
  genre: string[];
  contentRating: string;
  actor: Person[];
  creator: Person[];
  description: string;
  storyline?: string;
  datePublished: string;
  keywords?: string;
  aggregateRating: AggregateRating;
  review: Review;
  trailer: VideoObject;
  timeRequired?: string;
  related: IMDBTitlePartial[];
  seasonNumber?: number;
  episodeNumber?: number;
  episodesTotal?: number;
  seasonsTotal?: number;
  parentId?: string;
  parentName?: string;
}

export class IMDBTitle extends IMDBTitleBase {
  readonly genre: string[];
  readonly contentRating: string;
  readonly cast: Person[];
  readonly creators: Person[];
  readonly released: Date;
  readonly rating: AggregateRating;
  readonly review: Review;
  readonly storyline?: string;
  readonly trailer: VideoObject;
  readonly related: IMDBTitlePartial[];
  readonly duration?: number;
  readonly seasonNumber?: number;
  readonly episodeNumber?: number;
  readonly episodesTotal?: number;
  readonly seasonsTotal?: number;
  readonly parent?: IMDBTitlePartial;

  constructor(data: IMDBTitleData) {
    super({
      id: data.id,
      name: data.name,
      type: data["@type"],
      description: data.description,
      image: data.image,
      tags: data.keywords?.split(","),
    });

    this.seasonNumber = data.seasonNumber;
    this.episodeNumber = data.episodeNumber;
    this.episodesTotal = data.episodesTotal;
    this.seasonsTotal = data.seasonsTotal;
    this.storyline = data.storyline;
    this.genre = data.genre;
    this.contentRating = data.contentRating;
    this.cast = data.actor;
    this.creators = data.creator;
    this.released = new Date(data.datePublished);
    this.rating = data.aggregateRating;
    this.review = data.review;
    this.trailer = data.trailer;
    this.related = data.related;

    if (data.parentId && data.parentName) {
      this.parent = new IMDBTitlePartial({
        id: data.parentId,
        name: data.parentName,
        type: IMDBTitleType.SERIES,
      });
    }

    if (data.timeRequired !== undefined) this.duration = parseDuration(data.timeRequired);
    if (this.year === undefined && this.released) this.year = this.released.getFullYear();
  }
}
