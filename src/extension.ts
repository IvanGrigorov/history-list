// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const cp = require('child_process')


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('history-list.showList', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		var test = new vscode.ShellExecution('cat (Get-PSReadlineOption).HistorySavePath');
		cp.exec('cat (Get-PSReadlineOption).HistorySavePath',{'shell':'powershell.exe'}, (err: string, stdout: string, stderr: string) => {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			const options = stdout.split('\r\n').reverse();
			if (options.length)  {
				showQuicPick(options);
			}
			if (err) {
				vscode.window.showErrorMessage(err);
			}
		});
	});

	context.subscriptions.push(disposable);
}

async function showQuicPick(options:string []) {
	const result = await vscode.window.showQuickPick(options, {
		placeHolder: 'Select Command',
		onDidSelectItem: item => {
			if (!item.toString()) return;
			vscode.env.clipboard.writeText(item.toString() || '').then(
				() => vscode.window.showInformationMessage('Saved in clipboard')
			);
		}
	});
} 
// This method is called when your extension is deactivated
export function deactivate() {}
