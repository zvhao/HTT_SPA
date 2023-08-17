"use strict";

const PermissionModel = require("../models/Permission.model");
const { toLowerCase } = require("../utils/convert.util");

exports.findPermByName = async (name) => {
  return await PermissionModel.findOne({ name: toLowerCase(name) }).lean();
};

exports.findPermByAlias = async (alias) => {
  return await PermissionModel.findOne({ alias: toLowerCase(alias) }).lean();
};

exports.savePermission = async ({ name, alias, desc }) => {
  return await new PermissionModel({
    name,
    alias,
    desc,
  }).save();
};
