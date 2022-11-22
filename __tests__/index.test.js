import { readFileSync } from 'node:fs';
import path from 'path';
import { cwd } from 'process';
import genDiff from '../src/index.js';

// const test1 = {
//   1: 'one',
//   2: 'two',
//   3: 'three',
// };

// const test2 = {
//   1: 'ONE',
//   3: 'three',
//   4: 'four',
// };

const filepath1 = '../__fixtures__/testFile1.json';
const filepath2 = '../__fixtures__/testFile2.json';
const filepath3 = '../__fixtures__/outputtest.txt';

const fileFullPath1 = path.resolve(cwd(), filepath1).trim(); // создается путь
const fileFullPath2 = path.resolve(cwd(), filepath2).trim(); // из текущ-й дир-ии в абсолютный
const fileFullPath3 = path.resolve(cwd(), filepath3).trim();

const fileData1 = readFileSync(fileFullPath1, 'utf8'); // читает файл
const fileData2 = readFileSync(fileFullPath2, 'utf8');
const fileData3 = readFileSync(fileFullPath3, 'utf8');

const data1 = JSON.parse(fileData1); // преобразует текст в соотв тип данных
const data2 = JSON.parse(fileData2);
const data3 = JSON.parse(fileData3);

const expectedResult = data3;
const originResult = genDiff(data1, data2);

// let outputText = "{
//   - follow: false
//     host: hexlet.io
//   - proxy: 123.234.53.22
//   - timeout: 50
//   + timeout: 20
//   + verbose: true
// }";

test('check genDiff', () => {
  expect(originResult).toEqual(expectedResult);
});
