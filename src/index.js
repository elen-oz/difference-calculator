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
  // console.log("keys: ", keys);

  const getInfoDiff = (obj1, obj2, keys) => {
    const result = {};
    for (const key of keys) {
      if (!_.has(obj1, key)) {
        result[key] = 'added';
      } else if (!_.has(obj2, key)) {
        result[key] = 'deleted';
      } else if (obj1[key] !== obj2[key]) {
        result[key] = 'changed';
      } else {
        result[key] = 'unchanged';
      }
    }

    return result;
  };

  const genDiff = (obj1, obj2, keys) => {
    const infoDiff = getInfoDiff(data1, data2, keys);
    const result = ``;

    console.log(infoDiff);

    // switch () {

    // }

    return infoDiff;
  };

  console.log('---1', getInfoDiff(data1, data2, keys));

  console.log('===2', genDiff(data1, data2, keys));
};
