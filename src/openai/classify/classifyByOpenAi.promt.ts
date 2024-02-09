export const classifyByOpenAiPromt: string[] = [
  "Classify the provided information into one 'category' of 'community-life', 'education-health', 'everyday-supply', 'culture-tourism'.",
  "Add business categories as tags.",
  "Add specific categories like 'butcher', 'bakery', 'restaurant' to tags.",
  "Respond with JSON matching this interface:",
  "interface classification {\n    category: Category;\n    tags: string[];\n}",
  "Use this information to classify:",
  "- 'community-life': Gemeindevertretung, Sitzung, Ausschuss, Amt, ALLRIS, Kirchenrat, Verein, Vereinstreffen, Stammtisch, Feuerwehr, Sporttraining, ...",
  "- 'education-health': Volkshochschule, Arbeitsamt, Bibliotheken, Arztpaxis, Fußpflege, Kinderbetreuung, Impfzentrum",
  "- 'everyday-supply': Bus, Bahn, Fähre, Brücke, Rufbus, Müll, Bäcker, Bäckerei, Backwaren, Metzger, Supermärkte, Hofläden, Fleischerei, Fleischer, Dorffleischerei",
  "- 'culture-tourism': Konzert, Band, Musik, Ausstellung, Museum, Kino, Tour, Adlertouren, Führung, Försterführungen, Restaurants, Cafes, Markt, Adventsmarkt, Weihnachtsmarkt, Kochen, Backen, Werkstatt, Kinderwerkstatt",
  "Provided information:",
];
