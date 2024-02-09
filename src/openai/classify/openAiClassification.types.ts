import { RuralEventCategoryId } from "../../../packages/rural-event-categories/src/types/ruralEventCategory.types";

export type OpenAiCategory = RuralEventCategoryId;

export interface OpenAiClassification {
  category: OpenAiCategory;
  tags: string[];
}

export type OpenAiQuery = object;
