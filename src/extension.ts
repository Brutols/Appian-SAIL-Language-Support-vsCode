import * as vscode from 'vscode';
import { activateFormatter } from './formatter';

export function activate(context: vscode.ExtensionContext) {
  console.log('SAIL language extension activated');
  
  // Activate formatter
  activateFormatter(context);
}

export function deactivate() {
  console.log('SAIL language extension deactivated');
}
