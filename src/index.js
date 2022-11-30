#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import parser from './parsers.js';
import getDifference from './getDifference.js';
import formatter from './formatters/index.js';

const getAbsolutePath = (file) => path.resolve(cwd(), file).trim();
const readFile = (file) => fs.readFileSync(getAbsolutePath(file), 'utf-8');
const getFormat = (file) => path.extname(file);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileData1 = readFile(filepath1);
  const fileData2 = readFile(filepath2);

  const fileFormat1 = getFormat(filepath1);
  const fileFormat2 = getFormat(filepath2);

  const data1 = parser(fileData1, fileFormat1);
  const data2 = parser(fileData2, fileFormat2);

  // console.log('format:', formatName);
  // console.log('JSON format:', JSON.stringify(formatName));

  return formatter(getDifference(data1, data2), formatName);
};

export default genDiff;
