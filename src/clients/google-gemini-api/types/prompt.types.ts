import { z } from "zod";

export const PromptSchema = z
  .object({
    prompt: z.string(),
    responseFormat: z.string().default("json"),
    responseMimeType: z.string().default("application/json"),
    responseSchema: z.object({}),
    instructions: z.array(z.string()),
  })
  .catchall(z.any());
export type Prompt = z.infer<typeof PromptSchema>;
