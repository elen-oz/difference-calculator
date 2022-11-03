#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */
import { readFileSync } from 'node:fs';
import path from 'path';
import { cwd } from 'process';
import _ from 'lodash';

export default (filepath1, filepath2) => {
  filepath1 = path.resolve(cwd(), filepath1).trim();
  filepath2 = path.resolve(cwd(), filepath2).trim();

  const fileData1 = readFileSync(filepath1, 'utf8');
  const fileData2 = readFileSync(filepath2, 'utf8');

  const data1 = JSON.parse(fileData1);
  const data2 = JSON.parse(fileData2);

  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);

  const keys = _.sortBy(_.union(keys1, keys2));

  const getInfoDiff = (obj1, obj2, keys) => {
    const result = keys.map((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (!_.has(obj1, key)) {
        return { key, type: 'added', value: value1 };
      }
      if (!_.has(obj2, key)) {
        return { key, type: 'deleted', value: value1 };
      }
      if (obj1[key] !== obj2[key]) {
        return {
          key,
          type: 'changed',
          value1,
          value2,
        };
      }
      return { key, type: 'unchanged', value: value1 };
    });

    return result;
  };

  const genDiff = (obj1, obj2, keys) => {
    const infoDiff = getInfoDiff(data1, data2, keys);
    // const result = '';

    // console.log(infoDiff);
    const result = infoDiff.map((diff) => {
      const typeDiff = diff.type;
      switch (typeDiff) {
        case 'added':
          return ` + ${diff.key}: ${diff.value}`;
        case 'deleted':
          return ` - ${diff.key}: ${diff.value}`;
        case 'changed':
          return ` - ${diff.key}: ${diff.value} \n + ${diff.key}: ${diff.value}`;
        case 'unchanged':
          return `   ${diff.key}: ${diff.value}`;
        default:
          return null;
      }
    });

    return result;
  };

  // console.log('---1', getInfoDiff(data1, data2, keys));

  console.log('===', genDiff(data1, data2, keys));
  // console.log(`--- проверка строки: \n вторая строка`);
};
