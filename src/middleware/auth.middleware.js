"use strict";

const { default: mongoose } = require("mongoose");
const ownerService = require("../services/owner.service");
const staffService = require("../services/staff.service");
const { decodeToken } = require("../core/fuction.code");

const {
  UnauthorizedRequestError,
  ForbiddenRequestError,
} = require("../utils/error.util");

const Headers = {
  CLIENT_TOKEN: "x-client-id",
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

const authentication = async (req, res, next) => {
  const data = req.headers[Headers.CLIENT_TOKEN]
  
  if (!data) {
    throw new UnauthorizedRequestError(
      `Missing headers \`${Headers.CLIENT_TOKEN}\``
    );
  }

  try {
    var decoded = decodeToken(data);
    if (decoded.message) {
      // console.log(decoded.message);
      throw new UnauthorizedRequestError(decoded.message);
    }
  } catch (error) {
    throw new UnauthorizedRequestError("token invalid");
  }

  if (!mongoose.isValidObjectId(decoded.id)) {
    throw new UnauthorizedRequestError(`\`${decoded.id}\` invalid`);
  }

  if (decoded.role !== null) {
    if (decoded.role == "owner") {
      var user = await ownerService.getById(decoded.id);
    } else if (decoded.role == "staff") {
      var user = await staffService.getById(decoded.id);
    } else {
      throw new ForbiddenRequestError(`Not allowed!`);
    }
  }

  if (!user) {
    throw new UnauthorizedRequestError(`Plz register`);
  }
  req.dataAccount = decoded;

  req.userRole = user.role;

  next();
};

const checkPermission = (permission) => async (req, res, next) => {
  const role = req.userRole;
  const dataAccount = req.dataAccount;

  if (typeof role !== "object" || Object.keys(role).length === 0) {
    throw new ForbiddenRequestError("Not allowed!");
  }
  let hasPermission = false;
  role.permissions.map((p) => {
    if (p.alias === permission) {
      hasPermission = true;
    }
  });
  if (hasPermission) {
    req.dataAccount = dataAccount;
    // console.log(dataAccount);
    return next();
  } else {
    throw new ForbiddenRequestError("Not allowed!");
  }
};

module.exports = {
  authentication,
  checkPermission,
};
