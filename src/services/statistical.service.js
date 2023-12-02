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
    if (dataAccount !== null && dataAccount.role === "staff") {
      const manager = await findStaffById(dataAccount.id);
      filters.branch = manager.branch;
      // LastMonth.branch = manager.branch;
      // ThisMonth.branch = manager.branch;
    }
    const allBillsbyLastMonth = await billService.getAll(
      dataAccount,
      LastMonth
    );
    const allBillsbyThisMonth = await billService.getAll(
      dataAccount,
      ThisMonth
    );
    return {
      LastMonth: { allBillsbyLastMonth },
      ThisMonth: { allBillsbyThisMonth },
    };
  },
};

module.exports = salaryService;
