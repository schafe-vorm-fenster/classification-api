import { RuralEventCategoryId } from "../../packages/rural-event-categories/src/types/ruralEventCategory.types";

export type OpenAiCategory = RuralEventCategoryId;

export type OpenAiScope =
  | "tight-nearby"
  | "wider-region"
  | "specific-location"
  | "formal-municipality";

export interface OpenAiClassification {
  category: OpenAiCategory;
  relevance: OpenAiScope;
}
