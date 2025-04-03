import { Prompt } from "../types/prompt.types";

/**
 * Transforms a typed promt into a text prompt.
 */
export function buildPrompt(prompt: Prompt): string {
  const promptText: string[] = [];
  promptText.push(prompt.prompt);
  promptText.push("Act as an API.");
  promptText.push(
    `The response has to be valid and parsable ${prompt.responseFormat}.`
  );
  promptText.push(`The response has to match the json schema.`);
  promptText.push(`Use this instructions:\n${prompt.instructions?.join("\n")}`);

  const text: string = promptText.join("\n\n");

  return text;
}
