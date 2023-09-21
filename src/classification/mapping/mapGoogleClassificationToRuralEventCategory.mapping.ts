import { RuralEventCategoryId } from "../../../packages/rural-event-categories/src/types/ruralEventCategory.types";
import { RuralEventScope } from "../../../packages/rural-event-categories/src/types/ruralEventScopes";
import { GoogleNaturalLanguageClassification } from "./mapTagToGoogleClassification.mapping";

export interface ClassificationMapping {
  classification: GoogleNaturalLanguageClassification;
  category: RuralEventCategoryId;
  scope: RuralEventScope;
}

export const classificationMappings: ClassificationMapping[] = [
  {
    classification: "/Law & Government/Social Services",
    category: "everyday-supply",
    scope: "community",
  },
  {
    classification:
      "/Business & Industrial/Hospitality Industry/Event Planning",
    category: "culture-tourism",
    scope: "region",
  },
  {
    classification: "/Business & Industrial/Hospitality Industry/Food Service",
    category: "everyday-supply",
    scope: "community",
  },
  {
    classification: "/Travel/Bus & Rail",
    category: "everyday-supply",
    scope: "community",
  },
  {
    classification: "/Arts & Entertainment",
    category: "culture-tourism",
    scope: "region",
  },
  {
    classification: "/Business & Industrial",
    category: "everyday-supply",
    scope: "nearby",
  },
  {
    classification: "/Computers & Electronics",
    category: "everyday-supply",
    scope: "nearby",
  },
  { classification: "/Finance", category: "everyday-supply", scope: "nearby" },
  {
    classification: "/Food & Drink",
    category: "culture-tourism",
    scope: "region",
  },
  { classification: "/Health", category: "education-health", scope: "region" },
  {
    classification: "/Home & Garden",
    category: "community-life",
    scope: "nearby",
  },
  {
    classification: "/Internet & Telecom",
    category: "everyday-supply",
    scope: "nearby",
  },
  {
    classification: "/Jobs & Education",
    category: "education-health",
    scope: "region",
  },
  {
    classification: "/Law & Government",
    category: "community-life",
    scope: "municipality",
  },
  { classification: "/News", category: "community-life", scope: "nearby" },
  {
    classification: "/People & Society",
    category: "community-life",
    scope: "nearby",
  },
  {
    classification: "/Pets & Animals",
    category: "everyday-supply",
    scope: "nearby",
  },
  {
    classification: "/Real Estate",
    category: "community-life",
    scope: "nearby",
  },
  { classification: "/Reference", category: "community-life", scope: "nearby" },
  { classification: "/Science", category: "education-health", scope: "region" },
  {
    classification: "/Sensitive Subjects",
    category: "community-life",
    scope: "nearby",
  },
  { classification: "/Shopping", category: "everyday-supply", scope: "nearby" },
  { classification: "/Sports", category: "community-life", scope: "nearby" },
  { classification: "/Travel", category: "culture-tourism", scope: "region" },
];
