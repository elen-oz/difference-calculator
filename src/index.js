import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import getDifference from './getDifference.js';
import formatter from './formatters/index.js';

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath).trim();
const readFile = (filePath) => fs.readFileSync(getAbsolutePath(filePath), 'utf-8');
const getFormat = (fileName) => path.extname(fileName).slice(1);

const genDiff = (filepath1, filepath2, formatType = 'stylish') => {
  const fileData1 = readFile(filepath1);
  const fileData2 = readFile(filepath2);

  const fileFormat1 = getFormat(filepath1);
  const fileFormat2 = getFormat(filepath2);

  const data1 = parser(fileData1, fileFormat1);
  const data2 = parser(fileData2, fileFormat2);

  return formatter(getDifference(data1, data2), formatType);
};

export default genDiff;
