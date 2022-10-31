#!/usr/bin/env node
import { readFileSync } from "node:fs";

const fileData1 = readFileSync("./data/file1.json");
console.log(fileData1.toString());
const fileData2 = readFileSync("./data/file2.json");
console.log(fileData2.toString());
