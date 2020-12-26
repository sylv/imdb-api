import XRay from "x-ray";

export const ID_REGEX = /(tt|nm)[0-9]{4,14}/;
export const YEAR_REGEX = /([0-9]{4})(?:-([0-9]{4}))?/;
export const NUMBER_REGEX = /[0-9]+/;

export const xray = XRay({
  filters: {
    id: (data: string) => ID_REGEX.exec(data)?.[0],
    trim: (data: string) => data.trim(),
    number: (data: string) => {
      const match = NUMBER_REGEX.exec(data);
      if (match) return Number(match[0]);
    },
    episode: (data: string) => {
      const match = NUMBER_REGEX.exec(data.split("|")[1]);
      if (match) return Number(match[0]);
    },
    year: (data: string) => {
      const match = data.match(YEAR_REGEX);
      return match ? Number(match[1]) : undefined;
    },
  },
});
