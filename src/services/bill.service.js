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
const bookingService = require("./booking.service");
const sellingCourseService = require("./sellingCourse.service");

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
    if (await BillModel.findOne({ bookingInfomation })) {
      throw new ConflictRequestError("Đã tạo hoá đơn trước đó");
    }
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
    console.log('====================================');
    console.log(filters);
    console.log('====================================');
    const allBills = await BillModel.find(filters).lean();
    const sortedData = allBills
      .slice()
      .sort((a, b) => b.createdAt - a.createdAt);
    // return allBills;
    return await Promise.all(
      sortedData.map(
        (u) =>
          new Promise(async (resolve, reject) => {
            try {
              resolve(await billService.getById(u._id));
            } catch (error) {
              reject(error);
            }
          })
      )
    );
  },

  getById: async (id) => {
    let bill = await BillModel.findById(id).lean();

    if (bill.branch !== "") {
      bill.branch = await BranchModel.findById(bill.branch);
    }
    if (bill.bookingInfomation) {
      const booking = await bookingService.getById(bill.bookingInfomation);
      const sellingCourse = await sellingCourseService.getById(
        bill.bookingInfomation
      );
      if (booking) {
        bill.bookingInfomation = booking;
      } else {
        bill.bookingInfomation = sellingCourse;
      }
    }

    return bill;
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
