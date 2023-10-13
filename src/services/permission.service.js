"use strict";

const { default: mongoose } = require("mongoose");
const PermissionModel = require("../models/Permission.model");
const { ConflictRequestError } = require("../utils/error.util");
const {
  findPermByName,
  findPermByAlias,
  savePermission,
} = require("../repositories/permission.resp");
const { regexData } = require("../core/fuction.code");


module.exports = {
  add: async ({ name, alias, desc }) => {
    if (await findPermByName(name)) {
      throw new ConflictRequestError("Name exists");
    }

    if (await findPermByAlias(alias)) {
      throw new ConflictRequestError("Alias exists");
    }

    return await savePermission({ name, alias, desc });
  },
  getAll: async (filters = {}) => {
    return await PermissionModel.find().lean();
  },
  getById: async (id) => {
    return await PermissionModel.findById(id).lean();
  },
  delete: async (id) => {
    // return await PermissionModel.find().lean();
    return true;
  },
  update: async (id, data) => {
    let permission = await findPermByName(data.name);

    if (permission && id !== permission._id.toString()) {
      throw new ConflictRequestError("Name exists");
    }

    permission = await findPermByAlias(data.alias);

    if (permission && id !== permission._id.toString()) {
      throw new ConflictRequestError("Alias exists");
    }

    return await PermissionModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),
      },
      { $set: data },
      { new: true }
    ).lean();
  },
};
