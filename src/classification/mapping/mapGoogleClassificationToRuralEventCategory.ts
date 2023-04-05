import {
  GoogleNaturalLanguageL1,
  GoogleNaturalLanguageL2,
  GoogleNaturalLanguageL3,
} from "./googleNaturalLanguageCategories";
import { RuralEventCategoryId } from "../../../packages/rural-event-categories/src/types/ruralEventCategory.types";
import { GoogleNaturalLanguageClassification } from "./mapTagToGoogleClassification.mapping";
import { classificationMappings } from "./mapGoogleClassificationToRuralEventCategory.mapping";

export const mapGoogleClassificationToRuralEventCategory = (
  googleClassification: GoogleNaturalLanguageClassification
): RuralEventCategoryId | null => {
  const l1: GoogleNaturalLanguageL1 = ("/" +
    googleClassification.split("/")[1]) as GoogleNaturalLanguageL1;
  const l2: GoogleNaturalLanguageL2 = (l1 +
    "/" +
    googleClassification.split("/")[2]) as GoogleNaturalLanguageL2;
  const l3: GoogleNaturalLanguageL3 = (l1 +
    l2 +
    "/" +
    googleClassification.split("/")[3]) as GoogleNaturalLanguageL3;

  console.debug("level 1: ", l1);
  console.debug("level 2: ", l2);
  console.debug("level 3: ", l3);

  const exactMatch = classificationMappings.filter(
    (mapping) => mapping.classification === l3
  )[0];
  if (exactMatch) return exactMatch.category;

  const l2Match = classificationMappings.filter(
    (mapping) => mapping.classification === l2
  )[0];
  if (l2Match) return l2Match.category;

  const l1Match = classificationMappings.filter(
    (mapping) => mapping.classification === l1
  )[0];
  if (l1Match) return l1Match.category;

  return null;
};
