import { RuralEventClassification } from "../../types/api.types";

export const sortClassifications = (
  classificationList: RuralEventClassification[]
): RuralEventClassification[] => {
  if (!classificationList || classificationList.length <= 0) return [];

  // filter for items != null
  classificationList = classificationList.filter(
    (classification) => classification !== null
  );

  // count the number of occurrences of each category
  const categoryCount: Record<string, number> = {};
  classificationList.forEach((classification) => {
    if (classification?.category) {
      categoryCount[classification.category] =
        (categoryCount[classification.category] || 0) + 1;
    }
  });
  // sort the categories by number of occurrences
  const sortedCategories = Object.keys(categoryCount).sort(
    (a, b) => categoryCount[b] - categoryCount[a]
  );

  // retrun sorted classificationList
  return classificationList.sort((a, b) => {
    const aCategory = a.category;
    const bCategory = b.category;
    const aCategoryIndex = sortedCategories.indexOf(aCategory);
    const bCategoryIndex = sortedCategories.indexOf(bCategory);
    if (aCategoryIndex < bCategoryIndex) return -1;
    if (aCategoryIndex > bCategoryIndex) return 1;
    return 0;
  });
};
