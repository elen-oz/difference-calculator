#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import _ from 'lodash';
import parser from './parsers.js';

const getAbsolutePath = (file) => path.resolve(cwd(), file).trim();
const readFile = (file) => fs.readFileSync(getAbsolutePath(file), 'utf-8');
const getFormat = (file) => path.extname(file);

const genDiff = (filepath1, filepath2) => {
  const fileData1 = readFile(filepath1);
  const fileData2 = readFile(filepath2);

  const fileFormat1 = getFormat(filepath1);
  const fileFormat2 = getFormat(filepath2);

  const data1 = parser(fileData1, fileFormat1);
  const data2 = parser(fileData2, fileFormat2);

  const getInfoDiff = (obj1, obj2) => {
    const keys1 = _.keys(obj1);
    const keys2 = _.keys(obj2);
    const sortedKeys = _.sortBy(_.union(keys1, keys2));

    const result = sortedKeys.map((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        return { key, type: 'object', value: getInfoDiff(value1, value2) };
      }

      if (_.isEqual(value1, value2)) {
        return {
          key,
          type: 'unchanged',
          value: value1,
        };
      }
      if (!_.has(obj1, key)) {
        return { key, type: 'added', value: value2 };
      }
      if (!_.has(obj2, key)) {
        return { key, type: 'deleted', value: value1 };
      }
      console.log(`getInfoDiff: key:${key}, value1:${value1}/value2:${value2}`);
      return {
        key,
        type: 'changed',
        value1,
        value2,
      };
    });
    return result;
  };

  const stringify = (value, spacesCount, space) => {
    // const space = ' ';
    const iter = (currentValue, depth) => {
      if (typeof currentValue !== 'object' || currentValue === null) {
        return String(currentValue);
      }
      const indentSize = depth * spacesCount;
      const currentIndent = space.repeat(indentSize);
      const bracketIndent = space.repeat(indentSize - spacesCount);

      const arrayValue = Object.entries(currentValue);
      const lines = arrayValue.map(
        ([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`,
      );
      const result = ['{', ...lines, bracketIndent, '}'].join('\n');

      return result;
    };

    return iter(value, 1);
  };

  const buildReturn = (object1, object2) => {
    const tempObject = getInfoDiff(object1, object2);
    const space = '  ';
    const signes = {
      plus: '+',
      minus: '-',
      emptySpace: ' ',
    };

    const iter = (tree, depth) => {
      const result = tree.map((item) => {
        const currentSpace = space.repeat(depth);
        const signSpace = currentSpace.slice(2);
        const typeDiff = item.type;
        const { value } = item;
        const { key } = item;

        const value1 = object1[key];
        const value2 = object2[key];

        switch (typeDiff) {
          case 'object':
            return `${currentSpace}${key}: ${[
              '{',
              ...iter(value, depth + 1),
              `${currentSpace}}`,
            ].join('\n')}`;
          case 'added':
            return `${signSpace}${signes.plus} ${key}: ${stringify(
              value,
              depth,
              space,
            )}`;
          case 'deleted':
            return `${signSpace}${signes.minus} ${key}: ${stringify(
              value,
              depth,
              space,
            )}`;
          case 'changed':
            console.log('---------------------------------------------------');
            console.log(`buildReturn: key:${key}, value1:${item.value1}/value2:${item.value2}`);

            return [
              `${signSpace}${signes.minus} ${key}: ${stringify(
                item.value1,
                depth,
                space,
              )}`,
              `${signSpace}${signes.plus} ${key}: ${stringify(
                item.value2,
                depth,
                space,
              )}`,
            ].join('\n');
          case 'unchanged':
            return `${signSpace}${
              signes.emptySpace
            } ${key}: ${stringify(value, depth, space)}`;
          default:
            return 'error';
        }
      });

      return result;
    };
    const result = iter(tempObject, 1);

    return ['{', ...result, '}'].join('\n');
  };

  return buildReturn(data1, data2);
};

export default genDiff;

// gendiff __fixtures__/file1.json __fixtures__/file2.json
