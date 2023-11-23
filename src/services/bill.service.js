"use trict";

const BookingModel = require("../models/Booking.model");
const StaffModel = require("../models/Staff.model");
const CustomerModel = require("../models/Customer.model");
const ServiceModel = require("../models/Service.model");
const ComboModel = require("../models/Combo.model");
const CourseModel = require("../models/Course.model");
const BranchModel = require("../models/Branch.model");
const BillModel = require("../models/Bill.model");

const {
  ConflictRequestError,
  NotFoundRequestError,
  BadRequestError,
} = require("../utils/error.util");
const { findStaffById } = require("../repositories/staff.resp");

const billService = {
  add: async ({
    code,
    bookingInfomation,
    bookingTime,
    branch,
    totalPayment,
    counselorInfomation,
    paymentInformation,
    paymentMethods,
  }) => {
    let data = {
      code,
      bookingInfomation,
      bookingTime,
      branch,
      totalPayment,
      counselorInfomation,
      paymentInformation,
      paymentMethods,
    };
    const res = await BillModel(data).save();
    return res;
  },
  getAll: async (dataAccount, filters = {}) => {
    if (dataAccount !== null && dataAccount.role === "staff") {
      const manager = await findStaffById(dataAccount.id);
      filters.branch = manager.branch;
    }
    const allBills = await BillModel.find(filters).lean();
    return allBills;
    // return await Promise.all(
    //   allBills.map(
    //     (u) =>
    //       new Promise(async (resolve, reject) => {
    //         try {
    //           resolve(await billService.getById(u._id));
    //         } catch (error) {
    //           reject(error);
    //         }
    //       })
    //   )
    // );
  },

  getById: async (id) => {
    let booking = await BillModel.findById(id).lean();
    let technician = {};
    let account = {};
    if (booking.technician !== "") {
      technician = await StaffModel.findById(booking.technician);
    }
    if (booking.account !== "") {
      account = await CustomerModel.findById(booking.account);
    }
    if (booking.branch !== "") {
      booking.branch = await BranchModel.findById(booking.branch);
    }

    const services = [];

    for (const serviceId of booking.services) {
      // Kiểm tra model tương ứng dựa trên ID
      const service = await ServiceModel.findById(serviceId);
      const combo = await ComboModel.findById(serviceId);
      const course = await CourseModel.findById(serviceId);

      // Kiểm tra và đưa dữ liệu vào mảng chi tiết
      if (service) {
        services.push(service);
      } else if (combo) {
        services.push(combo);
      } else if (course) {
        services.push(course);
      }
    }
    return { ...booking, technician, account, services };
  },

  update: async (id, data) => {
    return await BillModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    ).lean();
  },
};

module.exports = billService;
