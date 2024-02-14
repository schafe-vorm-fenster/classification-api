import { OpenAiPromt } from "../openai.types";

export const classifyPromt: OpenAiPromt[] = [
  {
    role: "system",
    content: `Respond in JSON matching this typescript interface:
      interface classification {
        category: 'community-life' | 'education-health' | 'everyday-supply' | 'culture-tourism'; 
        tags: string[]; 
      }`,
  },
  {
    role: "system",
    content: `
    Use only valid categories.
    Fix spelling for tags. Translate tags to English.
    Format tags in: camel case, first letter uppercase, without spaces.
    `,
  },
  {
    role: "system",
    content: `Use this information to classify:
      - 'community-life': Gemeindevertretung, Sitzung, Ausschuss, Amt, ALLRIS, Kirchenrat, Verein, Vereinstreffen, Stammtisch, Feuerwehr, Sport, Training, ...
      - 'education-health': Volkshochschule, Arbeitsamt, Bibliotheken, Arztpaxis, Fußpflege, Kinderbetreuung, Impfzentrum, ...
      - 'everyday-supply': Verkehr, Einkaufen, Bus, Bahn, Fähre, Brücke, Rufbus, Müll, Bäcker, Bäckerei, Backwaren, Metzger, Supermarkt, Hofladen, Fleischerei, Fleischer, Dorffleischerei, Fischwagen, ...
      - 'culture-tourism': Konzert, Band, Musik, Ausstellung, Museum, Kino, Tour, Naturführung, Försterführungen, Restaurant, Café, Brunch, Markt, Adventsmarkt, Kochen, Backen, Werkstatt, Kinderwerkstatt, ...`,
  },
  {
    role: "user",
    content: "Please classify the following content:",
  },
];
