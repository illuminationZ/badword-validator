import { sanitizeBadWords } from "../core/sanitizer.js";
import { english } from "../plugins/english.js";

describe("sanitizeBadWords()", () => {
  it("replaces bad words with asterisks", () => {
    const result = sanitizeBadWords("You are an idiot", english);
    expect(result).toBe("You are an *****");
  });

  it("keeps clean text unchanged", () => {
    const result = sanitizeBadWords("Hello friend", english);
    expect(result).toBe("Hello friend");
  });

  it("uses custom replace symbol", () => {
    const result = sanitizeBadWords("stupid", english, { replaceWith: "#" });
    expect(result).toBe("######");
  });
});
