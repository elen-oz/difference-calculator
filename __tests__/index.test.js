/* eslint-disable no-underscore-dangle */
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const tests = [
  ['file1.json', 'file2.json', 'stylish', 'expectedTestResult_stylish.txt'],
  ['file1.yml', 'file2.yml', 'stylish', 'expectedTestResult_stylish.txt'],
  ['file1.json', 'file2.json', 'plain', 'expectedTestResult_plain.txt'],
  ['file1.json', 'file2.json', 'json', 'expectedTestResult_json.txt'],
];

test.each(tests)('Compare data', (data1, data2, format, expectedResult) => {
  const firstData = getFixturePath(data1);
  const secondData = getFixturePath(data2);
  const finalResult = genDiff(firstData, secondData, format);
  const expectedOutcome = readFile(expectedResult);
  expect(finalResult).toEqual(expectedOutcome);
});
