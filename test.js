#!/usr/bin/env node
import { readFileSync } from 'node:fs';

const fileData1 = readFileSync('./data/file1.json', 'utf8');
console.log(fileData1);
const fileData2 = readFileSync('./data/file2.json', 'utf8');
console.log(fileData2);

// console.log(typeof (fileData1));
// console.log(typeof (fileData2));
