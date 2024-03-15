
/* IMPORT */

import {diffWordsWithSpace} from 'diff';
import vscode from 'vscode';

/* MAIN */

const Edits = {

  /* API */

  apply: ( textEditor: vscode.TextEditor, edits: vscode.TextEdit[] ): Thenable<boolean> => {

    const uri = textEditor.document.uri;
    const edit = new vscode.WorkspaceEdit ();

    edit.set ( uri, edits );

    return vscode.workspace.applyEdit ( edit );

  },

  makeDiff: ( before: string, after: string, lineNr: number ): vscode.TextEdit[] => {

    if ( before === after ) return [];

    const edits: vscode.TextEdit[] = [];
    const changes = diffWordsWithSpace ( before, after );

    let index = 0;

    for ( const change of changes ) {

      if ( change.added ) {

        const edit = Edits.makeInsert ( change.value, lineNr, index );

        edits.push ( edit );

      } else if ( change.removed ) {

        const edit = Edits.makeDelete ( lineNr, index, index + change.value.length );

        index += change.value.length;

        edits.push ( edit );

      } else {

        index += change.value.length;

      }

    }

    return edits;

  },

  makeDelete: ( lineNr: number, fromCh: number, toCh: number = fromCh ): vscode.TextEdit => {

    const range = new vscode.Range ( lineNr, fromCh, lineNr, toCh );
    const edit = vscode.TextEdit.delete ( range );

    return edit;

  },

  makeInsert: ( insertion: string, lineNr: number, charNr: number ): vscode.TextEdit => {

    const position = new vscode.Position ( lineNr, charNr );
    const edit = vscode.TextEdit.insert ( position, insertion );

    return edit;

  }

};

/* EXPORT */

export default Edits;
