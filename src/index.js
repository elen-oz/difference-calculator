#!/usr/bin/env node
import { readFileSync } from "node:fs";
import path from 'path';
import { cwd } from 'process';

export default (filepath1, filepath2) => {
  filepath1 = path.resolve(cwd(), filepath1).trim();
  filepath2 = path.resolve(cwd(), filepath2).trim();


  console.log("filepath1 ", filepath1);
  console.log("filepath2 ", filepath2);

  // console.log(`Current directory: ${cwd()}`);


  const fileData1 = readFileSync(filepath1, "utf8");
  const fileData2 = readFileSync(filepath2, "utf8");

  const dataParse1 = JSON.parse(fileData1);
  const dataParse2 = JSON.parse(fileData2);

  // console.log("typeof(fileData1)", typeof fileData1);
  // console.log("typeof(fileData2)", typeof fileData2);

  // console.log("dataParse1", dataParse1);
  // console.log("dataParse2", dataParse2);
};
