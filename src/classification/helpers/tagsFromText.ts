import { prefixedStringsFromText } from "./prefixedStringsFromText";

export const tagsFromText = (text: string): string[] | null => {
  return prefixedStringsFromText(text, "#");
};
