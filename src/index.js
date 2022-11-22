#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import _ from 'lodash';
import yaml from 'js-yaml';

const getAbsolutePath = (file) => path.resolve(cwd(), file).trim();
const readFile = (file) => fs.readFileSync(getAbsolutePath(file), 'utf-8');
const getFormat = (file) => path.extname(file).slice(1);

const parser = (fileContent, fileFormat) => {
  switch (fileFormat) {
    case 'json':
      return JSON.parse(fileContent);
    case 'yml':
      return yaml.load(fileContent);
    default:
      return 'error';
  }
};

const genDiff = (filepath1, filepath2) => {
  const fileData1 = readFile(filepath1);
  const fileData2 = readFile(filepath2);

  const formatFile1 = getFormat(filepath1); // .json
  const formatFile2 = getFormat(filepath2); // .yml

  const data1 = parser(fileData1, formatFile1);
  const data2 = parser(fileData2, formatFile2);

  const getInfoDiff = (obj1, obj2) => {
    const keys1 = _.keys(data1);
    const keys2 = _.keys(data2);
    const sortedKeys = _.sortBy(_.union(keys1, keys2));

    const result = sortedKeys.map((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (!_.has(obj1, key)) {
        return { key, type: 'added', value: value2 };
      }
      if (!_.has(obj2, key)) {
        return { key, type: 'deleted', value: value1 };
      }
      if (obj1[key] !== obj2[key]) {
        return { key, type: 'changed', value: getInfoDiff(value1, value2) };
      }
      return { key, type: 'unchanged', value: value1 };
    });
    return result;
  };

  const stringify = (value, spacesCount) => {
    const space = ' ';
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
        const typeDiff = item.type;
        const { value } = item;
        const { key } = item;

        const value1 = object1[key];
        const value2 = object2[key];

        switch (typeDiff) {
          case 'added':
            return `${currentSpace}${signes.plus} ${key}: ${stringify(
              value,
              depth,
            )}`;
          case 'deleted':
            return `${currentSpace}${signes.minus} ${key}: ${stringify(
              value,
              depth,
            )}`;
          case 'changed':
            return [
              `${currentSpace}${signes.minus} ${key}: ${stringify(
                value1,
                depth,
              )}`,
              `${currentSpace}${signes.plus} ${key}: ${stringify(
                value2,
                depth,
              )}`,
            ].join('\n');
          case 'unchanged':
            return `${currentSpace}${signes.emptySpace} ${key}: ${stringify(
              value,
              depth,
            )}`;
          default:
            return null;
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
