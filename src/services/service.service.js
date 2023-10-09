"use strict";

const { default: mongoose } = require("mongoose");
const ServiceModel = require("../models/Service.model");
const { toLowerCase } = require("../utils/convert.util");
const { ConflictRequestError } = require("../utils/error.util");
const permissionService = require("./service.service");

const serviceService = {
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
  getById: async (id) => {
    return await ServiceModel.findById(id).lean();
  },

  // delete: async (id) => {
  //   // return await ServiceModel.find().lean();
  //   return true;
  // },
  update: async (id, data) => {
    if (data.code) {
      let role = await ServiceModel.findOne({
        code: toLowerCase(data.code),
      });

      if (role && id !== role._id.toString()) {
        throw new ConflictRequestError("code exists");
      }
    }

    return await ServiceModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),
      },
      { $set: data },
      { new: true }
    ).lean();
  },
};

module.exports = serviceService;
