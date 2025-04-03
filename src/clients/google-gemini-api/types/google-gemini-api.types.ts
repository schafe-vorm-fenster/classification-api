import { z } from "zod";

/**
 * Schema for the Google Gemini API request body.
 */
export const GoogleGeminiRequestBodySchema = z.object({
  system_instruction: z.object({
    parts: z.array(
      z.object({
        text: z.string(),
      })
    ),
  }),
  contents: z.array(
    z.object({
      parts: z.array(
        z.object({
          text: z.string(),
        })
      ),
    })
  ),
  config: z
    .object({
      responseMimeType: z.string().default("application/json"),
      responseSchema: z.any(),
    })
    .optional(),
});
export type GoogleGeminiRequestBody = z.infer<
  typeof GoogleGeminiRequestBodySchema
>;

/**
 * Schema for the Google Gemini API request body.
 * Focus on "candidates.content.parts".
 */
export const GoogleGeminiResponseBodySchema = z
  .object({
    candidates: z.array(
      z.object({
        content: z.object({
          parts: z.array(
            z.object({
              text: z.string(),
            })
          ),
          role: z.string(),
        }),
        finishReason: z.string(),
        safetyRatings: z.array(
          z.object({
            category: z.string(),
            probability: z.string(),
          })
        ),
        avgLogprobs: z.number().optional(),
      })
    ),
  })
  .catchall(z.any());
export type GoogleGeminiResponseBody = z.infer<
  typeof GoogleGeminiResponseBodySchema
>;
