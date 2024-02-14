import {
  OpenAiQuery,
  OpenAiScopeification,
} from "./openAiScopeification.types";
import { scopifyByOpenAi } from "./scopifyByOpenAi";
import { twoLayerCache } from "../../cache/twoLayerCache";

export const scopifyByOpenAiCached = async (
  query: OpenAiQuery
): Promise<OpenAiScopeification | null> => {
  if (process.env.DEACTIVATE_CACHE === "true") return scopifyByOpenAi(query);
  return twoLayerCache(scopifyByOpenAi, "scopify", query);
};
