export const IMDB_BASE = "https://www.imdb.com";
export const IMDB_TITLE = (id: string) => `${IMDB_BASE}/title/${id}`;
export const IMDB_TITLE_EPISODES = (id: string, season: number) => `${IMDB_TITLE(id)}/episodes?season=${season}`;
export const IMDB_NAME = (id: string) => `${IMDB_BASE}/name/${id}`;
export const IMDB_SEARCH = (char: string, query: string) => `https://v2.sg.media-imdb.com/suggestion/${char}/${query}.json`;
