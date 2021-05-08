import { Command } from "commander/esm.mjs";

import { CLI_COMMANDS, CLI_COMMANDS_SHORTCUT } from "./src/constants.js";
import caesarCipher from "./src/index.js";

const program = new Command();

program
  .option(
    `-${CLI_COMMANDS_SHORTCUT.INPUT}, --${CLI_COMMANDS.INPUT} <value>`,
    "path to input file",
  )
  .option(
    `-${CLI_COMMANDS_SHORTCUT.OUTPUT}, --${CLI_COMMANDS.OUTPUT} <value>`,
    "path to output file",
  )
  .option(
    `-${CLI_COMMANDS_SHORTCUT.SHIFT}, --${CLI_COMMANDS.SHIFT} <value>`,
    "a shift of caesar cipher",
  )
  .option(
    `-${CLI_COMMANDS_SHORTCUT.ACTION}, --${CLI_COMMANDS.ACTION} <value>`,
    "an action encode/decode",
  );

program.parse(process.argv);
const options = program.opts();

caesarCipher(options);
