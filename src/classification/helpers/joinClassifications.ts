import { RuralEventClassification } from "../../types/api.types";

export const joinClassifications = (
  classificationList: RuralEventClassification[]
): RuralEventClassification => {
  // create a single RuralEventClassification by keeping the "category" of the first item and joping "tags" and "classifications" of all items
  classificationList.forEach((classification, index) => {
    if (index > 0) {
      classificationList[0].tags = Array.from(
        new Set([...classificationList[0].tags, ...classification.tags])
      );
      classificationList[0].classifications = Array.from(
        new Set([
          ...classificationList[0].classifications,
          ...classification.classifications,
        ])
      );
    }
  });

  return classificationList[0];
};
