export interface TagQuery {
  [key: string]: any;
  summary?: string;
  content?: string;
}

export type Tags = string[];

export interface TagResponse {
  tags: Tags;
}
