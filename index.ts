import { WordList, Plugin } from "./types.js";
import { english } from "./plugins/english.js";
import { validateBadWords } from "./core/validator.js";
import { sanitizeBadWords } from "./core/sanitizer.js";

// Main BadWordFilter class
export class BadWordFilter {
  // Store active plugins and word lists
  private activePlugins: Plugin[] = [];
  // Store word lists
  private words: WordList = english;

  // Initialize with default English plugin
  use(plugin: Plugin) {
    this.activePlugins.push(plugin);
    if (plugin.words) {
      for (const level of Object.keys(plugin.words) as (keyof WordList)[]) {
        this.words[level] = [
          ...(this.words[level] ?? []),
          ...(plugin.words[level] ?? []),
        ];
      }
    }
  }

  // Validate the text against all active plugins
  validate(text: string) {
    let result = validateBadWords(text, this.words);
    for (const plugin of this.activePlugins) {
      if (plugin.validate) {
        const custom = plugin.validate(text);
        if (custom.found.length > 0 && custom.level !== null) {
          result = {
            found: custom.found as RegExpMatchArray,
            level: custom.level
          };
        }
      }
    }
    return result;
  }

  // Sanitize the text using all active plugins
  sanitize(text: string) {
    let clean = sanitizeBadWords(text, this.words);
    for (const plugin of this.activePlugins) {
      if (plugin.sanitize) clean = plugin.sanitize(clean);
    }
    return clean;
  }
}
