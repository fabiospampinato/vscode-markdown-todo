
/* IMPORT */

import vscode from 'vscode';
import {LINE_RE, TODO_BOX_RE, TODO_DONE_RE} from './constants';
import Edits from './edits';
import {getOptions, getSelectionRange, uniq} from './utils';

/* MAIN */

const toggleRules = async ( rules: [regex: RegExp, replacement: string][] ): Promise<void> => {

  const textEditor = vscode.window.activeTextEditor;

  if ( !textEditor ) return;
  if ( textEditor.document.languageId !== 'markdown' ) return;

  const document = textEditor.document;
  const linesNr = uniq ( textEditor.selections.map ( getSelectionRange ).flat ().sort () );
  const lines = linesNr.map ( lineNr => document.lineAt ( lineNr ) );

  if ( !lines.length ) return;

  const edits: vscode.TextEdit[] = [];

  for ( const line of lines ) {

    for ( const [regex, replacement] of rules ) {

      if ( !regex.test ( line.text ) ) continue;

      const lineNextText = line.text.replace ( regex, replacement );

      edits.push ( ...Edits.makeDiff ( line.text, lineNextText, line.lineNumber ) );

      break;

    }

  }

  if ( !edits.length ) return;

  await Edits.apply ( textEditor, edits );

};

const toggleDone = async (): Promise<void> => {

  const options = getOptions ();
  const {bullet, done} = options.symbols;

  await toggleRules ([
    [TODO_DONE_RE, `$1${bullet} [ ] $3`],
    [TODO_BOX_RE, `$1${bullet} [${done}] $3`],
    [LINE_RE, `$1${bullet} [${done}] $3`]
  ]);

};

const toggleTodo = async (): Promise<void> => {

  const options = getOptions ();
  const {bullet} = options.symbols;

  await toggleRules ([
    [TODO_BOX_RE, '$1$3'],
    [TODO_DONE_RE, `$1${bullet} [ ] $3`],
    [LINE_RE, `$1${bullet} [ ] $3`]
  ]);

};

/* EXPORT */

export {toggleDone, toggleTodo};
