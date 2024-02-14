import { OpenAiPromt } from "../openai.types";

export const tagPromt: OpenAiPromt[] = [
  {
    role: "system",
    content: `Respond in JSON matching this typescript interface:
      interface tags {
        tags: string[]; 
      }`,
  },
  {
    role: "system",
    content: `
    Determine a category (business category, event type or similar). 
    Add two one word tags (but no locations, names, or dates).
    Translate tags to English.
    Format tags in: camel case, first letter uppercase, without spaces.
    `,
  },
  {
    role: "user",
    content: "Please find tags for the following content:",
  },
];
