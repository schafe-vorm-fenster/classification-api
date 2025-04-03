import { Type } from "@google/genai";
import { Prompt } from "./types/prompt.types";

export const scopifyPrompt: Prompt = {
  prompt:
    "Define the regional geographic relevance based on the provided information.",
  responseFormat: "json",
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      scope: {
        type: Type.STRING,
        enum: [
          "community",
          "municipality",
          "county",
          "state",
          "country",
          "nearby",
          "region",
        ],
        description:
          "Define the regional geographic relevance based on the provided information.",
        nullable: false,
      },
    },
    required: ["scope"],
  },
  instructions: [
    "- Prioritize category over tags over occurrence over timespan over location.",
    "- 'timespan': Multi day has a wider scope; e.g. 2d are likely relevant for a 'region'.",
    "- 'timespan': Shorter timespan has a tighter scope; e.g. 30min is more likely 'community', 1h is more likely 'nearby'.",
    "- 'timespan': Longer timespan has awider scope; e.g. 2h is more likely 'region'.",
    "- 'occurrence': 'recurring' tend to a tighter relevance, it is more likely relevant for 'community' or 'nearby'.",
    "- 'occurrence': 'once' tend to a wider scope like 'region'.",
    "- 'occurrence': 'opening hours' tend to a tighter scope like 'community'.",
    "- 'category': 'everyday-supply' has a tighter scope like a 'community' or 'nearby'.",
    "- 'category': 'everyday-supply' combined with a timespan 'allday' or a short timespan < 1h has a tight relevance 'community'.",
    "- 'category': 'culture-tourism' has a wider scope like a 'region'.",
    "- 'category': 'community-life' has anearby scope like a 'municipality' or 'nearby'.",
    "- 'tags': 'tags' might help to define the scope.",
    "- 'tags': Tags for regional public traffic like ÖPNV, Bus, Rufbus, Fähre, Brücke tend to 'community'.",
    "- 'tags': Tags for long distance transport like Bahn, Zug tend to 'nearby'.",
    "- 'tags': Tags for a mobile supply like Auto, Wagen, Mobil tend to 'community'.",
    "- 'tags': Tags with formal municipality scope like Bürgermeister, Sprechstunde, Sitzung, Ausschuss is always 'municipality'!",
  ],
};
