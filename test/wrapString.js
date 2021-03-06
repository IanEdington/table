/* eslint-disable max-nested-callbacks */

import {
  expect
} from 'chai';
import chalk from 'chalk';
import wrapString from '../src/wrapString';

describe('wrapString', () => {
  context('subject is a plain text string', () => {
    context('subject is lesser than the chunk size', () => {
      it('returns subject in a single chunk', () => {
        expect(wrapString('aaa', 3)).to.deep.equal(['aaa']);
      });
    });
    context('subject is larger than the chunk size', () => {
      it('returns subject sliced into multiple chunks', () => {
        expect(wrapString('aaabbbc', 3)).to.deep.equal(['aaa', 'bbb', 'c']);
      });
    });
    context('a chunk starts with a space', () => {
      it('adjusts chunks to offset the space', () => {
        expect(wrapString('aaa   bbb   ccc', 3)).to.deep.equal(['aaa', 'bbb', 'ccc']);
      });
    });
  });
  context('subject string contains ANSI escape codes', () => {
    describe('subject is lesser than the chunk size', () => {
      it.skip('returns subject in a single chunk', () => {
        expect(wrapString(chalk.red('aaa'), 3)).to.deep.equal([
          '\u001B[31m\u001B[31m\u001B[31m\u001B[31m\u001B[31maaa\u001B[39m'
        ]);
      });
    });
    describe('subject is larger than the chunk size', () => {
      it.skip('returns subject sliced into multiple chunks', () => {
        expect(wrapString(chalk.red('aaabbbc'), 3)).to.deep.equal([
          '\u001B[31m\u001B[31m\u001B[31m\u001B[31m\u001B[31maaa\u001B[39m',
          '\u001B[31m\u001B[31m\u001B[31m\u001B[31m\u001B[31mbbb\u001B[39m',
          '\u001B[31m\u001B[31m\u001B[31m\u001B[31m\u001B[31mc\u001B[39m'
        ]);
      });
    });
  });
});
