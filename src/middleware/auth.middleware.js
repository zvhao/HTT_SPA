"use strict";

const { default: mongoose } = require("mongoose");
const ownerService = require("../services/owner.service");
const staffService = require("../services/staff.service");

const {
  UnauthorizedRequestError,
  ForbiddenRequestError,
} = require("../utils/error.util");

const Headers = {
  CLIENT_ID: "x-client-id",
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

const authentication = async (req, res, next) => {
  const clientId = req.headers[Headers.CLIENT_ID];

  if (!clientId) {
    throw new UnauthorizedRequestError(
      `Missing headers \`${Headers.CLIENT_ID}\``
    );
  }

  if (!mongoose.isValidObjectId(clientId)) {
    throw new UnauthorizedRequestError(`\`${Headers.CLIENT_ID}\` unvalid`);
  }

  const user = await ownerService.getById(clientId);

  if (!user) {
    throw new UnauthorizedRequestError(`Plz register`);
  }

  req.userRole = user.role;

  next();
};

const checkPermission = (permission) => async (req, res, next) => {
  const role = req.userRole;

  if (typeof role !== "object" || Object.keys(role).length === 0) {
    throw new ForbiddenRequestError("Not allowed!");
  }
  // console.log(role.permissions);
  // console.log(permission);
  role.permissions.map((p) => {
    if (p.alias === permission) {
      // console.log(p.alias);
      return next();
    }
  });

  // throw new ForbiddenRequestError("Not allowed!");
};

module.exports = {
  authentication,
  checkPermission,
};
