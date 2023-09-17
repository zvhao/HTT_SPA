"use strict";

const { default: mongoose } = require("mongoose");
const RoleModel = require("../models/Role.model");
const { toLowerCase } = require("../utils/convert.util");
const { ConflictRequestError } = require("../utils/error.util");
const permissionService = require("./permission.service");

const roleService = {
  add: async ({ name, desc, permissions }) => {
    if (await RoleModel.findOne({ name: toLowerCase(name) })) {
      throw new ConflictRequestError("Name exists");
    }

    return await new RoleModel({
      name,
      desc,
      permissions,
    }).save();
  },
  getAll: async (filters = {}) => {
    const roles = await RoleModel.find().lean();

    return await Promise.all(
      roles.map(
        (r) =>
          new Promise(async (resolve, reject) => {
            try {
              resolve(await roleService.getById(r._id));
            } catch (error) {
              reject(error);
            }
          })
      )
    );
  },
  getById: async (id) => {
    let role = await RoleModel.findById(id).lean();
    // console.log(role);
    let permissions = role.permissions.map(
      (p) =>
        new Promise(async (resolve, reject) => {
          try {
            resolve(await permissionService.getById(p));
          } catch (error) {
            reject(error);
          }
        })
    );

    permissions = await Promise.all(permissions);

    return { ...role, permissions };
  },

  
  delete: async (id) => {
    // return await RoleModel.find().lean();
    return true;
  },
  update: async (id, data) => {
    if (data.name) {
      let role = await RoleModel.findOne({
        name: toLowerCase(data.name),
      });

      if (role && id !== role._id.toString()) {
        throw new ConflictRequestError("Name exists");
      }
    }

    return await RoleModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),
      },
      { $set: data },
      { new: true }
    ).lean();
  },
};

module.exports = roleService;
