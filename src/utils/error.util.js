"use strict";

const { ReasonPhrases, StatusCodes } = require("../core");

class ErrorResponse extends Error {
  constructor(message, status, others = {}) {
    super(message);
    this.status = status;
    this.others = others;
  }
}

class NotFoundRequestError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.NOT_FOUND,
    statusCode = StatusCodes.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}

class InternalServerRequestError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.INTERNAL_SERVER_ERROR,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message, statusCode);
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.BAD_REQUEST,
    statusCode = StatusCodes.BAD_REQUEST,
    others = {}
  ) {
    super(message, statusCode, others);
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.CONFLICT,
    statusCode = StatusCodes.CONFLICT
  ) {
    super(message, statusCode);
  }
}

class ForbiddenRequestError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.FORBIDDEN,
    statusCode = StatusCodes.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}

class UnauthorizedRequestError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.UNAUTHORIZED,
    statusCode = StatusCodes.UNAUTHORIZED
  ) {
    super(message, statusCode);
  }
}

class RequestTimeoutError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.REQUEST_TIMEOUT,
    statusCode = StatusCodes.REQUEST_TIMEOUT
  ) {
    super(message, statusCode);
  }
}

module.exports = {
  NotFoundRequestError,
  InternalServerRequestError,
  ErrorResponse,
  BadRequestError,
  ConflictRequestError,
  ForbiddenRequestError,
  UnauthorizedRequestError,
  RequestTimeoutError,
};
