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

// const fileJSON1 = getFixturePath('file1.json');
// const fileJSON2 = getFixturePath('file2.json');
// const fileYML1 = getFixturePath('file1.yml');
// const fileYML2 = getFixturePath('file2.yml');

// const expectedResultStylish = readFile('expectedTestResult_stylish.txt', 'utf8').trim();
// const expectedResultPlain = readFile('expectedTestResult_plain.txt', 'utf8').trim();
// const expectedResultJson = readFile('expectedTestResult_json.txt', 'utf8').trim();

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

// test('check genDiff JSON file --> stylish format', () => {
//   expect(genDiff(fileJSON1, fileJSON2)).toEqual(expectedResultStylish);
// });

// test('check genDiff YML file  --> stylish format', () => {
//   expect(genDiff(fileYML1, fileYML2)).toEqual(expectedResultStylish);
// });

// test('check genDiff JSON file --> plain format', () => {
//   expect(genDiff(fileJSON1, fileJSON2, 'plain')).toEqual(expectedResultPlain);
// });

// test('check genDiff YML file --> plain format', () => {
//   expect(genDiff(fileYML1, fileYML2, 'plain')).toEqual(expectedResultPlain);
// });

// test('check genDiff JSON file --> JSON format', () => {
//   expect(genDiff(fileJSON1, fileJSON2, 'json')).toEqual(expectedResultJson);
// });

// test('check genDiff YML file --> JSON format', () => {
//   expect(genDiff(fileYML1, fileYML2, 'json')).toEqual(expectedResultJson);
// });
