import { categoryMappings } from "../mapping/mapTagToGoogleClassification.mapping";

export const getTag = (tag: string): string => {
  // lookup tag in categoryMappings, return tag in proper case
  const categoryMapping = categoryMappings.filter(
    (categoryMapping) =>
      categoryMapping.tags
        .map((tag) => tag.toLowerCase())
        .indexOf(tag.toLowerCase()) >= 0
  )[0];

  // find the matching tag and return this one
  if (categoryMapping) {
    return categoryMapping.tags.filter(
      (categoryTag) => categoryTag.toLowerCase() === tag.toLowerCase()
    )[0];
  }
  return tag;
};
