"use strict";

const { default: mongoose } = require("mongoose");
const { toLowerCase } = require("../utils/convert.util");
const { ConflictRequestError } = require("../utils/error.util");
const ComboModel = require("../models/Combo.model");
const ServiceModel = require("../models/Service.model");
const serviceService = require("./service.service");

const ComboService = {
  add: async ({ code, name, services, desc }) => {
    if (await ComboModel.findOne({ code: code.toLowerCase() })) {
      throw new ConflictRequestError("Code exists");
    }
    const combo = await new ComboModel({
      code,
      name,
      services,
      desc,
    }).save();

    if (Array.isArray(services) && services.length > 0) {
      const serviceIds = services.filter(
        (service) => typeof service === "string"
      );
      await ServiceModel.updateMany(
        { _id: { $in: serviceIds } },
        { $push: { combos: combo._id } }
      );
    }
    return combo;
  },
  getAll: async (filters = {}) => {
    const Combos = await ComboModel.find().lean();
    return await Promise.all(
      Combos.map(
        (e) =>
          new Promise(async (resolve, reject) => {
            try {
              resolve(await ComboService.getById(e._id));
            } catch (error) {
              reject(error);
            }
          })
      )
    );
  },
  getById: async (id) => {
    let combo = await ComboModel.findById(id).lean();
    let services = combo.services.map(
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
    return { ...combo, services };
  },

  // delete: async (id) => {
  //   // return await ComboModel.find().lean();
  //   return true;
  // },
  update: async (id, data) => {
    if (data.code) {
      let rs = await ComboModel.findOne({
        code: toLowerCase(data.code),
      });

      if (rs && id !== rs._id.toString()) {
        throw new ConflictRequestError("code exists");
      }
    }

    return await ComboModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),
      },
      { $set: data },
      { new: true }
    ).lean();
  },
};

module.exports = ComboService;
