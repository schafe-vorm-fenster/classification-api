import { RuralEventCategoryId } from "../../../packages/rural-event-categories/src/types/ruralEventCategory.types";
import { GoogleNaturalLanguageClassification } from "./mapTagToGoogleClassification.mapping";

export interface ClassificationMapping {
  classification: GoogleNaturalLanguageClassification;
  category: RuralEventCategoryId;
}

export const classificationMappings: ClassificationMapping[] = [
  {
    classification: "/Law & Government/Social Services",
    category: "everyday-supply",
  },
  { classification: "/Travel/Bus & Rail", category: "everyday-supply" },
  { classification: "/Arts & Entertainment", category: "culture-tourism" },
  { classification: "/Business & Industrial", category: "everyday-supply" },
  { classification: "/Computers & Electronics", category: "everyday-supply" },
  { classification: "/Finance", category: "everyday-supply" },
  { classification: "/Food & Drink", category: "culture-tourism" },
  { classification: "/Health", category: "education-health" },
  { classification: "/Home & Garden", category: "community-life" },
  { classification: "/Internet & Telecom", category: "everyday-supply" },
  { classification: "/Jobs & Education", category: "education-health" },
  { classification: "/Law & Government", category: "community-life" },
  { classification: "/News", category: "community-life" },
  { classification: "/People & Society", category: "community-life" },
  { classification: "/Pets & Animals", category: "everyday-supply" },
  { classification: "/Real Estate", category: "community-life" },
  { classification: "/Reference", category: "community-life" },
  { classification: "/Science", category: "education-health" },
  { classification: "/Sensitive Subjects", category: "community-life" },
  { classification: "/Shopping", category: "everyday-supply" },
  { classification: "/Sports", category: "community-life" },
  { classification: "/Travel", category: "culture-tourism" },
];
