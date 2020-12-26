export interface IMDBSearchResultBody {
  d: IMDBSearchResultBodyTitle[];
  q: string;
  v: number;
}

export interface IMDBSearchResultBodyTitle {
  i?: IMDBSearchResultBodyImage;
  id: string;
  l: string;
  q: string;
  rank: number;
  s: string;
  v?: IMDBSearchResultBodyMedia[];
  vt?: number;
  y: number;
  yr?: string;
}

export interface IMDBSearchResultBodyImage {
  imageUrl: string;
  height: number;
  width: number;
}

export interface IMDBSearchResultBodyMedia {
  i: IMDBSearchResultBodyImage;
  id: string;
  l: string;
  s: string;
}
