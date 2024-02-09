import { RuralEventCategoryId } from "../../packages/rural-event-categories/src/types/ruralEventCategory.types";
import { HttpErrorBody } from "../errors/error.types";

export interface RuralEventClassification {
  category: RuralEventCategoryId;
  tags: string[];
}

export type ClassificationResponse =
  | RuralEventClassification
  | HttpErrorBody
  | null;
