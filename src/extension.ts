import { title } from 'process';
import * as vscode from 'vscode';
import { Uri } from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('palette-search.search', async () => {
		
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

export function deactivate() {}
