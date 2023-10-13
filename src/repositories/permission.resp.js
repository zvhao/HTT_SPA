"use strict";

const { regexData } = require("../core/fuction.code");
const PermissionModel = require("../models/Permission.model");
const { toLowerCase } = require("../utils/convert.util");

exports.findPermByName = async (name) => {
  return await PermissionModel.findOne({ name: regexData(name) }).lean();
};

exports.findPermByAlias = async (alias) => {
  return await PermissionModel.findOne({ alias: regexData(alias) }).lean();
};

exports.savePermission = async ({ name, alias, desc }) => {
  return await new PermissionModel({
    name,
    alias,
    desc,
  }).save();
};
