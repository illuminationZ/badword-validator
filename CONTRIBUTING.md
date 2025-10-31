# Contributing to BadWord Validator

Thank you for your interest in contributing to BadWord Validator! We welcome contributions from the community.

## 🚀 Getting Started

### Prerequisites

- Node.js 14.0.0 or higher
- npm or yarn
- Git

### Development Setup

1. **Fork and clone the repository**:
   ```bash
   git clone https://github.com/yourusername/badword-validator.git
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

5. **Start development mode**:
   ```bash
   npm run dev
   ```

## 📝 Development Workflow

### Making Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Add tests** for new functionality

4. **Run the test suite**:
   ```bash
   npm test
   ```

5. **Build the project**:
   ```bash
   npm run build
   ```

6. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   ```

### Commit Message Convention

We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Code Style

- Use TypeScript for all new code
- Follow existing code formatting
- Add JSDoc comments for public APIs
- Ensure all tests pass
- Maintain 100% type coverage

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run dev
```

### Writing Tests

- Place test files in the `tests/` directory
- Use descriptive test names
- Test both success and error cases
- Aim for high code coverage

Example test structure:
```typescript
import { BadWordFilter } from '../index.js';

describe('BadWordFilter', () => {
  let filter: BadWordFilter;

  beforeEach(() => {
    filter = new BadWordFilter();
  });

  it('should sanitize basic bad words', () => {
    const result = filter.sanitize('some bad word');
    expect(result).toBe('some *** word');
  });
});
```

## 🔌 Plugin Development

### Creating a Plugin

Plugins should implement the `Plugin` interface:

```typescript
import { Plugin, ValidatorResult } from '../types.js';

export const myPlugin: Plugin = {
  name: 'MyPlugin',
  words: {
    medium: ['example']
  },
  validate(text: string): ValidatorResult {
    // Custom validation logic
    return { found: [], level: null };
  },
  sanitize(text: string): string {
    // Custom sanitization logic
    return text;
  }
};
```

### Plugin Guidelines

- Use descriptive names
- Include comprehensive tests
- Document functionality
- Follow TypeScript best practices
- Consider performance implications

## 📚 Documentation

### README Updates

When adding new features, update the README with:
- New API methods
- Usage examples
- Configuration options

### API Documentation

- Use JSDoc comments for all public APIs
- Include parameter types and descriptions
- Provide usage examples
- Document any thrown errors

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description** - Clear description of the issue
2. **Steps to reproduce** - Minimal steps to reproduce the bug
3. **Expected behavior** - What you expected to happen
4. **Actual behavior** - What actually happened
5. **Environment** - Node.js version, OS, etc.
6. **Code sample** - Minimal code that reproduces the issue

## 💡 Feature Requests

For feature requests, please include:

1. **Use case** - Why this feature would be useful
2. **Proposed solution** - How you envision it working
3. **Alternatives** - Other solutions you've considered
4. **Examples** - Code examples if applicable

## 🔄 Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Add** tests for new functionality
5. **Update** documentation as needed
6. **Ensure** all tests pass
7. **Submit** a pull request

### Pull Request Guidelines

- Keep PRs focused on a single feature/fix
- Include descriptive commit messages
- Add tests for new functionality
- Update documentation as needed
- Ensure CI checks pass

## 📋 Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create a git tag
4. Create a GitHub release
5. Automated publishing via GitHub Actions

## 🤝 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain a positive environment

## 📞 Getting Help

- **Issues** - GitHub Issues for bugs and features
- **Discussions** - GitHub Discussions for questions
- **Documentation** - Check the README and API docs

## 🙏 Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes
- Special thanks in major releases

Thank you for contributing to BadWord Validator! 🎉