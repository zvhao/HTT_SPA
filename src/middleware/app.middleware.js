"use strict";

const { ReasonPhrases, StatusCodes } = require("../core");
const { NotFoundRequestError } = require("../utils/error.util");
const { logger } = require("../utils");
const _ = require("lodash");

exports.catchError404ResourceNotFound = (_req, _res, next) => {
  const error = new NotFoundRequestError("Resource Not Found!");
  return next(error);
};

exports.catchErrorIntervalServer = (error, _req, res, _next) => {
  logger.error(error);
  const statusCode = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message || ReasonPhrases.INTERNAL_SERVER_ERROR;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: message,
    others_message: _.isEmpty(error.others) ? null : error.others,
    exception: error.stack,
  });
};
