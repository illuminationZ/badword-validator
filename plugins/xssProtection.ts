import { Plugin } from "../types.js";

/**
 * XSS Protection Plugin
 * This plugin sanitizes potential XSS attack vectors from the input text.
 * It removes <script> tags and any HTML tags to prevent script injection.
 * Usage:
 *   const filter = new BadWordFilter();
 *   filter.use(xssProtection);
 *  const cleanText = filter.sanitize(dirtyText);
 *  @returns sanitized text without XSS vulnerabilities
 */
export const xssProtection: Plugin = {
  name: "xss-protection",
  sanitize(text: string): string {
    return text
      .replace(/<script.*?>.*?<\/script>/gi, "[removed-script]")
      .replace(/<[^>]+>/g, "");
  },
};
