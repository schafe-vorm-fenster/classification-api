import {
  categoryMappings,
  GoogleNaturalLanguageClassification,
} from "./mapTagToGoogleClassification.mapping";

export const mapTagToGoogleClassification = (
  tag: string
): GoogleNaturalLanguageClassification | null => {
  const categoryMapping = categoryMappings.filter(
    (categoryMapping) => categoryMapping.tags.indexOf(tag) >= 0
  )[0];

  if (categoryMapping) {
    return categoryMapping.classification;
  } else {
    return null;
  }
};
