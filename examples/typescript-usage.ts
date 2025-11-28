import { BadWordFilter } from '../dist/index.js';
import type { Plugin, ValidatorResult, WordList } from '../types';
import { xssProtection } from '../dist/plugins/xssProtection.js';

// Define custom interfaces for better type safety
interface CustomPlugin extends Plugin {
  name: string;
  customMethod?: () => void;
}

interface ExtendedValidatorResult extends Omit<ValidatorResult, 'level'> {
  timestamp: Date;
  processedBy: string;
  level: keyof WordList | null;
}

console.log('=== TypeScript Usage with Full Type Safety ===');

// Create filter instance with full type support
const filter: BadWordFilter = new BadWordFilter();

// Define a custom word list with proper typing
const customWordList: WordList = {
  low: ['darn', 'crap'],
  medium: ['damn', 'hell'],
  high: ['shit'],
  highest: ['fuck', 'bitch']
};

// Create a typed custom plugin
const typedCustomPlugin: CustomPlugin = {
  name: 'TypedCustomPlugin',
  words: customWordList,
  validate(text: string): ValidatorResult {
    // Custom validation logic with full type safety
    const words = text.toLowerCase().split(' ');
    const found: string[] = [];
    let level: keyof WordList | null = null;

    for (const word of words) {
      if (customWordList.highest?.includes(word)) {
        found.push(word);
        level = 'highest';
      } else if (customWordList.high?.includes(word)) {
        found.push(word);
        level = level === 'highest' ? level : 'high';
      } else if (customWordList.medium?.includes(word)) {
        found.push(word);
        level = level === 'highest' || level === 'high' ? level : 'medium';
      } else if (customWordList.low?.includes(word)) {
        found.push(word);
        level = level === 'highest' || level === 'high' || level === 'medium' ? level : 'low';
      }
    }

    return { found, level };
  },
  sanitize(text: string): string {
    let result = text;
    Object.entries(customWordList).forEach(([level, words]) => {
      words?.forEach((word: string) => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        result = result.replace(regex, '*'.repeat(word.length));
      });
    });
    return result;
  },
  customMethod(): void {
    console.log('Custom method called!');
  }
};

// Use the typed plugin
filter.use(typedCustomPlugin);

// Type-safe text processing
const testText: string = "This is a damn good shit example!";
const sanitizedText: string = filter.sanitize(testText);
const validationResult = filter.validate(testText);

console.log('Original text:', testText);
console.log('Sanitized text:', sanitizedText);
console.log('Validation result:', validationResult);

// Enhanced validation with additional metadata
function enhancedValidation(text: string, filterInstance: BadWordFilter): ExtendedValidatorResult {
  const baseResult = filterInstance.validate(text);
  return {
    found: baseResult.found,
    level: baseResult.level as keyof WordList | null,
    timestamp: new Date(),
    processedBy: 'EnhancedValidator'
  };
}

const enhancedResult: ExtendedValidatorResult = enhancedValidation(testText, filter);
console.log('Enhanced validation result:', enhancedResult);

// Using XSS protection plugin with types
console.log('\n=== XSS Protection Example ===');
filter.use(xssProtection);

const xssText: string = '<script>alert("XSS Attack")</script>Hello world!';
const xssSafeText: string = filter.sanitize(xssText);
console.log('XSS text:', xssText);
console.log('XSS safe text:', xssSafeText);

// Generic utility function with proper typing
function processBatch<T extends readonly string[]>(
  texts: T,
  processor: (text: string) => string
): string[] {
  return texts.map(processor);
}

const batchTexts = ['Hello damn world', 'This is shit', 'Normal text'] as const;
const processedBatch = processBatch(batchTexts, (text) => filter.sanitize(text));
console.log('\nBatch processing:');
batchTexts.forEach((original, index) => {
  console.log(`"${original}" -> "${processedBatch[index]}"`);
});

// Advanced plugin with method chaining
class AdvancedBadWordFilter extends BadWordFilter {
  private logEnabled: boolean = false;

  enableLogging(): this {
    this.logEnabled = true;
    return this;
  }

  disableLogging(): this {
    this.logEnabled = false;
    return this;
  }

  sanitize(text: string): string {
    if (this.logEnabled) {
      console.log(`Processing: "${text}"`);
    }
    
    const result = super.sanitize(text);
    
    if (this.logEnabled) {
      console.log(`Result: "${result}"`);
    }
    
    return result;
  }
}

console.log('\n=== Advanced Filter with Method Chaining ===');
const advancedFilter = new AdvancedBadWordFilter();
advancedFilter
  .enableLogging()
  .use(typedCustomPlugin);

const finalResult = advancedFilter.sanitize('This is a fucking example!');
console.log('Final result:', finalResult);