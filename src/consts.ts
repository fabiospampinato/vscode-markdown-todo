
/* IMPORT */

import * as _ from 'lodash';
import Config from './config';

/* CONSTS */

const Consts = {

  get () {

    return {
      languageId: 'markdown',
      symbols: {
        bullet: Config.getKey ( 'symbols.bullet' ),
        done: Config.getKey ( 'symbols.done' )
      },
      regexes: {
        line: /^(\s*)([*+-]?\s*)(.*)$/,
        todo: /^(\s*)([*+-]\s+\[[ xX]\]\s*)(.*)$/,
        todoBox: /^(\s*)([*+-]\s+\[ \]\s*)(.*)$/,
        todoDone: /^(\s*)([*+-]\s+\[[xX]\]\s*)(.*)$/
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
