import {
  ClassificationSchema,
  ClassifyQuery,
} from "@/src/app/api/classify/classify.schema";
import { classifyPrompt } from "./classify.prompt";
import { buildPrompt } from "./helpers/build-prompt";
import { getGoogleGeminiApiConfig } from "./helpers/config";
import { ApiError } from "@/src/rest/error.schema";
import { getLogger } from "@/src/logging/logger";
import { ApiClassify } from "@/src/logging/loggerApps.config";
import { GoogleGeminiModel } from "./types/google-gemini-model";
import { GoogleGenAI } from "@google/genai";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

const log = getLogger(ApiClassify.classify);

export const classify = async (
  query: ClassifyQuery
): Promise<ClassificationSchema> => {
  "use cache";
  cacheLife("gemini");

  try {
    // Get API configuration
    const config = getGoogleGeminiApiConfig();

    // Initialize the Google GenAI client
    const genAI = new GoogleGenAI({ apiKey: config.token });

    // Build the system prompt
    const systemPromptText = buildPrompt(classifyPrompt);
    log.debug({ data: systemPromptText }, "Google Gemini API system prompt");

    try {
      // Use the client to generate content
      const response = await genAI.models.generateContent({
        model: GoogleGeminiModel,
        contents: JSON.stringify(query, null, 2),
        config: {
          responseMimeType: classifyPrompt.responseMimeType,
          responseSchema: classifyPrompt.responseSchema,
          systemInstruction: systemPromptText,
        },
      });

      // Extract the response text
      log.debug({ data: response.candidates }, "Google Gemini API response");

      if (
        !response.candidates ||
        response.candidates.length === 0 ||
        !response.candidates[0] ||
        !response.candidates[0].content ||
        !response.candidates[0].content.parts ||
        !response.candidates[0].content.parts[0] ||
        !response.candidates[0].content.parts[0].text
      ) {
        log.error("No candidates found in the response");
        throw new ApiError(500, "No candidates found in the response");
      }

      // Parse the JSON response
      try {
        const classificationText = response.candidates[0].content.parts[0].text;
        const classificationData = JSON.parse(classificationText);
        const classifyResult: ClassificationSchema = ClassificationSchema.parse(
          {
            category: classificationData.category,
            tags: classificationData.tags,
          }
        );
        return classifyResult;
      } catch (err) {
        log.error(
          { error: err, data: response },
          "Failed to parse Google Gemini API response"
        );
        throw new ApiError(500, "Failed to parse Google Gemini API response");
      }
    } catch (err) {
      log.error({ error: err }, "Google Gemini API request failed");
      throw new ApiError(
        500,
        `Google Gemini API request failed: ${(err as Error).message}`
      );
    }
  } catch (error) {
    // If it's already an ApiError, just rethrow it
    if (error instanceof ApiError) {
      throw error;
    }

    // Otherwise, log and wrap in ApiError
    log.error({ error }, "Error in classify function");
    throw new ApiError(
      500,
      `Classification failed: ${(error as Error).message}`
    );
  }
};
