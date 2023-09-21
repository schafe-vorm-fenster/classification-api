import { RuralEventCategoryId } from "../../packages/rural-event-categories/src/types/ruralEventCategory.types";
import { RuralEventScope } from "../../packages/rural-event-categories/src/types/ruralEventScopes";
import { HttpErrorBody } from "../errors/error.types";

export interface RuralEventClassification {
  category: RuralEventCategoryId;
  tags: string[];
  scope: RuralEventScope;
}

export type ClassificationResponse =
  | RuralEventClassification
  | HttpErrorBody
  | null;
