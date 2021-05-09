import { stat } from "fs/promises";

import { ACTION_TYPES } from "./constants.js";

export const validateArguments = async ({ input, output, shift, action }) => {
  input !== undefined &&
    input !== null &&
    (await tryToAccessTheFile(input, "input"));
  output !== undefined &&
    output !== null &&
    (await tryToAccessTheFile(output, "output"));
  const validatedConfig = {
    input,
    output,
  };

  if (shift === undefined || shift === null) {
    process.stderr.write("\nShift argument required.\n");
    process.exit(1);
  } else if (isNaN(Number(shift))) {
    process.stderr.write("\nShift must be a number.\n");
    process.exit(1);
  } else {
    validatedConfig.shift = 26 + (Number(shift) % 26);
  }

  if (action === undefined || action === null) {
    process.stderr.write("\nAction argument required.\n");
    process.exit(1);
  } else if (action !== ACTION_TYPES.DECODE && action !== ACTION_TYPES.ENCODE) {
    process.stderr.write("\nAction argument must take encode/decode type.\n");
    process.exit(1);
  } else {
    validatedConfig.action = action;
  }

  if (action === ACTION_TYPES.DECODE) {
    validatedConfig.shift = 26 - validatedConfig.shift;
  }

  return validatedConfig;
};

const tryToAccessTheFile = async (path, type) => {
  try {
    const fileStat = await stat(path);
    if (!fileStat.isFile()) {
      process.stderr.write(`\nCannot access ${type} file.\n`);
      process.exit(2);
    }
  } catch (err) {
    process.stderr.write(`\nCannot access ${type} file.\n`);
    process.exit(2);
  }
};

const getNewChar = (char, shift) => {
  const charCode = char.charCodeAt();
  const formatedShift = shift % 26;
  const isLetterOfLowerReg = charCode >= 97 && charCode <= 122;
  const isLetterOfUpperReg = charCode >= 65 && charCode <= 90;
  let newCharCode = charCode + formatedShift;

  if (!isLetterOfLowerReg && !isLetterOfUpperReg) {
    newCharCode = charCode;
  } else if (
    (isLetterOfLowerReg && newCharCode > 122) ||
    (isLetterOfUpperReg && newCharCode > 90)
  ) {
    newCharCode -= 26;
  } else if (
    (isLetterOfLowerReg && newCharCode < 97) ||
    (isLetterOfUpperReg && newCharCode < 65)
  ) {
    newCharCode += 26;
  }

  return String.fromCharCode(newCharCode);
};

export const encrypt = (str, shift) => {
  return str
    .split("")
    .map((char) => getNewChar(char, shift))
    .join("");
};
