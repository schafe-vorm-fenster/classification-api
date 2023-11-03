import {
  OpenAiClassification,
  OpenAiQuery,
} from "./openAiClassification.types";
import { classifyByOpenAi } from "./classifyByOpenAi";
import { twoLayerCached } from "../../cache/twoLayerCached";

export const classifyByOpenAiCached = async (
  query: OpenAiQuery
): Promise<OpenAiClassification | null> => {
  if (process.env.DEACTIVATE_CACHE === "true") return classifyByOpenAi(query);
  return twoLayerCached(classifyByOpenAi, query, "openai");
};
