import { getLogger } from "../../../logging/log-util";
import {
  categoryMappings,
  GoogleNaturalLanguageClassification,
} from "./mapTagToGoogleClassification.mapping";

export const mapTagToGoogleClassification = (
  tag: string
): GoogleNaturalLanguageClassification | null => {
  const log = getLogger("api.classify.mapTagToGoogleClassification");

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
    log.warn({ tag: tag }, "No category mapping found for tag.");
    return null;
  }
};
