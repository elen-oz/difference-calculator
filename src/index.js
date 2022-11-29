#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import _ from 'lodash';
import parser from './parsers.js';
import formatter from './formatters/getFormat.js';

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

  const buildTree = (obj1, obj2) => {
    const keys1 = _.keys(obj1);
    const keys2 = _.keys(obj2);
    const sortedKeys = _.sortBy(_.union(keys1, keys2));

    return sortedKeys.map((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        return { key, type: 'object', children: buildTree(value1, value2) };
      }
      if (_.isEqual(value1, value2)) {
        return {
          key,
          type: 'unchanged',
          val: value1,
        };
      }
      if (!_.has(obj1, key)) {
        return { key, type: 'added', val: value2 };
      }
      if (!_.has(obj2, key)) {
        return { key, type: 'deleted', val: value1 };
      }
      return {
        key,
        type: 'changed',
        val1: value1,
        val2: value2,
      };
    });
  };

  return formatter(buildTree(data1, data2));
};

export default genDiff;
