import { RuralEventClassification } from "../../types/api.types";

export const groupClassifications = (
  classificationList: RuralEventClassification[]
): RuralEventClassification[] => {
  // combine items in classificationList which have the same "category" to one item and join "tags" and join "classification"
  const groupedClassifications = classificationList.reduce(
    (acc, classification) => {
      const existingClassification = acc.find(
        (item) => item.category === classification.category
      );
      if (existingClassification) {
        // join tags but with unique entries
        existingClassification.tags = Array.from(
          new Set([...existingClassification.tags, ...classification.tags])
        );
        // join classifications but with unique entries
        existingClassification.classifications = Array.from(
          new Set([
            ...existingClassification.classifications,
            ...classification.classifications,
          ])
        );
      } else {
        acc.push(classification);
      }
      return acc;
    },
    [] as RuralEventClassification[]
  );

  return groupedClassifications;
};
