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

const fileJSON1 = getFixturePath('file1.json');
const fileJSON2 = getFixturePath('file2.json');
const fileYML1 = getFixturePath('file1.yml');
const fileYML2 = getFixturePath('file2.yml');
const expectedResult = readFile('outputtest.txt', 'utf8').trim();

test('check genDiff JSON', () => {
  expect(genDiff(fileJSON1, fileJSON2)).toEqual(expectedResult);
});

test('check genDiff YML', () => {
  expect(genDiff(fileYML1, fileYML2)).toEqual(expectedResult);
});