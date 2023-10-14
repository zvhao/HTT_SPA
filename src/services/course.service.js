"use strict";

const { default: mongoose } = require("mongoose");
const { toLowerCase } = require("../utils/convert.util");
const { ConflictRequestError } = require("../utils/error.util");
const courseModel = require("../models/Course.model");
const ServiceService = require("./service.service");
const ServiceModel = require("../models/Service.model");
const { regexData } = require("../core/fuction.code");

const courseService = {
  add: async ({
    code,
    name,
    package_details,
    imgs,
    duration,
    consultingCommission,
    technicianCommission,
    desc,
    services,
  }) => {
    if (await courseModel.findOne({ code: regexData(code) })) {
      throw new ConflictRequestError("Code exists");
    }
    const course = await new courseModel({
      code,
      name,
      package_details,
      imgs,
      duration,
      consultingCommission,
      technicianCommission,
      desc,
      services,
    }).save();
    return course;
  },
  getAll: async (filters = {}) => {
    const courses = await courseModel.find().lean();
    return await Promise.all(
      courses.map(
        (e) =>
          new Promise(async (resolve, reject) => {
            try {
              resolve(await courseService.getById(e._id));
            } catch (error) {
              reject(error);
            }
          })
      )
    );
  },
  getById: async (id) => {
    let course = await courseModel.findById(id).lean();
    let services = course.services.map(
      (p) =>
        new Promise(async (resolve, reject) => {
          try {
            resolve(await ServiceService.getById(p));
          } catch (error) {
            reject(error);
          }
        })
    );
    services = await Promise.all(services);
    return { ...course, services };
    return course;
  },

  // delete: async (id) => {
  //   // return await courseModel.find().lean();
  //   return true;
  // },
  update: async (id, data) => {
    if (data.code) {
      let role = await courseModel.findOne({
        code: regexData(data.code),
      });

      if (role && id !== role._id.toString()) {
        throw new ConflictRequestError("code exists");
      }
    }

    return await courseModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),
      },
      { $set: data },
      { new: true }
    ).lean();
  },
};

module.exports = courseService;
