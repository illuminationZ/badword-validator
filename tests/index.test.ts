import { BadWordFilter } from "../index.js";
import { xssProtection } from "../plugins/xssProtection.js";

describe("BadWord Filter", () => {
  let filter: BadWordFilter;

  beforeEach(() => {
    filter = new BadWordFilter();
  });

  it("validates and sanitizes bad words correctly", () => {
    const dirtyText = "What the heck are you.";
    const validationResult = filter.validate(dirtyText);
    expect(validationResult.found).toContain("heck");

    const cleanText = filter.sanitize(dirtyText);
    expect(cleanText).toBe("What the **** are you.");
  });

  it("supports adding plugins", () => {
    filter.use({ name: "CustomPlugin", words: { medium: ["dumb"] } });

    const dirtyText = "You are so dumb.";
    const validationResult = filter.validate(dirtyText);
    expect(validationResult.found).toContain("dumb");

    const cleanText = filter.sanitize(dirtyText);
    expect(cleanText).toBe("You are so ****.");
  });

  it("applies XSS plugin correctly", () => {
    filter.use(xssProtection);

    const dirtyText = '<script>alert("XSS")</script>This is a test.';
    const cleanText = filter.sanitize(dirtyText);
    expect(cleanText).toBe("[removed-script]This is a test.");
  });

  it("handles custom plugin validation and sanitization", () => {
    const customPlugin = {
      name: "CustomPlugin",
      words: { medium: ["foobar"] },
      sanitize: (text: string) => text.replace(/foobar/gi, "******"),
    };
    filter.use(customPlugin);
    const dirtyText = "This is a foobar test.";
    const validationResult = filter.validate(dirtyText);
    expect(validationResult.found).toContain("foobar");

    const cleanText = filter.sanitize(dirtyText);
    expect(cleanText).toBe("This is a ****** test.");
  });

  it("uses custom plugin validate method when it returns bad words", () => {
    const customPlugin = {
      name: "CustomValidationPlugin",
      words: { high: ["badword"] },
      validate: (text: string) => ({
        found: ["badword"],
        level: "high" as const,
      }),
    };
    filter.use(customPlugin);
    const dirtyText = "This contains badword text.";
    const validationResult = filter.validate(dirtyText);
    expect(validationResult.found).toContain("badword");
    expect(validationResult.level).toBe("high");
  });

  it("does not override result when custom plugin finds no bad words", () => {
    const customPlugin = {
      name: "CustomValidationPlugin",
      words: { high: ["badword"] },
      validate: (text: string) => ({
        found: [],
        level: null,
      }),
    };
    filter.use(customPlugin);

    const dirtyText = "This contains heck text.";
    const validationResult = filter.validate(dirtyText);

    // Should use default validation, not custom
    expect(validationResult.found).toContain("heck");
    expect(validationResult.level).toBe("low");
  });

  it("does not override result when custom plugin has no level", () => {
    const customPlugin = {
      name: "CustomValidationPlugin",
      words: { high: ["badword"] },
      validate: (text: string) => ({
        found: ["badword"],
        level: null,
      }),
    };
    filter.use(customPlugin);

    const dirtyText = "This contains heck text.";
    const validationResult = filter.validate(dirtyText);

    // Should use default validation, not custom
    expect(validationResult.found).toContain("heck");
  });
});
