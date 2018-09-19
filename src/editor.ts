
/* IMPORT */

import * as _ from 'lodash';
import * as diff from 'diff';
import * as vscode from 'vscode';
import Consts from './consts';

/* EDITOR */

const Editor = {

  isSupported ( textEditor?: vscode.TextEditor ) {

    return textEditor && ( textEditor.document.languageId === Consts.languageId );

  },

  edits: {

    apply ( textEditor: vscode.TextEditor, edits: vscode.TextEdit[] ) {

      const uri = textEditor.document.uri,
            edit = new vscode.WorkspaceEdit ();

      edit.set ( uri, edits );

      return vscode.workspace.applyEdit ( edit );

    },

    /* MAKE */

    makeDiff ( before: string, after: string, lineNr: number = 0 ) {

      if ( before === after ) return;

      const changes = diff.diffWordsWithSpace ( before, after );

      let index = 0;

      return _.filter ( changes.map ( change => {
        if ( change.added ) {
          return Editor.edits.makeInsert ( change.value, lineNr, index );
        } else if ( change.removed ) {
          const edit = Editor.edits.makeDelete ( lineNr, index, index + change.value.length );
          index += change.value.length;
          return edit;
        } else {
          index += change.value.length;
        }
      }));

    },

    makeDelete ( lineNr: number, fromCh: number, toCh: number = fromCh ) {

      const range = new vscode.Range ( lineNr, fromCh, lineNr, toCh ),
            edit = vscode.TextEdit.delete ( range );

      return edit;

    },

    makeInsert ( insertion: string, lineNr: number, charNr: number ) {

      const position = new vscode.Position ( lineNr, charNr ),
            edit = vscode.TextEdit.insert ( position, insertion );

      return edit;

    }

  }

};

/* EXPORT */

export default Editor;
