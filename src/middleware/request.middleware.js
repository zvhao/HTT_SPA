"use strict";

const { BadRequestError } = require("../utils/error.util");

const validateResource = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    return next();
  } catch (error) {
    const others = error?.issues?.reduce(
      (obj, i) => (obj = { ...obj, [i.path[1]]: i.message }),
      {}
    );
    throw new BadRequestError("Thiếu dữ liệu", undefined, others);
  }
};

module.exports = {
  validateResource,
};
