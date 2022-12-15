// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { title } from 'process';
import * as vscode from 'vscode';
import { Uri } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "palette-search" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('palette-search.search', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		
		const searchQuery = await vscode.window.showInputBox({
			title: 'Palette Search',
			placeHolder: 'Enter the search term',
		});

		const config = vscode.workspace.getConfiguration('palette-search');
		const searchEngine = config.get('searchEngine');

		let searchURL;
		const urls = {
			Google: 'https://www.google.com/search?q=',
			DuckDuckGo: 'https://duckduckgo.com/?q=',
			Bing: 'https://www.bing.com/search?q='
		};
		Object.keys(urls).forEach(el => {
			if (el === searchEngine) {
				searchURL = urls[el];
			}
		});
		
		if (searchQuery !== undefined) {
			searchURL = searchURL + searchQuery;
			vscode.env.openExternal(Uri.parse(searchURL));
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
