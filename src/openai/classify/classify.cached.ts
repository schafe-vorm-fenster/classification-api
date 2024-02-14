import { ClassifyQuery } from "./classify.types";
import { RuralEventClassification } from "../../types/api.types";
import { twoLayerCache } from "../../cache/twoLayerCache";
import { classifyByOpenAi } from "./classify";

export const classifyByOpenAiCached = async (
  query: ClassifyQuery
): Promise<RuralEventClassification | null> => {
  if (process.env.DEACTIVATE_CACHE === "true") return classifyByOpenAi(query);
  return twoLayerCache(classifyByOpenAi, "classify", query);
};
