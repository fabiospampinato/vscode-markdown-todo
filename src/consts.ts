
/* IMPORT */

import * as _ from 'lodash';
import Config from './config';

/* CONSTS */

const Consts = {

  get () {

    const bullet = Config.getKey ( 'symbols.bullet' )
    
    const done = Config.getKey ( 'symbols.done' )

    return {
      languageId: 'markdown',
      symbols: {
        bullet,
        done
      },
      regexes: {
        line: /^(\s*)([*+-]?\s*)(.*)$/,
        todo: new RegExp(`^(\\s*)([*+-]\\s+\\[${bullet}\\]\\s*)(.*)$`),
        todoBox: /^(\s*)([*+-]\s+\[ \]\s*)(.*)$/,
        todoDone: new RegExp(`^(\\s*)([*+-]\\s+\\[[${done}]\\]\\s*)(.*)$`)
      }
    };

  },

  update () {

    _.merge ( Consts, Consts.get () );

  }

};

Consts.update ();

type IConsts = typeof Consts & ReturnType<typeof Consts.get>;

/* EXPORT */

export default Consts as IConsts;
