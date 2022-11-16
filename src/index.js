#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */
import { readFileSync } from 'node:fs';
import path from 'path';
import { cwd } from 'process';
import _ from 'lodash';

export default (filepath1, filepath2) => {
  const fileFullPath1 = path.resolve(cwd(), filepath1).trim();
  const fileFullPath2 = path.resolve(cwd(), filepath2).trim();

  const fileData1 = readFileSync(fileFullPath1, 'utf8');
  const fileData2 = readFileSync(fileFullPath2, 'utf8');

  const data1 = JSON.parse(fileData1);
  const data2 = JSON.parse(fileData2);

  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);

  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const getInfoDiff = (obj1, obj2, keys) => {
    const result = keys.map((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (!_.has(obj1, key)) {
        return { key, type: 'added', value: value2 };
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
    console.log('--- getInfoDiff: ', result);
    return result;
  };

  const genDiff = (obj1, obj2, keys) => {
    const infoDiff = getInfoDiff(obj1, obj2, keys);

    const getResult = infoDiff.map((diff) => {
      const typeDiff = diff.type;

      switch (typeDiff) {
        case 'added':
          return { key: diff.value };
        case 'deleted':
          return { key: diff.value };
        case 'changed':
          return (
            { key: diff.value1 },
            { key: diff.value2 });
        case 'unchanged':
          return { key: diff.value };
        default:
          return null;
      }
    });

    return getResult;
  };

  // console.log('---ТИП', typeof genDiff(data1, data2, keys));
  console.log('>>> RESULT', genDiff(data1, data2, sortedKeys));
  return genDiff(data1, data2, sortedKeys);
};
