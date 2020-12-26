import { search } from "./search";
import { IMDBErrorCodes } from "../types";
import { IMDBTitlePartial } from "../classes/IMDBTitlePartial";

export async function getTitlePartial(id: string): Promise<IMDBTitlePartial | null> {
  if (!id.startsWith("tt")) throw new Error(IMDBErrorCodes.INVALID_ID);
  const result = await search(id);
  const title = result.find((item) => item.id === id);
  if (!title) return null;
  return title;
}
