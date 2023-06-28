import {
  categoryMappings,
  GoogleNaturalLanguageClassification,
} from "./mapTagToGoogleClassification.mapping";

export const mapTagToGoogleClassification = (
  tag: string
): GoogleNaturalLanguageClassification | null => {
  // lookup categoryMappings by given tag case insensitive
  const categoryMapping = categoryMappings.filter(
    (categoryMapping) =>
      categoryMapping.tags
        .map((tag) => tag.toLowerCase())
        .indexOf(tag.toLowerCase()) >= 0
  )[0];

  if (categoryMapping) {
    return categoryMapping.classification;
  } else {
    return null;
  }
};
