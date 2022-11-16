#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */
import { readFileSync } from 'node:fs';
import path from 'path';
import { cwd } from 'process';
import _ from 'lodash';

// test

export default (filepath1, filepath2) => {
  const stringify = (value, replacer = ' ', spacesCount = 1) => {
    const iter = (currentValue, depth) => {
      if (typeof currentValue !== 'object' || currentValue === null) {
        return String(currentValue);
      }
      const indentSize = depth * spacesCount;
      const currentIndent = replacer.repeat(indentSize);
      const bracketIndent = replacer.repeat(indentSize - spacesCount);

      const arrayValue = Object.entries(currentValue);
      const lines = arrayValue.map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);
      const result = [
        '{',
        ...lines,
        `${bracketIndent}}`,
      ].join('\n');

      return result;
    };

    return iter(value, 1);
  };
  const fileFullPath1 = path.resolve(cwd(), filepath1).trim();
  const fileFullPath2 = path.resolve(cwd(), filepath2).trim();

  const fileData1 = readFileSync(fileFullPath1, 'utf8');
  const fileData2 = readFileSync(fileFullPath2, 'utf8');

  const data1 = JSON.parse(fileData1);
  const data2 = JSON.parse(fileData2);

  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);

  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  // const getInfoDiff = (obj1, obj2, keys) => {
  //   const result = keys.map((key) => {
  //     const value1 = obj1[key];
  //     const value2 = obj2[key];

  //     if (!_.has(obj1, key)) {
  //       return { key, type: 'added', value: value2 };
  //     }
  //     if (!_.has(obj2, key)) {
  //       return { key, type: 'deleted', value: value1 };
  //     }
  //     if (obj1[key] !== obj2[key]) {
  //       return {
  //         key,
  //         type: 'changed',
  //         value1,
  //         value2,
  //       };
  //     }
  //     return { key, type: 'unchanged', value: value1 };
  //   });
  //   console.log('--- getInfoDiff: ', result);
  //   return result;
  // };

  // =============

  const getInfoDiff = (obj1, obj2, keys) => {
    // const infoDiff = getInfoDiff(obj1, obj2, keys);

    // const cb = (acc, obj) => {
    //   const { key } = obj;
    //   const value1 = obj1[key];
    //   const value2 = obj2[key];

    //   const key1 = String([key]);
    //   const key2 = String([key]);

    //   if (!_.has(obj1, key)) {
    //     acc[key] = value2;
    //     acc.type = 'added';
    //     return acc;
    //   }
    //   if (!_.has(obj2, key)) {
    //     acc[key] = value1;
    //     acc.type = 'deleted';
    //     return acc;
    //   }
    //   if (obj1[key] !== obj2[key]) {
    //     acc[key1] = value1;
    //     acc[key2] = value2;
    //     acc.type = 'changed';
    //     return acc;
    //   }
    //   acc[key] = value1;
    //   acc.type = 'unchanged';
    //   return acc;
    // };
    // const buildObj = infoDiff.reduce(cb, {});
    // console.log('!-!-!-! buildObj', buildObj);

      const result = keys.map((key) => {
        const value1 = obj1[key];
        const value2 = obj2[key];

        const key1 = String([key]);
        const key2 = String([key]);

        const currentResult = {};
        const currentResultChange = {};

      if (!_.has(obj1, key)) {
        currentResult[key] = value2;
        currentResult.type = 'added';
        return currentResult;
      }
      if (!_.has(obj2, key)) {
        currentResult[key] = value1;
        currentResult.type = 'deleted';
        return currentResult;
      }
      if (obj1[key] !== obj2[key]) {
        currentResult[key1] = value1;
        currentResult.type = 'changed';
        currentResultChange[key2] = value2;
        currentResultChange.type = 'changed';
        const res = [currentResult, currentResultChange].flat();
        console.log(`!!!!!!!!!!!!!!!!!!!!!!! changed: ${stringify(res)}`);
        return res;
      }
      currentResult[key] = value1;
      currentResult.type = 'unchanged';
      return currentResult;
    });
    console.log('--- getInfoDiff: ', result);
    return result;
  };

  // =================

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
