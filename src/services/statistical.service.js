"use strict";

const { default: mongoose } = require("mongoose");
const StaffDayOffModel = require("../models/StaffDayOff.model");
const { findStaffById } = require("../repositories/staff.resp");
const commissionService = require("./commission.service");
const { late } = require("zod");
const staffService = require("./staff.service");
const billService = require("./bill.service");
const SalaryModel = require("../models/Salary.model");
const StaffModel = require("../models/Staff.model");
const BillModel = require("../models/Bill.model");
const bookingService = require("./booking.service");
const salariesService = require("./salary.service");
// const salaryService = require

const salaryService = {
  statistical: async (dataAccount, filters = {}) => {
    let LastMonth = {
      createdAt: {
        $gte: filters.firstDayOfLastMonth,
        $lte: filters.firstDayOfThisMonth,
      },
    };
    let ThisMonth = {
      createdAt: {
        $gte: filters.firstDayOfThisMonth,
        $lte: filters.firstDayOfNextMonth,
      },
    };
    let LastMonthSlr = {
      month: filters.firstDayOfLastMonth,
    };
    let ThisMonthSlr = {
      month: filters.firstDayOfThisMonth,
    };
    if (dataAccount !== null && dataAccount.role === "staff") {
      const manager = await findStaffById(dataAccount.id);
      filters.branch = manager.branch;
    }
    const allBillsbyLastMonth = await billService.getAll(
      dataAccount,
      LastMonth
    );
    const allBillsbyThisMonth = await billService.getAll(
      dataAccount,
      ThisMonth
    );
    const allSalariesbyLastMonth = await salariesService.statistical(
      dataAccount,
      { month: filters.firstDayOfLastMonth }
    );
    const allSalariesbyThisMonth = await salariesService.statistical(
      dataAccount,
      { month: filters.firstDayOfThisMonth }
    );
    return {
      LastMonth: { allBillsbyLastMonth, allSalariesbyLastMonth },
      ThisMonth: { allBillsbyThisMonth, allSalariesbyThisMonth },
    };
  },
  ownerStatistical: async (dataAccount, filters = {}) => {
    if (dataAccount !== null && dataAccount.role === "staff") {
      const manager = await findStaffById(dataAccount.id);
      filters.branch = manager.branch;
    }
    let fils = {
      branch: filters.branch,
      createdAt: {
        $gte: filters.startTime,
        $lte: filters.endTime,
      },
    };
    const allBills = await billService.getAll(dataAccount, fils);
    const allTours = await bookingService.getAll(dataAccount, fils);
    // console.log("====================================");
    // console.log(time);
    // console.log("====================================");
    return { allBills, allTours };
  },
};

module.exports = salaryService;
