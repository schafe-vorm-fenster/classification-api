export const getTagListFromString = (tagQueryString: string): string[] => {
  if (!tagQueryString || tagQueryString.length <= 0) return [];
  const tagList: string[] = tagQueryString
    .split(",")
    .map((tag) => tag?.trim())
    .filter((tag) => tag?.length > 0);

  // filter for unique tags
  const uniqueTagList = tagList.filter(
    (tag, index) => tagList.indexOf(tag) === index
  );
  return uniqueTagList;
};
