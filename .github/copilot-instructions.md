# SAIL Language Extension Development Guide

## Project Overview
This is a VS Code extension that provides syntax highlighting and code formatting for Appian's SAIL language.

## Key Files
- `package.json` - Extension metadata and VS Code contributions
- `src/extension.ts` - Main extension entry point
- `src/formatter.ts` - Document and range formatting implementation
- `syntaxes/sail.tmLanguage.json` - TextMate grammar for SAIL syntax highlighting
- `language-configuration.json` - Language behavior configuration

## Development Workflow

### Setup
```bash
npm install
npm run compile
```

### Debug
Press F5 to launch the extension in VS Code debug mode.

### Build
```bash
npm run watch        # Watch for changes and recompile
npm run compile      # Compile TypeScript
```

## Extension Features

### 1. Syntax Highlighting
- Defined in `syntaxes/sail.tmLanguage.json` using TextMate grammar
- Supports SAIL keywords, functions (a!*), strings, numbers, comments

### 2. Code Formatting
- Document formatter: formats entire file
- Range formatter: formats selected text
- Handles indentation, bracket balancing, and spacing

## Common Modifications

### Add New Keywords
Edit `syntaxes/sail.tmLanguage.json` → `repository.keywords` pattern

### Improve Formatter
Edit `src/formatter.ts` → `formatDocument()` or `formatRange()` functions

### Add New Language Features
1. Update grammar in `syntaxes/sail.tmLanguage.json`
2. Add corresponding patterns in the `repository` section
3. Test with `.sail` files

## Testing
Create test files with `.sail` extension and test:
- Syntax highlighting
- Document formatting
- Range formatting

## Publishing
```bash
npm install -g @vscode/vsce
vsce package
```

## Resources
- [VS Code Extension API](https://code.visualstudio.com/api)
- [TextMate Grammar Documentation](https://macromates.com/manual/en/language_grammars)
- [Appian SAIL Documentation](https://docs.appian.com/)
