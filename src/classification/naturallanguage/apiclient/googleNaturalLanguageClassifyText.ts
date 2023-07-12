import { without } from "lodash";
import { getLogger } from "../../../../logging/log-util";
import { GoogleNaturalLanguageClassification } from "../../mapping/mapTagToGoogleClassification.mapping";

export type GoogleNaturalLanguageClassifyTextQuery = {
  content: string;
};

export interface GoogleNaturalLanguageClassificationCategory {
  name: GoogleNaturalLanguageClassification;
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
  const log = getLogger("googlenaturallanguage.calssifytext");
  try {
    log.debug({ query: query }, "Execute googlenaturallanguage.calssifytext");

    // Imports the Google Cloud client library
    const language = require("@google-cloud/language");
    // Creates a client
    const options = {
      credentials: {
        client_email: process.env.GOOGLEAPI_CLIENT_EMAIL,
        private_key: process.env.GOOGLEAPI_PRIVATE_KEY,
      },
    };
    if (!options.credentials.client_email || !options.credentials.private_key) {
      throw new Error(
        "GOOGLEAPI_CLIENT_EMAIL or GOOGLEAPI_PRIVATE_KEY is not set."
      );
    }
    const client = new language.LanguageServiceClient(options);

    const document = {
      content: query.content,
      type: "PLAIN_TEXT",
    };
    const data: any = await client.classifyText({
      document,
    });
    log.debug(
      { query: query, document: document, result: data },
      "Got response from googlenaturallanguage.calssifytext"
    );

    const categories: GoogleNaturalLanguageClassificationCategory[] = <
      GoogleNaturalLanguageClassificationCategory[]
    >without(<any[]>data[0].categories, null, undefined);

    if (categories?.length > 0) {
      log.info(
        { query: query, categories: categories },
        "Got categories by googlenaturallanguage.calssifytext"
      );

      return categories;
    } else {
      throw new Error("No categories found.");
    }
  } catch (error: Error | any) {
    log.error(error, error?.message);
    return null;
  }
};
