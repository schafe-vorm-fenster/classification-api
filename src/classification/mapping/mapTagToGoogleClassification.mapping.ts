import {
  GoogleNaturalLanguageL1,
  GoogleNaturalLanguageL2,
  GoogleNaturalLanguageL3,
} from "./googleNaturalLanguageCategories";

export type GoogleNaturalLanguageClassification =
  | GoogleNaturalLanguageL1
  | GoogleNaturalLanguageL2
  | GoogleNaturalLanguageL3;
interface categoryMapping {
  tags: string[];
  section: GoogleNaturalLanguageL1;
  classification: GoogleNaturalLanguageClassification;
}

export const categoryMappings: categoryMapping[] = [
  {
    tags: ["Kirche", "Religion", "Gottesdienst"],
    section: "/People & Society",
    classification: "/People & Society/Religion & Belief",
  },
  {
    tags: [
      "Bildung",
      "Schule",
      "Schulung",
      "Schulungen",
      "Vortrag",
      "Vorträge",
    ],
    section: "/Jobs & Education",
    classification: "/Jobs & Education/Education",
  },
  {
    tags: [
      "Bäcker",
      "Bäckerei",
      "Bäckerauto",
      "Backwaren",
      "Fleischer",
      "Fleischerei",
      "Fisch",
      "Fischauto",
      "Nahrungsmittel",
    ],
    section: "/Food & Drink",
    classification: "/Food & Drink/Beverages",
  },
  {
    tags: ["Kultur"],
    section: "/Arts & Entertainment",
    classification: "/Arts & Entertainment",
  },
  {
    tags: ["Ehrenamt"],
    section: "/People & Society",
    classification:
      "/People & Society/Social Issues & Advocacy/Charity & Philanthropy",
  },
  {
    tags: ["Konzerte", "Konzert"],
    section: "/Arts & Entertainment",
    classification:
      "/Arts & Entertainment/Events & Listings/Concerts & Music Festivals",
  },
  {
    tags: ["Musik", "Lesung", "Lesungen"],
    section: "/Arts & Entertainment",
    classification: "/Arts & Entertainment/Music & Audio",
  },
  {
    tags: [
      "Sitzung",
      "Sitzungen",
      "Gemeindevertretung",
      "Gemeindevertretungen",
      "Gremium",
      "Gremien",
    ],
    section: "/Law & Government",
    classification: "/Law & Government/Government",
  },
  {
    tags: ["Gesundheit", "Fußpflege"],
    section: "/Health",
    classification: "/Health",
  },
  {
    tags: [
      "Restmüll",
      "Restabfall",
      "Bioabfall",
      "Bio",
      "Papier",
      "Pappe",
      "gelbe Tonne",
      "Sondermüll",
    ],
    section: "/Law & Government",
    classification: "/Law & Government/Social Services",
  },
  {
    tags: ["Bus", "Bahn", "Verkehr", "ÖPNV"],
    section: "/Travel",
    classification: "/Travel/Bus & Rail",
  },
  {
    tags: ["Bordell"],
    section: "/Adult",
    classification: "/Adult",
  },
];
