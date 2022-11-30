#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';
// import { cwd } from 'process';
import parser from './parsers.js';
import getDifference from './getDifference.js';
import formatter from './formatters/index.js';

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath).trim();
const readFile = (filePath) => fs.readFileSync(getAbsolutePath(filePath), 'utf-8');
const getFormat = (fileName) => path.extname(fileName);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileData1 = readFile(filepath1);
  const fileData2 = readFile(filepath2);

  const fileFormat1 = getFormat(filepath1);
  const fileFormat2 = getFormat(filepath2);

  const data1 = parser(fileData1, fileFormat1);
  const data2 = parser(fileData2, fileFormat2);

  return formatter(getDifference(data1, data2), formatName);
};

export default genDiff;
