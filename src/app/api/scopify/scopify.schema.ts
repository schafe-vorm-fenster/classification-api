import { ResultSchema } from "@/src/rest/result.schema";
import { RuralEventScopeSchema } from "@/src/rural-event-types/rural-event-scope.types";
import { z } from "zod";

/**
 * Schema for the scopify query.
 * Can handle several attributes for scopification.
 * Allows any unknown attributes as extra context.
 */
export const ScopifyQuerySchema = z
  .object({
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    timespan: z.string().optional().describe("Use 15min, 3days or similar."),
    occurrence: z
      .enum(["once", "recurring", "opening-hours"])
      .or(z.string())
      .optional(),
  })
  .catchall(z.any());
export type ScopifyQuery = z.infer<typeof ScopifyQuerySchema>;

/**
 * Schema for the classify response data.
 */
export const ScopificationSchema = z.object({
  scope: RuralEventScopeSchema,
});
export type ScopificationSchema = z.infer<typeof ScopificationSchema>;

/**
 * Schema for the classify api response body.
 */
export const ScopifySuccessfulSchema = ResultSchema.extend({
  data: ScopificationSchema,
});

export type ScopifySuccessfulSchema = z.infer<typeof ScopifySuccessfulSchema>;
