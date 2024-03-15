
/* IMPORT */

import vscode from 'vscode';
import * as Commands from './commands';

/* MAIN */

const activate = (): void => {

  vscode.commands.registerCommand ( 'markdown.todo.toggleDone', Commands.toggleDone );
  vscode.commands.registerCommand ( 'markdown.todo.toggleTodo', Commands.toggleTodo );
  vscode.commands.registerCommand ( 'markdown.todo.decrease', Commands.decrease );
  vscode.commands.registerCommand ( 'markdown.todo.increase', Commands.increase );

};

/* EXPORT */

export {activate};
