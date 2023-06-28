import { RuralEventCategoryId } from "../../../packages/rural-event-categories/src/types/ruralEventCategory.types";
import { RuralEventClassification } from "../../../pages/api/classify/bytag/[tag]";
import { mapGoogleClassificationToRuralEventCategory } from "../mapping/mapGoogleClassificationToRuralEventCategory";
import { mapTagToGoogleClassification } from "../mapping/mapTagToGoogleClassification";
import { GoogleNaturalLanguageClassification } from "../mapping/mapTagToGoogleClassification.mapping";

export const classifyByTag = async (
  tag: string
): Promise<RuralEventClassification | null> => {
  // map tag to google classification by mapTagToGoogleClassification
  const googleClassification: GoogleNaturalLanguageClassification | null =
    await mapTagToGoogleClassification(tag);
  if (!googleClassification)
    throw new Error("No google classification found for tag: " + tag);

  console.log(googleClassification);
  // map google classification to rural event category by mapGoogleClassificationToRuralEventCategory
  const ruralEventCategory: RuralEventCategoryId | null =
    await mapGoogleClassificationToRuralEventCategory(googleClassification);
  if (!ruralEventCategory)
    throw new Error(
      "No rural event category found for google classification: " +
        googleClassification
    );

  const result: RuralEventClassification = {
    category: ruralEventCategory,
    tags: [tag],
    classifications: [googleClassification],
  };
  return result;
};
