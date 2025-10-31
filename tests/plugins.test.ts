import { english } from "../plugins/english.js";
import { xssProtection } from "../plugins/xssProtection.js";

describe("english plugin", () => {
  it("English plugin has valid structure", () => {
    expect(english.highest).toContain("curse1");
    expect(english.medium).toContain("stupid");
    expect(english.low).toContain("darn");
  });

  it("XSS plugin removes script tags", () => {
    const dirtyText = '<script>alert("XSS")</script>This is a test.';
    const cleanText = xssProtection.sanitize!(dirtyText);
    expect(cleanText).toBe("[removed-script]This is a test.");
  });
});
