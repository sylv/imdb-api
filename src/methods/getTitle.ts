import fetch from "node-fetch";
import { IMDBTitle, IMDBTitleData } from "../classes/IMDBTitle";
import { IMDBTitlePartial } from "../classes/IMDBTitlePartial";
import { IMDB_TITLE } from "../constants";
import { parseType } from "../helpers/parseType";
import { IMDBErrorCodes } from "../types";
import { xray } from "../xray";

interface IMDBRelatedItem {
  id: string;
  name: string;
  year: number;
  description: string;
  image: string;
}

export async function getTitle(id: string): Promise<IMDBTitle | null> {
  if (!id.startsWith("tt")) throw new Error(IMDBErrorCodes.INVALID_ID);
  const url = IMDB_TITLE(id);
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status >= 500) throw new Error(IMDBErrorCodes.SERVER_ERROR);
    return null;
  }

  const html = await response.text();
  const data = await xray(html, {
    json: 'script[type="application/ld+json"]',
    storyline: "#titleStoryLine div p span | trim",
    seasonsTotal: '.seasons-and-year-nav a[href*="episodes"] | number',
    seasonNumber: ".bp_heading:contains(Season) | number",
    episodesTotal: ".bp_sub_heading:contains(episodes), .bp_description .bp_heading:contains(All Episodes) .bp_secondary | number",
    episodeNumber: ".bp_heading:contains(Episode) | episode",
    parentId: ".titleParent a@href | id",
    parentName: ".titleParent a",
    related: xray(".rec_overview", [
      {
        id: "@data-tconst",
        name: "img@title",
        year: ".rec-title span | year",
        description: ".rec-outline | trim",
        image: "img@src",
      },
    ]),
  });

  const json: IMDBTitleData = JSON.parse(data.json);
  const type = parseType(json["@type"]);
  const formatted: IMDBTitleData = Object.assign<IMDBTitleData, Partial<IMDBTitleData>>(json, {
    id: id,
    storyline: data.storyline,
    seasonsTotal: data.seasonsTotal,
    seasonNumber: data.seasonNumber,
    episodesTotal: data.episodesTotal,
    episodeNumber: data.episodeNumber,
    parentId: data.parentId,
    parentName: data.parentName,
    related: data.related.map((item: IMDBRelatedItem) => {
      // it looks like IMDb will only suggest titles with a matching type, so we can
      // infer the type based on the parent title.
      return new IMDBTitlePartial(Object.assign(item, { type }));
    }),
  });

  return new IMDBTitle(formatted);
}
