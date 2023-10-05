"use strict";

const { default: mongoose } = require("mongoose");
const ServiceModel = require("../models/Service.model");
const { toLowerCase } = require("../utils/convert.util");
const { ConflictRequestError } = require("../utils/error.util");
const permissionService = require("./service.service");

const roleService = {
  add: async ({
    code,
    name,
    price,
    duration,
    service_types,
    combos,
    courses,
    technicianCommission,
    consultingCommission,
    desc,
  }) => {
    if (await ServiceModel.findOne({ code: toLowerCase(code) })) {
      throw new ConflictRequestError("Code exists");
    }

    return await new ServiceModel({
      code,
      name,
      price,
      duration,
      service_types,
      combos,
      courses,
      technicianCommission,
      consultingCommission,
      desc,
    }).save();
  },
  getAll: async (filters = {}) => {
    const services = await ServiceModel.find().lean();

    return services;
  },
  // getById: async (id) => {
  //   let role = await ServiceModel.findById(id).lean();
  //   // console.log(role);
  //   let permissions = role.permissions.map(
  //     (p) =>
  //       new Promise(async (resolve, reject) => {
  //         try {
  //           resolve(await permissionService.getById(p));
  //         } catch (error) {
  //           reject(error);
  //         }
  //       })
  //   );

  //   permissions = await Promise.all(permissions);

  //   return { ...role, permissions };
  // },

  // delete: async (id) => {
  //   // return await ServiceModel.find().lean();
  //   return true;
  // },
  // update: async (id, data) => {
  //   if (data.name) {
  //     let role = await ServiceModel.findOne({
  //       name: toLowerCase(data.name),
  //     });

  //     if (role && id !== role._id.toString()) {
  //       throw new ConflictRequestError("Name exists");
  //     }
  //   }

  //   return await ServiceModel.findOneAndUpdate(
  //     {
  //       _id: new mongoose.Types.ObjectId(id),
  //     },
  //     { $set: data },
  //     { new: true }
  //   ).lean();
  // },
};

module.exports = roleService;
