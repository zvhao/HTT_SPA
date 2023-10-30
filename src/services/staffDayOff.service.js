"use trict";
const StaffDayOffModel = require("../models/StaffDayOff.model");
const {
  ConflictRequestError,
  NotFoundRequestError,
} = require("../utils/error.util");
const jwt = require("jsonwebtoken");
const staffService = require("./staff.service");
const branchService = require("./branch.service");
const BranchModel = require("../models/Branch.model");
const { findStaffById } = require("../repositories/staff.resp");

const staffDayOffService = {
  add: async ({ branch, staff, dayOff, reason, status }) => {
    if (await staffDayOffService.checkDayOffExist(staff, dayOff)) {
      throw new ConflictRequestError("Bạn đã đăng ký ngày này trước đó");
    }
    const response = await StaffDayOffModel({
      branch,
      staff,
      dayOff,
      reason,
      status,
    }).save();

    return response;
  },

  getAll: async (dataAccount, filters = {}) => {
    // console.log("data", dataAccount);
    if (dataAccount !== null && dataAccount.role === "staff") {
      const manager = await findStaffById(dataAccount.id);
      filters.branch = manager.branch;
    }
    let data = await StaffDayOffModel.find(filters).lean();
    // return data;
    return await Promise.all(
      data.map(
        (u) =>
          new Promise(async (resolve, reject) => {
            try {
              resolve(await staffDayOffService.getById(u._id));
            } catch (error) {
              reject(error);
            }
          })
      )
    );
  },

  getById: async (id) => {
    let dayOff = await StaffDayOffModel.findById(id).lean();
    if (dayOff && dayOff.staff && dayOff.branch) {
      var branch = await BranchModel.findById(dayOff.branch);
      var staff = await staffService.getById(dayOff.staff);
    }
    // console.log(branch);
    return { ...dayOff, staff, branch };
  },

  checkDayOffExist: async (staffId, dayOff) => {
    let dayOffs = await StaffDayOffModel.find({
      staff: staffId,
      dayOff: dayOff,
    });
    if (dayOffs.length > 0) {
      return true;
    } else {
      return false;
    }
  },

  update: async (id, data) => {
    // console.log(data.code);
    if (data.staff && data.dayOff) {
      let isDayOff = await staffDayOffService.checkDayOffExist(
        data.staff,
        data.dayOff
      );

      if (isDayOff && id !== isDayOff._id) {
        throw new ConflictRequestError("Bạn đã đăng ký ngày này trước đó");
      }
    }

    return await StaffDayOffModel.findByIdAndUpdate(
      id,
      { $set: data },
      {
        new: true,
      }
    ).lean();
  },
};

module.exports = staffDayOffService;
