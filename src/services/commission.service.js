"use trict";

const BookingModel = require("../models/Booking.model");
const StaffModel = require("../models/Staff.model");
const CustomerModel = require("../models/Customer.model");
const ServiceModel = require("../models/Service.model");
const ComboModel = require("../models/Combo.model");
const CourseModel = require("../models/Course.model");
const BranchModel = require("../models/Branch.model");
const BillModel = require("../models/Bill.model");
const CommissionModel = require("../models/Commission.model");

const {
  ConflictRequestError,
  NotFoundRequestError,
  BadRequestError,
} = require("../utils/error.util");
const { findStaffById } = require("../repositories/staff.resp");
const bookingService = require("./booking.service");
const sellingCourseService = require("./sellingCourse.service");

const commissionService = {
  add: async ({ technician, commission, executionTime, type, booking }) => {
    let data = {
      technician,
      commission,
      executionTime,
      type,
      booking,
    };
    if (await CommissionModel.findOne(data)) {
      return {};
    }
    const res = await CommissionModel(data).save();
    return res;
  },
  getAll: async (dataAccount, filters = {}) => {
    let idBranch;
    if (dataAccount !== null && dataAccount.role === "staff") {
      const manager = await findStaffById(dataAccount.id);
      idBranch = manager.branch;
    }
    const commissions = await CommissionModel.find(filters).lean();
    // return commissions;
    let arr = await Promise.all(
      commissions.map(
        (u) =>
          new Promise(async (resolve, reject) => {
            try {
              resolve(await commissionService.getById(u._id));
            } catch (error) {
              reject(error);
            }
          })
      )
    );
    let filteredCommissions = arr.filter((commission) => {
      return idBranch.equals(commission.branch);
    });
    return filteredCommissions;
  },

  getById: async (id) => {
    let commission = await CommissionModel.findById(id).lean();
    let technician;
    let branch;
    if (commission.technician) {
      technician = await StaffModel.findById(commission.technician).lean();
      branch = technician.branch;
    }

    return { ...commission, technician, branch };
  },

  update: async (id, data) => {
    return await CommissionModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    ).lean();
  },
};

module.exports = commissionService;
