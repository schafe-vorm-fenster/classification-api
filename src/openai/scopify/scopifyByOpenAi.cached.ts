import {
  OpenAiQuery,
  OpenAiScopeification,
} from "./openAiScopeification.types";
import { scopifyByOpenAi } from "./scopifyByOpenAi";
import { twoLayerCached } from "../../cache/twoLayerCached";

export const scopifyByOpenAiCached = async (
  query: OpenAiQuery
): Promise<OpenAiScopeification | null> => {
  if (process.env.DEACTIVATE_CACHE === "true") return scopifyByOpenAi(query);
  return twoLayerCached(scopifyByOpenAi, query, "openai");
};
