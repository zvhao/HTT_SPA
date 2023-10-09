"use strict";

const { default: mongoose } = require("mongoose");
const { toLowerCase } = require("../utils/convert.util");
const { ConflictRequestError } = require("../utils/error.util");
const permissionService = require("./service.service");
const ServiceTypeModel = require("../models/ServiceType.model");
const serviceService = require("./service.service");

const ServiceTypeService = {
  add: async ({ code, name, services, desc }) => {
    if (await ServiceTypeModel.findOne({ code: toLowerCase(code) })) {
      throw new ConflictRequestError("Code exists");
    }

    return await new ServiceTypeModel({
      code,
      name,
      services,
      desc,
    }).save();
  },
  getAll: async (filters = {}) => {
    const serviceTypes = await ServiceTypeModel.find().lean();
    return await Promise.all(
      serviceTypes.map(
        (e) =>
          new Promise(async (resolve, reject) => {
            try {
              resolve(await ServiceTypeService.getById(e._id));
            } catch (error) {
              reject(error);
            }
          })
      )
    );

    // return serviceTypes;
  },
  getById: async (id) => {
    let serviceType = await ServiceTypeModel.findById(id).lean();
    let services = serviceType.services.map(
      (p) =>
        new Promise(async (resolve, reject) => {
          try {
            resolve(await serviceService.getById(p));
          } catch (error) {
            reject(error);
          }
        })
    );
    services = await Promise.all(services);
    return { ...serviceType, services };
  },

  // delete: async (id) => {
  //   // return await ServiceTypeModel.find().lean();
  //   return true;
  // },
  update: async (id, data) => {
    if (data.code) {
      let role = await ServiceTypeModel.findOne({
        code: toLowerCase(data.code),
      });

      if (role && id !== role._id.toString()) {
        throw new ConflictRequestError("code exists");
      }
    }

    return await ServiceTypeModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),
      },
      { $set: data },
      { new: true }
    ).lean();
  },
};

module.exports = ServiceTypeService;
