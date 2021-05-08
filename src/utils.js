import { ACTION_TYPES } from "./constants.js";

export const validateArguments = ({ input, output, shift, action }) => {
  const validatedConfig = {
    config: {
      input,
      output,
    },
  };

  if (shift === undefined || shift === null) {
    validatedConfig.error = "Shift argument required.";
    return validatedConfig;
  } else if (isNaN(Number(shift))) {
    validatedConfig.error = "Shift must be a number.";
    return validatedConfig;
  } else {
    validatedConfig.config.shift = 26 + (Number(shift) % 26);
  }

  if (action === undefined || action === null) {
    validatedConfig.error = "Action argument required.";
    return validatedConfig;
  } else if (action !== ACTION_TYPES.DECODE && action !== ACTION_TYPES.ENCODE) {
    validatedConfig.error = "Action argument must take encode/decode type.";
    return validatedConfig;
  } else {
    validatedConfig.config.action = action;
  }

  if (action === ACTION_TYPES.DECODE) {
    validatedConfig.config.shift = 26 - validatedConfig.config.shift;
  }

  return validatedConfig;
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
