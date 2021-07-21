export interface SearchBody {
  /** search results */
  d: SearchBodyResult[];
  /** query as perceived by the server */
  q: string;
  v: number;
}

export interface SearchBodyResult {
  /** cover image */
  i?: SearchBodyResultImage;
  id: string;
  /** name */
  l: string;
  /** type */
  q: string;
  rank: number;
  /** people involved */
  s: string;
  /** media */
  v?: SearchBodyResultMedia[];
  vt?: number;
  /** start year */
  y: number;
  /** year range */
  yr?: string;
}

export interface SearchBodyResultImage {
  imageUrl: string;
  height: number;
  width: number;
}

export interface SearchBodyResultMedia {
  /** thumbnail */
  i: SearchBodyResultImage;
  id: string;
  /** name */
  l: string;
  /** duration */
  s: string;
}
