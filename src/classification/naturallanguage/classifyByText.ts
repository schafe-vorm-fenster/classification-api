import { RuralEventCategoryId } from "../../../packages/rural-event-categories/src/types/ruralEventCategory.types";
import { mapGoogleClassificationToRuralEventCategory } from "../mapping/mapGoogleClassificationToRuralEventCategory";
import { googleNaturalLanguageClassifyTextCached } from "./apiclient/googleNaturalLanguageClassifyTextCached";

export const classifyByText = async (
  text: string
): Promise<RuralEventCategoryId | null> => {
  const classification: any = await googleNaturalLanguageClassifyTextCached({
    content: text,
  });
  console.debug(classification);

  const category: RuralEventCategoryId | null =
    mapGoogleClassificationToRuralEventCategory(classification[0].name);

  console.debug(category);
  return category;
};
