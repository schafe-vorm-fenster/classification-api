import { getLogger } from "../../../logging/log-util";
import { RuralEventCategoryId } from "../../../packages/rural-event-categories/src/types/ruralEventCategory.types";
import { RuralEventClassification } from "../../types/api.types";
import { mapGoogleClassificationToRuralEventCategory } from "../mapping/mapGoogleClassificationToRuralEventCategory";
import {
  GoogleNaturalLanguageClassificationCategory,
  GoogleNaturalLanguageClassifyTextResponse,
} from "./apiclient/googleNaturalLanguageClassifyText";
import { googleNaturalLanguageClassifyTextCached } from "./apiclient/googleNaturalLanguageClassifyTextCached";

export const minClassifyTextLength: number = 150;

export const classifyByText = async (
  text: string
): Promise<RuralEventClassification | null> => {
  const log = getLogger("classifyByText");

  if (!text) {
    log.error("text is missing, but required");
    return null;
  }

  if (text.length <= minClassifyTextLength) {
    log.warn({ text: text }, "text is too short to classify");
    return null;
  }

  const googleClassification: GoogleNaturalLanguageClassifyTextResponse =
    await googleNaturalLanguageClassifyTextCached({
      content: text,
    });

  if (!googleClassification || !googleClassification[0]) {
    log.info({ text: text }, "no classification found");
    return null;
  }

  const bestMatchingClassification: GoogleNaturalLanguageClassificationCategory =
    googleClassification[0];

  const category: RuralEventCategoryId | null =
    mapGoogleClassificationToRuralEventCategory(
      bestMatchingClassification.name
    );

  const classification: RuralEventClassification = {
    category: category as RuralEventCategoryId,
    tags: [],
    classifications: [bestMatchingClassification.name],
  };

  return classification;
};
