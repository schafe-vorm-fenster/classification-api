import { twoLayerCached } from "../../cache/twoLayerCached";
import { extendByOpenAi } from "./extendByOpenAi";
import { OpenAiExtension, OpenAiQuery } from "./openAiExtension.types";

export const classifyByOpenAiCached = async (
  query: OpenAiQuery
): Promise<OpenAiExtension | null> => {
  if (process.env.DEACTIVATE_CACHE === "true") return extendByOpenAi(query);
  return twoLayerCached(extendByOpenAi, query, "openai");
};
