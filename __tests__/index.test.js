/* eslint-disable no-underscore-dangle */
import { test, expect } from '@jest/globals';
// import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');
const expectedResult = readFile('outputtest.txt', 'utf8').trim();

test('check genDiff', () => {
  expect(genDiff(file1, file2)).toEqual(expectedResult);
  // expect(originResult).toEqual(expectedResult);
});

// const filepath1 = '../__fixtures__/testFile1.json';
// const filepath2 = '../__fixtures__/testFile2.json';

// const fileFullPath1 = path.resolve(cwd(), filepath1).trim();
// const fileFullPath2 = path.resolve(cwd(), filepath2).trim();

// const fileData1 = readFileSync(fileFullPath1, 'utf8');
// const fileData2 = readFileSync(fileFullPath2, 'utf8');

// const data1 = JSON.parse(fileData1);
// const data2 = JSON.parse(fileData2);
