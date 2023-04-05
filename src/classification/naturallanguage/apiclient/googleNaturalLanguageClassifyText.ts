import { without } from "lodash";

export type GoogleNaturalLanguageClassifyTextQuery = {
  content: string;
};

export interface GoogleNaturalLanguageClassificationCategory {
  name: string;
  confidence: number;
}

export type GoogleNaturalLanguageClassifyTextResponse =
  | GoogleNaturalLanguageClassificationCategory[]
  | null;

type ApiResponseItem =
  | GoogleNaturalLanguageClassificationCategory
  | undefined
  | null;

interface ApiResponse {
  categories: ApiResponseItem[];
}

export const googleNaturalLanguageClassifyText = async (
  query: GoogleNaturalLanguageClassifyTextQuery
): Promise<GoogleNaturalLanguageClassifyTextResponse> => {
  try {
    console.debug(
      `Execute googlenaturallanguage.calssifytext(${query.content.substring(
        0,
        20
      )}...)`
    );

    // Imports the Google Cloud client library
    const language = require("@google-cloud/language");
    // Creates a client
    const client = new language.LanguageServiceClient();

    const document = {
      content: query.content,
      type: "PLAIN_TEXT",
    };
    const data: any = await client.classifyText({
      document,
    });

    const categories: GoogleNaturalLanguageClassificationCategory[] = <
      GoogleNaturalLanguageClassificationCategory[]
    >without(<any[]>data[0].categories, null, undefined);

    if (categories?.length > 0) {
      return categories;
    } else {
      throw new Error("No categories found.");
    }
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};
