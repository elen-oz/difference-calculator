#!/usr/bin/env node
import { readFileSync } from 'node:fs';

// const fileData1 = readFileSync('./data/file1.json', 'utf8');
// console.log(fileData1);
// const fileData2 = readFileSync('./data/file2.json', 'utf8');
// console.log(fileData2);

// console.log(typeof (fileData1));
// console.log(typeof (fileData2));

const primitives = {
  string: 'value',
  boolean: true,
  number: 5,
  float: 1.25,
};

const nested = {
  string: 'value',
  boolean: true,
  number: 5,
  float: 1.25,
  object: {
    5: 'number',
    1.25: 'float',
    null: 'null',
    true: 'boolean',
    value: 'string',
    nested: {
      boolean: true,
      float: 1.25,
      string: 'value',
      number: 5,
      null: null,
    },
  },
};

const cases = [
  [undefined, undefined, 0],
  [' ', undefined, 1],
  ['|-', 1, 2],
  ['|-', 2, 3],
  [' ', 3, 4],
  ['...', undefined, 5],
];

const test = [
  { follow: false, type: 'deleted' },
  { host: 'hexlet.io', type: 'unchanged' },
  { proxy: '123.234.53.22', type: 'deleted' },
  [
    { timeout: 50, type: 'changed' },
    { timeout: 20, type: 'changed' }
  ],
  { verbose: true, type: 'added' }
];

const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return String(currentValue);
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const arrayValue = Object.entries(currentValue);
    console.log('--- arrayValue: ', arrayValue);
    const lines = arrayValue.map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);
    console.log('=== lines: ', lines);
    const result = [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');

    return result;
  };

  return iter(value, 1);
};

// primitives, nested, cases

// console.log('primitives: ', stringify(primitives));
// console.log('--------------');
// console.log('nested: ', stringify(nested));
// console.log('=================');
// console.log('cases: ', stringify(cases));
// console.log('///');
console.log('test: ', stringify(test));
