
/* IMPORT */

import {getConfig} from 'vscode-extras';
import type {Options} from './types';

/* MAIN */

const getOptions = (): Options => {

  const config = getConfig ( 'markdown.todo' );
  const symbolBullet = isString ( config?.symbols?.todo ) ? config.symbols.todo : '-';
  const symbolDone = isString ( config?.symbols?.done ) ? config.symbols.done : 'x';

  return { symbols: { bullet: symbolBullet, done: symbolDone } };

};

const isString = ( value: unknown ): value is string => {

  return typeof value === 'string';

};

const uniq = <T> ( values: T[] ): T[] => {

  return Array.from ( new Set ( values ) );

};

/* EXPORT */

export {getOptions, isString, uniq};
