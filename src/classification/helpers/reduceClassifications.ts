import { RuralEventClassification } from "../../types/api.types";
import { groupClassifications } from "./groupClassifications";
import { joinClassifications } from "./joinClassifications";
import { sortClassifications } from "./sortClassifications";

export const reduceClassifications = (
  classificationList: RuralEventClassification[]
): RuralEventClassification => {
  classificationList = sortClassifications(classificationList);
  classificationList = groupClassifications(classificationList);
  const classification: RuralEventClassification =
    joinClassifications(classificationList);
  return classification;
};
