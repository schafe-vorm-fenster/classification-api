import { TagQuery, TagResponse } from "./tag.types";
import { twoLayerCache } from "../../cache/twoLayerCache";
import { tagByOpenAi } from "./tag";

export const tagByOpenAiCached = async (
  query: TagQuery
): Promise<TagResponse | null> => {
  if (process.env.DEACTIVATE_CACHE === "true") return tagByOpenAi(query);
  return twoLayerCache(tagByOpenAi, "classify", query);
};
