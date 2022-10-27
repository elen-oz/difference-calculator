#!/usr/bin/env node
import { Command } from "commander";
const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("0.0.1", "-V, --version", "output the version number")
  .helpOption("-h, --help", "display help for command");

program.parse(process.argv);

const options = program.opts();
if (options.version) console.log(`${options.version}`);
if (options.helpOption) console.log(`${options.helpOption}`);


console.log("DONE!");
