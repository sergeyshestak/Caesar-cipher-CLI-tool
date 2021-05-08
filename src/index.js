import { Transform } from "stream";
import fs from "fs";

import { validateArguments, encrypt } from "./utils.js";

const caesarCipher = (commandArguments) => {
  const {
    config: { input, output, shift },
    error,
  } = validateArguments(commandArguments);

  if (error) {
    error && process.stderr.write(`\n${error}\n`);
    process.exit(1);
  }

  const streamRead = fs.createReadStream(input, {
    highWaterMark: 2,
    encoding: "utf8",
  });

  const streamTransform = new Transform({
    highWaterMark: 2,
    decodeStrings: false,
    transform(chunk, encoding, callback) {
      try {
        callback(null, encrypt(chunk, shift));
      } catch (err) {
        callback(err);
      }
    },
  });

  const streamWrite = fs.createWriteStream(output, {
    highWaterMark: 2,
    flags: "a",
  });

  streamRead.pipe(streamTransform).pipe(streamWrite);
  streamWrite.on("finish", () => {
    fs.createWriteStream(output, {
      flags: "a",
    }).write("\n");
  });
};

export default caesarCipher;
