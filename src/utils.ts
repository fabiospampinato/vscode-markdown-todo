
/* IMPORT */

import vscode from 'vscode';
import {getConfig} from 'vscode-extras';
import type {Options} from './types';

/* MAIN */

const getOptions = (): Options => {

  const config = getConfig ( 'markdown.todo' );
  const symbolBullet = isString ( config?.symbols?.todo ) ? config.symbols.todo : '-';
  const symbolDone = isString ( config?.symbols?.done ) ? config.symbols.done : 'x';

  return { symbols: { bullet: symbolBullet, done: symbolDone } };

};

const getRangeBetween = ( start: number, end: number ): number[] => {

  if ( start > end ) return getRangeBetween ( end, start );

  const range: number[] = [];

  for ( let i = start; i <= end; i++ ) {

    range.push ( i );

  }

  return range;

};

const getSelectionRange = ( selection: vscode.Selection ): number[] => {

  return getRangeBetween ( selection.start.line, selection.end.line );

};

const isString = ( value: unknown ): value is string => {

  return typeof value === 'string';

};

const uniq = <T> ( values: T[] ): T[] => {

  return Array.from ( new Set ( values ) );

};

/* EXPORT */

export {getOptions, getRangeBetween, getSelectionRange, isString, uniq};
