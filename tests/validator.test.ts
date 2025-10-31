import { validateBadWords } from "../core/validator.js";
import { english } from "../plugins/english.js";

describe("validateBadWords()", () => {
  it("detects bad words in the text", () => {
    const result = validateBadWords("You are an idiot", english);
    expect(result.found).toContain("idiot");
  });

  it("returns empty for clean text", () => {
    const result = validateBadWords("Hello friend", english);
    expect(result.found).toHaveLength(0);
    expect(result.level).toBeNull();
  });

  it("detects highest level bad words", () => {
    const result = validateBadWords("You are a curse1", english);
    expect(result.found).toContain("curse1");
    expect(result.level).toBe("highest");
  });
});
