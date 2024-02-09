export type OpenAiScope =
  | "tight-nearby"
  | "wider-region"
  | "specific-location"
  | "formal-municipality";

export interface OpenAiScopeification {
  relevance: OpenAiScope;
}

export type OpenAiQuery = object;
