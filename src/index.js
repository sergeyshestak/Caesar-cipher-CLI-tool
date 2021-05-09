import { Transform } from "stream";
import fs from "fs";

import { validateArguments, encrypt } from "./utils.js";

const caesarCipher = async (commandArguments) => {
  const { input, output, shift } = await validateArguments(commandArguments);

  const streamRead = input
    ? fs.createReadStream(input, {
        highWaterMark: 2,
      })
    : process.stdin;
  streamRead.setEncoding("utf8");

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

  const streamWrite = output
    ? fs.createWriteStream(output, {
        highWaterMark: 2,
        flags: "a",
      })
    : process.stdout;

  streamRead.pipe(streamTransform).pipe(streamWrite);
  streamWrite.on("finish", () => {
    fs.createWriteStream(output, {
      flags: "a",
    }).write("\n");
  });
};

export default caesarCipher;
