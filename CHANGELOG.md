# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-31

### Added
- Initial release of badword-validator
- Core `BadWordFilter` class with sanitize and validate methods
- Plugin system for extensible functionality
- Built-in English word list plugin
- XSS protection plugin
- Full TypeScript support with type definitions
- ES Module format with tree-shaking support
- Zero dependencies
- Comprehensive test suite

### Features
- Text sanitization by replacing bad words with asterisks
- Text validation with severity level detection (low, medium, high, highest)
- Customizable word lists and plugins
- Express.js middleware examples
- Cross-platform compatibility (Node.js 14+, browsers, bundlers)