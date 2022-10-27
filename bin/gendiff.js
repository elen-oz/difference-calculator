#!/usr/bin/env node
import { Command } from "commander";
const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("0.0.1")
  .option("-V, --version", "output the version number 1")
  .option("-h, --help", "display help for command 1");

// program.parse(process.argv);

// const options = program.opts();
// if (options.version) console.log(`${options.version}`);
// if (options.help) console.log(`${options.help}`);



program.command('gendiff')
// .option("-V, --version", "output the version number")
// .option("-h, --help", "display help for command")
.action((str, options) => {
  const limit = options.help ? 1 : undefined;
  console.log(str.split(options.version, limit));
});

program.parse();

console.log("DONE!");
