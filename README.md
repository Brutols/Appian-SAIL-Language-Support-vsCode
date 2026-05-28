# SAIL Language Support for VS Code

A VS Code extension that provides syntax highlighting and code formatting for Appian's SAIL (Service-Aligned Interface Language).

## Features

### Syntax Highlighting
- Highlights SAIL keywords: `if`, `then`, `else`, `true`, `false`, `null`, `and`, `or`, `not`
- Recognizes Appian functions starting with `a!` (e.g., `a!formLayout`, `a!buttonLayout`)
- Supports string literals (single and double quotes)
- Highlights numeric values
- Line comments (`--`) and block comments (`/* */`)
- Variable declarations and usage

### Code Formatting
- **Document Formatting**: Format your entire SAIL document (`Shift+Alt+F` on Windows/Linux, `Shift+Option+F` on Mac)
- **Range Formatting**: Format a selected range of code
- **Smart Indentation**: Automatically adjusts indentation based on brackets and braces
- **Bracket Balancing**: Properly handles nested structures with `{}`, `[]`, `()`
- **Spacing Normalization**: Adds proper spacing after commas and operators

## Installation

### From Source
1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run compile` to compile TypeScript
4. Press `F5` to launch the extension in debug mode

### Build VSIX
```bash
npm install -g @vscode/vsce
vsce package
```

## Usage

### Create a SAIL File
Create a file with `.sail` extension to enable syntax highlighting and formatting.

### Format Code
- **Full Document**: Right-click and select "Format Document" or press `Shift+Alt+F`
- **Selected Range**: Select code and right-click, then choose "Format Range" or press `Ctrl+K Ctrl+F`

## Supported File Extensions
- `.sail` - SAIL language files

## Example SAIL Code

```sail
{
  sailComponent: a!formLayout(
    label: "Example Form",
    items: {
      a!textField(
        label: "Name",
        value: local!name,
        saveInto: local!name,
        required: true
      ),
      a!buttonLayout(
        buttons: {
          a!buttonWidget(
            label: "Submit",
            value: true,
            saveInto: local!submitted
          )
        }
      )
    }
  )
}
```

## Requirements

- VS Code 1.50 or later

## Known Issues

- Advanced SAIL constructs may require additional grammar updates
- Complex nested structures might benefit from improved formatting

## Future Enhancements

- IntelliSense/autocomplete for SAIL functions
- Error detection and diagnostics
- Snippet templates for common SAIL patterns
- Theme-specific syntax highlighting
- Advanced documentation and goto definition support

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - feel free to use and modify as needed.

## Support

For issues or questions about SAIL language, please refer to the Appian documentation at https://docs.appian.com/
