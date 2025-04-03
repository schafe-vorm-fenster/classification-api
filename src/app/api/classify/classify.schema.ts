import { ResultSchema } from "@/src/rest/result.schema";
import { RuralEventClassificationSchema } from "@/src/rural-event-types/rural-event-classification.types";
import { z } from "zod";

/**
 * Schema for the classify query.
 * Can handle several attributes for classification.
 * Allows any unknown attributes as extra context.
 */
export const ClassifyQuerySchema = z
  .object({
    summary: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    occurrence: z.string().optional().default("once"),
  })
  .catchall(z.any());
export type ClassifyQuery = z.infer<typeof ClassifyQuerySchema>;

/**
 * Schema for the classify response data.
 */
export const ClassificationSchema = RuralEventClassificationSchema;
export type ClassificationSchema = z.infer<typeof ClassificationSchema>;

/**
 * Schema for the classify api response body.
 */
export const ClassifySuccessfulSchema = ResultSchema.extend({
  data: ClassificationSchema,
});

export type ClassifySuccessfulSchema = z.infer<typeof ClassifySuccessfulSchema>;
