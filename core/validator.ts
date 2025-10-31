import { WordList, ValidatorResult } from "../types.js";

// Validate bad words in the text based on the provided word list
export function validateBadWords(text: string, words: WordList): ValidatorResult {
  const lowerText = text.toLowerCase();

  /**
   * Find bad words in the text for each level
   * @return ValidatorResult with found words and their level
   */
  for (const level of Object.keys(words) as (keyof WordList)[]) {
    const list = words[level] ?? [];
    const found = list.filter((w) => lowerText.includes(w.toLowerCase()));
    if (found.length > 0) {
      return { found, level };
    }
  }

  return { found: [], level: null };
}
