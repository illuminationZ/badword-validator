export interface WordList {
  low?: string[];
  medium?: string[];
  high?: string[];
  highest?: string[];
}

export interface ValidatorResult {
  found: string[];
  level: keyof WordList | null;
}

export interface SanitizerOptions {
  replaceWith?: string;
  levels?: (keyof WordList)[];
}

export interface Plugin {
  name: string;
  words?: WordList;
  sanitize?(text: string): string;
  validate?(text: string): ValidatorResult;
}
