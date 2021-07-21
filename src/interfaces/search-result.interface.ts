import { TitleType } from "../enums/title-type.enum";

export interface SearchResult {
  id: string;
  name: string;
  type: TitleType;
  rank: number;
  year: number;
  poster?: string;
  media?: {
    duration: string;
    id: string;
    name: string;
    image: string;
  }[];
}
