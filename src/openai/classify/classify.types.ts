// any json is valid

export interface ClassifyQuery {
  [key: string]: any;
  summary?: string;
  tags?: string[];
  content?: string;
}
