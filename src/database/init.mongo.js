"use strict";

const mongoose = require("mongoose");
const env = require("../../config/env");
const { logger } = require("../utils");

let instance = null;

const connect = () => {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });

  mongoose
    .connect(env.MONGO_URI)
    .then((_) => logger.info("Connected mongodb success."))
    .catch((error) => logger.error("Error connect mongodb:", error));
};

const getInstance = () => {
  if (!instance) {
    instance = connect();
  }

  return instance;
};

const instanceMongodb = getInstance();

module.exports = instanceMongodb;
