import { Command } from "commander";

const program = new Command();

program
  .name("gendiff")
  .description("1-Compares two configuration files and shows a difference.")
  .version("0.0.1")
  .option("-V, --version", "output the version number")
  .option("-h, --help", "display help for command");

program.parse();
