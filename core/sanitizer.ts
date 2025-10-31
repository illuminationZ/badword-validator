import { WordList, SanitizerOptions } from "../types.js";

// Sanitize bad words in the text based on the provided word list and options
/**
 * 
 * @param text - input text to sanitize
 * @param words - word list containing bad words
 * @param options - sanitizer options e.g., replacement character and levels to consider
 * @returns sanitized text
 */
export function sanitizeBadWords(
  text: string,
  words: WordList,
  options: SanitizerOptions = {}
): string {
  const { replaceWith = "*", levels = ["low", "medium", "high", "highest"] } = options;
  let clean = text;

  // Iterate through specified levels and replace bad words
  for (const level of levels) {
    const list = words[level] ?? [];
    // Replace each bad word with the specified replacement character
    for (const BadWord of list) {
      // Use word boundaries to avoid partial matches
      const regex = new RegExp(`\\b${BadWord}\\b`, "gi");
      clean = clean.replace(regex, replaceWith.repeat(BadWord.length));
    }
  }

  return clean;
}
