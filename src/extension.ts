
/* IMPORT */

import * as vscode from 'vscode';
import Consts from './consts';
import Utils from './utils';

/* ACTIVATE */

const activate = function ( context: vscode.ExtensionContext ) {

  context.subscriptions.push (
    vscode.workspace.onDidChangeConfiguration ( Consts.update )
  );

  return Utils.initCommands ( context );

};

/* EXPORT */

export {activate};
