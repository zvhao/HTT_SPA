"use strict";

const dayjs = require("dayjs");

const logger = {
  info: (...rest) => {
    return console.log(
      `\x1b[44m[INFO]\x1b[0m \x1b[32m${dayjs().format(
        "DD/MM/YYYY HH:mm:ss"
      )}\x1b[0m `,
      ...rest
    );
  },
  error: (...rest) => {
    return console.log(
      `\x1b[41m[ERROR]\x1b[0m \x1b[91m${dayjs().format(
        "DD/MM/YYYY HH:mm:ss"
      )}\x1b[0m `,
      ...rest
    );
  },
  write: (rest) => {
    return console.log(
      `\x1b[43mREQUEST\x1b[0m \x1b[33m${dayjs().format(
        "DD/MM/YYYY HH:mm:ss"
      )}\x1b[0m `,
      rest
    );
  },
};

module.exports = logger;
