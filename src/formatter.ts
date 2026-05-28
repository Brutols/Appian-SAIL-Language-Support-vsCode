import * as vscode from 'vscode';

export function activateFormatter(context: vscode.ExtensionContext) {
  try {
    const disposable = vscode.languages.registerDocumentFormattingEditProvider('sail', {
      provideDocumentFormattingEdits(
        document: vscode.TextDocument,
        options: vscode.FormattingOptions,
        token: vscode.CancellationToken
      ): vscode.TextEdit[] {
        return formatDocument(document, options);
      },
    });

    context.subscriptions.push(disposable);

    // Range formatter
    const rangeFormatter = vscode.languages.registerDocumentRangeFormattingEditProvider('sail', {
      provideDocumentRangeFormattingEdits(
        document: vscode.TextDocument,
        range: vscode.Range,
        options: vscode.FormattingOptions,
        token: vscode.CancellationToken
      ): vscode.TextEdit[] {
        return formatRange(document, range, options);
      },
    });

    context.subscriptions.push(rangeFormatter);
  } catch (error) {
    console.error('Error activating formatter:', error);
  }
}

function formatDocument(document: vscode.TextDocument, options: vscode.FormattingOptions): vscode.TextEdit[] {
  const edits: vscode.TextEdit[] = [];
  const text = document.getText();
  const lines = text.split('\n');
  
  const indentSize = options.tabSize || 2;
  const insertSpaces = options.insertSpaces !== false;
  const indentStr = insertSpaces ? ' '.repeat(indentSize) : '\t';

  // First pass: calculate proper indent level for each line
  const indentLevels: number[] = [];
  let parenLevel = 0;    // Level from parentheses ()
  let braceLevel = 0;    // Level from braces {} - tracked but NOT used for indentation

  for (let i = 0; i < lines.length; i++) {
    const trimmedLine = lines[i].trim();

    if (trimmedLine.length === 0) {
      indentLevels[i] = -1; // Skip empty lines
      continue;
    }

    // The indent level for this line is based ONLY on parentheses
    indentLevels[i] = parenLevel;

    // Count brackets on this line
    const parenDiff = countParentheses(trimmedLine);
    const braceDiff = countBraces(trimmedLine);
    
    parenLevel += parenDiff;
    parenLevel = Math.max(0, parenLevel);
    
    braceLevel += braceDiff;
    braceLevel = Math.max(0, braceLevel);
  }

  // Second pass: apply indentation
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    if (indentLevels[i] === -1 || trimmedLine.length === 0) {
      continue;
    }

    const properIndent = indentStr.repeat(indentLevels[i]);
    const currentIndent = line.match(/^\s*/)?.[0] || '';

    // Only modify if indentation differs
    if (currentIndent !== properIndent) {
      const startPos = new vscode.Position(i, 0);
      const endPos = new vscode.Position(i, currentIndent.length);
      edits.push(vscode.TextEdit.replace(new vscode.Range(startPos, endPos), properIndent));
    }
  }

  return edits;
}

function countParentheses(line: string): number {
  let openCount = 0;
  let closeCount = 0;
  let inSingleQuote = false;
  let inDoubleQuote = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    // Toggle quote state
    if (char === "'" && (i === 0 || line[i - 1] !== '\\')) {
      inSingleQuote = !inSingleQuote;
      continue;
    }
    if (char === '"' && (i === 0 || line[i - 1] !== '\\')) {
      inDoubleQuote = !inDoubleQuote;
      continue;
    }

    // Skip if inside quotes
    if (inSingleQuote || inDoubleQuote) {
      continue;
    }

    // Count ONLY parentheses ()
    if (char === '(') {
      openCount++;
    } else if (char === ')') {
      closeCount++;
    }
  }

  return openCount - closeCount;
}

function countBraces(line: string): number {
  let openCount = 0;
  let closeCount = 0;
  let inSingleQuote = false;
  let inDoubleQuote = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    // Toggle quote state
    if (char === "'" && (i === 0 || line[i - 1] !== '\\')) {
      inSingleQuote = !inSingleQuote;
      continue;
    }
    if (char === '"' && (i === 0 || line[i - 1] !== '\\')) {
      inDoubleQuote = !inDoubleQuote;
      continue;
    }

    // Skip if inside quotes
    if (inSingleQuote || inDoubleQuote) {
      continue;
    }

    // Count braces and brackets
    if (char === '{' || char === '[') {
      openCount++;
    } else if (char === '}' || char === ']') {
      closeCount++;
    }
  }

  return openCount - closeCount;
}

function formatRange(
  document: vscode.TextDocument,
  range: vscode.Range,
  options: vscode.FormattingOptions
): vscode.TextEdit[] {
  const edits: vscode.TextEdit[] = [];
  const text = document.getText(range);
  const lines = text.split('\n');
  
  const indentSize = options.tabSize || 2;
  const insertSpaces = options.insertSpaces !== false;
  const indentStr = insertSpaces ? ' '.repeat(indentSize) : '\t';

  // First pass: calculate proper indent level for each line
  const indentLevels: number[] = [];
  let parenLevel = 0;    // Level from parentheses ()
  let braceLevel = 0;    // Level from braces {} - tracked but NOT used for indentation

  for (let i = 0; i < lines.length; i++) {
    const trimmedLine = lines[i].trim();

    if (trimmedLine.length === 0) {
      indentLevels[i] = -1; // Skip empty lines
      continue;
    }

    // The indent level for this line is based ONLY on parentheses
    indentLevels[i] = parenLevel;

    // Count brackets on this line
    const parenDiff = countParentheses(trimmedLine);
    const braceDiff = countBraces(trimmedLine);
    
    parenLevel += parenDiff;
    parenLevel = Math.max(0, parenLevel);
    
    braceLevel += braceDiff;
    braceLevel = Math.max(0, braceLevel);
  }

  // Second pass: apply indentation
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    if (indentLevels[i] === -1 || trimmedLine.length === 0) {
      continue;
    }

    const properIndent = indentStr.repeat(indentLevels[i]);
    const currentIndent = line.match(/^\s*/)?.[0] || '';
    const lineIndex = range.start.line + i;

    // Only modify if indentation differs
    if (currentIndent !== properIndent) {
      const startPos = new vscode.Position(lineIndex, 0);
      const endPos = new vscode.Position(lineIndex, currentIndent.length);
      edits.push(vscode.TextEdit.replace(new vscode.Range(startPos, endPos), properIndent));
    }
  }

  return edits;
}

function countBracketsExcludingStrings(line: string): number {
  let openCount = 0;
  let closeCount = 0;
  let inSingleQuote = false;
  let inDoubleQuote = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    // Toggle quote state
    if (char === "'" && (i === 0 || line[i - 1] !== '\\')) {
      inSingleQuote = !inSingleQuote;
      continue;
    }
    if (char === '"' && (i === 0 || line[i - 1] !== '\\')) {
      inDoubleQuote = !inDoubleQuote;
      continue;
    }

    // Skip if inside quotes
    if (inSingleQuote || inDoubleQuote) {
      continue;
    }

    // Count ONLY parentheses () for indentation
    // Ignore curly braces {} and square brackets []
    if (char === '(') {
      openCount++;
    } else if (char === ')') {
      closeCount++;
    }
  }

  return openCount - closeCount;
}
