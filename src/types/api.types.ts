import { RuralEventCategoryId } from "../../packages/rural-event-categories/src/types/ruralEventCategory.types";
import { GoogleNaturalLanguageClassification } from "../classification/mapping/mapTagToGoogleClassification.mapping";
import { HttpErrorBody } from "../errors/error.types";

export interface RuralEventClassification {
  category: RuralEventCategoryId;
  tags: string[];
  classifications: GoogleNaturalLanguageClassification[];
}
export type ClassificationResponse =
  | RuralEventClassification
  | HttpErrorBody
  | null;
