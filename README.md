# BadWord Validator

[![npm version](https://badge.fury.io/js/badword-validator.svg)](https://badge.fury.io/js/badword-validator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Node.js CI](https://github.com/yourusername/badword-validator/workflows/Node.js%20CI/badge.svg)](https://github.com/yourusername/badword-validator/actions)

A flexible TypeScript/JavaScript library designed to help developers identify and sanitize inappropriate or offensive language in user-generated content. Built with modern ES modules, full TypeScript support, and an extensible plugin architecture.

## ✨ Features

- 🔷 **Dual Language Support**: Written in TypeScript with full type definitions, works seamlessly in both TS and JS projects
- 📝 **Customizable Word Lists**: Define your own lists of bad words categorized by severity levels (low, medium, high, highest)
- 🔌 **Plugin System**: Extend functionality with plugins for additional features like XSS protection
- 🛡️ **Sanitization & Validation**: Easily sanitize and validate text input to ensure it meets your content guidelines
- ⚡ **Modern ES Modules**: ES2022 format with full tree-shaking support for optimal bundle sizes
- 🎯 **Zero Dependencies**: Lightweight library with no external dependencies
- 🧪 **Well Tested**: Comprehensive test suite with high coverage
- 📦 **Ready for Production**: Battle-tested patterns and enterprise-ready architecture

## 📥 Installation

```bash
npm install badword-validator
```

```bash
yarn add badword-validator
```

```bash
pnpm add badword-validator
```

### Usage

### JavaScript
```javascript
import { BadWordFilter } from 'badword-validator';

const filter = new BadWordFilter();
const result = filter.sanitize("What the hell is going on?");
console.log(result); // "What the **** is going on?"
```

### TypeScript
```typescript
import { BadWordFilter, ValidatorResult } from 'badword-validator';

const filter: BadWordFilter = new BadWordFilter();
const result: ValidatorResult = filter.validate("Some text here");
console.log(result); // { found: ['word'], level: 'medium' }
```

### BadWordFilter Class

The main class for filtering and validating text content.

#### Constructor
```typescript
const filter = new BadWordFilter();
```

#### Methods

##### `sanitize(text: string): string`
Sanitizes the input text by replacing bad words with asterisks.

```javascript
const clean = filter.sanitize("This is damn good!");
// Returns: "This is **** good!"
```

##### `validate(text: string): ValidatorResult`
Validates text and returns information about found bad words.

```typescript
const result = filter.validate("Some bad text");
// Returns: { found: string[], level: 'low' | 'medium' | 'high' | 'highest' | null }
```

##### `use(plugin: Plugin): void`
Adds a plugin to extend functionality.

```javascript
filter.use({ 
  name: "CustomPlugin", 
  words: { medium: ["word1", "word2"] } 
});
```

### Plugin Interface

```typescript
interface Plugin {
  name: string;
  words?: WordList;
  sanitize?(text: string): string;
  validate?(text: string): ValidatorResult;
}
```

### Word List Structure

```typescript
interface WordList {
  low?: string[];      // Mild inappropriate words
  medium?: string[];   // Moderately inappropriate words  
  high?: string[];     // Highly inappropriate words
  highest?: string[];  // Extremely inappropriate words
}
```

## 🔧 Advanced Usage

### TypeScript Usage

#### � Basic Example with Types
```typescript
import { BadWordFilter, Plugin, ValidatorResult, WordList } from "badword-validator";

const filter: BadWordFilter = new BadWordFilter();
const text: string = "What the hell are you doing?";
const cleanText: string = filter.sanitize(text);
console.log(cleanText); // Output: What the **** are you doing?

// Fully typed validation result
const result: ValidatorResult = filter.validate(text);
console.log(result); // { found: ['hell'], level: 'medium' }
```

#### 🔧 Custom Typed Plugin
```typescript
import { BadWordFilter, Plugin, WordList } from "badword-validator";

interface CustomPlugin extends Plugin {
  customMethod?: () => void;
}

const customWordList: WordList = {
  low: ['darn'],
  medium: ['damn', 'hell'],
  high: ['shit']
};

const customPlugin: CustomPlugin = {
  name: "TypedCustomPlugin",
  words: customWordList,
  validate(text: string) {
    // Custom validation logic with full type safety
    const words = text.toLowerCase().split(' ');
    const found: string[] = [];
    let level: keyof WordList | null = null;
    
    // Implementation details...
    return { found, level };
  },
  customMethod() {
    console.log('Custom method executed!');
  }
};

const filter = new BadWordFilter();
filter.use(customPlugin);
```

## � Advanced Usage

### Custom Word Lists

```javascript
import { BadWordFilter } from 'badword-validator';

const filter = new BadWordFilter();

// Add custom words with different severity levels
filter.use({
  name: 'CustomWordList',
  words: {
    low: ['darn', 'crap'],
    medium: ['damn', 'hell'], 
    high: ['shit', 'ass'],
    highest: ['fuck', 'bitch']
  }
});

const text = "This is some damn shit!";
console.log(filter.validate(text));
// { found: ['damn', 'shit'], level: 'high' }
```

### XSS Protection Plugin

```javascript
import { BadWordFilter } from 'badword-validator';
import { xssProtection } from 'badword-validator/plugins/xssProtection';

const filter = new BadWordFilter();
filter.use(xssProtection);

const maliciousInput = '<script>alert("XSS")</script>Hello world!';
const safe = filter.sanitize(maliciousInput);
console.log(safe); // "[removed-script]Hello world!"
```

### Express.js Middleware

```javascript
import { BadWordFilter } from 'badword-validator';

const filter = new BadWordFilter();

export function contentModerationMiddleware(req, res, next) {
  if (req.body) {
    // Sanitize string bodies
    if (typeof req.body === 'string') {
      req.body = filter.sanitize(req.body);
    }
    // Recursively sanitize object properties
    else if (typeof req.body === 'object') {
      req.body = sanitizeObject(req.body, filter);
    }
  }
  next();
}

function sanitizeObject(obj, filter) {
  const sanitized = { ...obj };
  for (const [key, value] of Object.entries(sanitized)) {
    if (typeof value === 'string') {
      sanitized[key] = filter.sanitize(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value, filter);
    }
  }
  return sanitized;
}
```

### Custom Validation Plugin

```typescript
import { BadWordFilter, Plugin, ValidatorResult } from 'badword-validator';

const contextAwarePlugin: Plugin = {
  name: 'ContextAwareFilter',
  validate(text: string): ValidatorResult {
    // Custom logic for context-aware validation
    const suspiciousPatterns = [
      /\b\w*\d+\w*\b/g, // Words with numbers (potential spam)
      /(.)\1{3,}/g,     // Repeated characters (potential spam)
    ];
    
    const found: string[] = [];
    for (const pattern of suspiciousPatterns) {
      const matches = text.match(pattern);
      if (matches) found.push(...matches);
    }
    
    return {
      found,
      level: found.length > 0 ? 'medium' : null
    };
  },
  sanitize(text: string): string {
    return text
      .replace(/\b\w*\d+\w*\b/g, '[filtered]')
      .replace(/(.)\1{3,}/g, (match) => match[0].repeat(2));
  }
};

const filter = new BadWordFilter();
filter.use(contextAwarePlugin);
```

## 🌍 Framework Integration

### Next.js API Routes

```typescript
// pages/api/moderate.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { BadWordFilter } from 'badword-validator';

const filter = new BadWordFilter();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { content } = req.body;
    const sanitized = filter.sanitize(content);
    const validation = filter.validate(content);
    
    res.json({ 
      sanitized, 
      validation,
      isClean: validation.found.length === 0 
    });
  }
}
```

### React Hook

```typescript
import { useState, useCallback } from 'react';
import { BadWordFilter, ValidatorResult } from 'badword-validator';

const filter = new BadWordFilter();

export function useContentModeration() {
  const [lastValidation, setLastValidation] = useState<ValidatorResult | null>(null);
  
  const validateContent = useCallback((text: string) => {
    const result = filter.validate(text);
    setLastValidation(result);
    return result;
  }, []);
  
  const sanitizeContent = useCallback((text: string) => {
    return filter.sanitize(text);
  }, []);
  
  return {
    validateContent,
    sanitizeContent,
    lastValidation,
    isClean: lastValidation?.found.length === 0
  };
}
```

### 🌍 Environment Compatibility

| Environment | Support | Notes |
|-------------|---------|-------|
| **Node.js** | ✅ v14+ | Full ES module support |
| **TypeScript** | ✅ v4+ | Complete type definitions |
| **Browser** | ✅ Modern | ES2022+ required |
| **Webpack** | ✅ | Tree-shaking supported |
| **Rollup** | ✅ | ES module optimization |
| **Vite** | ✅ | Native ES module support |

### 🌍 Environment Compatibility

| Environment | Support | Notes |
|-------------|---------|-------|
| **Node.js** | ✅ v14+ | Full ES module support |
| **TypeScript** | ✅ v4+ | Complete type definitions |
| **Browser** | ✅ Modern | ES2022+ required |
| **Webpack** | ✅ | Tree-shaking supported |
| **Rollup** | ✅ | ES module optimization |
| **Vite** | ✅ | Native ES module support |
| **Next.js** | ✅ | SSR/SSG compatible |
| **React** | ✅ | Works in components & hooks |
| **Vue** | ✅ | Compatible with Vue 3 |
| **Angular** | ✅ | Works with Angular services |

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## 🔧 Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/illuminationZ/badword-validator.git
   cd badword-validator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

4. **Run tests**:
   ```bash
   npm test
   ```

5. **Development mode** (watch for changes):
   ```bash
   npm run dev
   ```

## 📝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern TypeScript and ES modules
- Inspired by the need for flexible content moderation
- Thanks to all contributors and users

## 📊 Package Stats

- **Zero dependencies** - Lightweight and fast
- **Full TypeScript support** - Complete type definitions
- **ES Module format** - Tree-shaking friendly
- **Comprehensive tests** - High coverage and reliability
- **Production ready** - Battle-tested patterns

---

**Made with ❤️ for safer content experiences**

