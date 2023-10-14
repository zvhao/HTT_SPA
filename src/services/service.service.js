"use strict";

const { default: mongoose } = require("mongoose");
const ServiceModel = require("../models/Service.model");
const { toLowerCase } = require("../utils/convert.util");
const { ConflictRequestError } = require("../utils/error.util");
const permissionService = require("./service.service");
const { regexData } = require("../core/fuction.code");
const ServiceTypeModel = require("../models/ServiceType.model");

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
    if (await ServiceModel.findOne({ code: regexData(code) })) {
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
    let services = await ServiceModel.find().lean();
    // Lấy danh sách id của các services
    const serviceIds = services.map((service) => service._id);
    // Tìm các ServiceType có trường services chứa các id của services
    const serviceTypes = await ServiceTypeModel.find({
      services: { $in: serviceIds },
    }).lean();
    // Tạo một đối tượng map để lưu trữ các id của ServiceType cho mỗi service
    const serviceTypeMap = {};
    // Duyệt qua danh sách serviceTypes và gán các id vào serviceTypeMap
    serviceTypes.forEach((serviceType) => {
      serviceType.services.forEach((serviceId) => {
        if (!serviceTypeMap[serviceId]) {
          serviceTypeMap[serviceId] = [];
        }
        serviceTypeMap[serviceId].push(serviceType._id);
      });
    });

    services.forEach((service) => {
      const serviceId = service._id;
      if (serviceTypeMap[serviceId]) {
        service.service_types = serviceTypeMap[serviceId].map(
          (serviceTypeId) => {
            const serviceType = serviceTypes.find(
              (type) => type._id.toString() === serviceTypeId.toString()
            );
            return serviceType
          }
        );
      }
    });

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
        code: regexData(data.code),
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
