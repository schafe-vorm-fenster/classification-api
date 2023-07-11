import { getLogger } from "../../../logging/log-util";
import { RuralEventCategoryId } from "../../../packages/rural-event-categories/src/types/ruralEventCategory.types";
import { RuralEventClassification } from "../../types/api.types";
import { getTag } from "../helpers/getTag";
import { mapGoogleClassificationToRuralEventCategory } from "../mapping/mapGoogleClassificationToRuralEventCategory";
import { mapTagToGoogleClassification } from "../mapping/mapTagToGoogleClassification";
import { GoogleNaturalLanguageClassification } from "../mapping/mapTagToGoogleClassification.mapping";

export const classifyByTag = async (
  tag: string
): Promise<RuralEventClassification | null> => {
  const log = getLogger("classifyByTag");

  // map tag to google classification by mapTagToGoogleClassification
  const googleClassification: GoogleNaturalLanguageClassification | null =
    await mapTagToGoogleClassification(tag);
  if (!googleClassification) {
    log.warn({ tag: tag }, "No google classification found for tag");
    return null;
  }

  // map google classification to rural event category by mapGoogleClassificationToRuralEventCategory
  const ruralEventCategory: RuralEventCategoryId | null =
    await mapGoogleClassificationToRuralEventCategory(googleClassification);
  if (!ruralEventCategory) {
    log.warn(
      { tag: tag, googleClassification: googleClassification },
      "No rural event category found for google classification"
    );
    return null;
  }

  const result: RuralEventClassification = {
    category: ruralEventCategory,
    tags: [getTag(tag) || tag],
    classifications: [googleClassification],
  };
  return result;
};
