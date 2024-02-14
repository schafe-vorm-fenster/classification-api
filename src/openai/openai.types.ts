export interface OpenAiPromt {
  role: "system" | "user";
  content: string;
}

export type OpenAiGptModel = "gpt-3.5-turbo" | "gpt-3.5-turbo-1106";

/**
 *     "response_format": {
        "type": "json_object"
    },
    "seed": 5,
    "temperature": 0.2,
    "messages": [
 */

export interface OpenAiQuery {
  model: OpenAiGptModel;
  response_format: {
    type: "json_object";
  };
  seed: number;
  temperature: number;
  messages: OpenAiPromt[];
}
