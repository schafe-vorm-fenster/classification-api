import { Prompt } from "./types/prompt.types";
import { Type } from "@google/genai";

export const classifyPrompt: Prompt = {
  prompt:
    "Classify the provided information into one 'category' of 'community-life', 'education-health', 'everyday-supply', 'culture-tourism'. Add tags in German language.",
  responseFormat: "json",
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      category: {
        type: Type.STRING,
        enum: [
          "community-life",
          "education-health",
          "everyday-supply",
          "culture-tourism",
          "unknown",
        ],
        description: "Classify the provided information into one 'category'.",
        nullable: false,
      },
      tags: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
          description:
            "Add tags: Use a business category or other categorizing tags. Use German language.",
          nullable: false,
        },
        description: "Add at least one tag and up to five tags.",
        nullable: false,
      },
    },
  },
  instructions: [
    "Beispiele:",
    "- 'community-life': Gemeindevertretung, Sitzung, Ausschuss, Amt, ALLRIS, Kirchenrat, Verein, Vereinstreffen, Stammtisch, Feuerwehr, Sporttraining, ...",
    "- 'education-health': Volkshochschule, Arbeitsamt, Bibliotheken, Arztpaxis, Fußpflege, Kinderbetreuung, Impfzentrum",
    "- 'everyday-supply': Bus, Bahn, Fähre, Brücke, Rufbus, Müll, Bäcker, Bäckerei, Backwaren, Metzger, Supermärkte, Hofläden, Fleischerei, Fleischer, Dorffleischerei",
    "- 'culture-tourism': Konzert, Band, Musik, Ausstellung, Museum, Kino, Tour, Adlertouren, Führung, Försterführungen, Restaurants, Cafes, Markt, Adventsmarkt, Weihnachtsmarkt, Kochen, Backen, Werkstatt, Kinderwerkstatt",
    "Add tags: Use a business category or other categorizing tags like 'sport', 'butcher', 'bakery', 'restaurant', 'church' ...",
    "Use correct German language and spelling for tags.",
  ],
};
