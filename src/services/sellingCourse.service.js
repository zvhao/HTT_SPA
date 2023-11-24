"use trict";

const BookingModel = require("../models/Booking.model");
const StaffModel = require("../models/Staff.model");
const CustomerModel = require("../models/Customer.model");
const ServiceModel = require("../models/Service.model");
const ComboModel = require("../models/Combo.model");
const CourseModel = require("../models/Course.model");
const BranchModel = require("../models/Branch.model");
const SellingCourseModel = require("../models/SellingCourse.model");

const {
  ConflictRequestError,
  NotFoundRequestError,
  BadRequestError,
} = require("../utils/error.util");
const { findStaffById } = require("../repositories/staff.resp");

const sellingCourseService = {
  add: async ({
    course,
    status,
    branch,
    note,
    customerInfo,
    account,
    package_detail,
    detailsOfTurns,
  }) => {
    let data = {
      course,
      status,
      branch,
      note,
      customerInfo,
      account,
      package_detail,
      detailsOfTurns,
    };
    const res = await SellingCourseModel(data).save();
    return res;
  },
  getAll: async (dataAccount, filters = {}) => {
    if (dataAccount !== null && dataAccount.role === "staff") {
      const manager = await findStaffById(dataAccount.id);
      filters.branch = manager.branch;
    }
    const allSellingCourses = await SellingCourseModel.find(filters).lean();
    return await Promise.all(
      allSellingCourses.map(
        (u) =>
          new Promise(async (resolve, reject) => {
            try {
              resolve(await sellingCourseService.getById(u._id));
            } catch (error) {
              reject(error);
            }
          })
      )
    );
  },

  getById: async (id) => {
    let sellingCourse = await SellingCourseModel.findById(id).lean();
    if (sellingCourse) {
      let account = {};
      let course = await CourseModel.findById(sellingCourse.course).lean();
      // if (sellingCourse.technician !== "") {
      //   technician = await StaffModel.findById(sellingCourse.technician);
      // }
      if (sellingCourse.account !== "") {
        account = await CustomerModel.findById(sellingCourse.account);
      }
      if (sellingCourse.branch !== "") {
        sellingCourse.branch = await BranchModel.findById(sellingCourse.branch);
      }
      let updatedDetailsOfTurns = [];
      if (sellingCourse.detailsOfTurns !== undefined) {
        updatedDetailsOfTurns = await Promise.all(
          sellingCourse.detailsOfTurns.map(async (turn) => {
            if (turn.technician) {
              const technician = await StaffModel.findById(
                turn.technician
              ).lean();
              turn.technician = technician; // Gán thông tin kỹ thuật viên
            }
            return turn;
          })
        );
      }

      return {
        ...sellingCourse,
        account,
        course,
        detailsOfTurns: updatedDetailsOfTurns,
      };
    } else {
      return sellingCourse
    }
    // let technician = {};
  },

  update: async (id, data) => {
    return await SellingCourseModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    ).lean();
  },
};

module.exports = sellingCourseService;
