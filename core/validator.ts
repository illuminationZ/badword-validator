import { WordList, ValidatorResult } from "../types.js";

// Validate bad words in the text based on the provided word list
export function validateBadWords(text: string, wordList: WordList) {
  const lowerText = text.toLowerCase();

  for (const [level, words] of Object.entries(wordList)) {
    for (const word of words) {
      // Use word boundaries (\b) to match whole words only
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      const matches = lowerText.match(regex);

      if (matches) {
        return {
          found: matches,
          level: level,
        };
      }
    }
  }

  return {
    found: [],
    level: null,
  };
}
