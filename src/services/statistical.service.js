"use strict";

const { default: mongoose } = require("mongoose");
const StaffDayOffModel = require("../models/StaffDayOff.model");
const { findStaffById } = require("../repositories/staff.resp");
const commissionService = require("./commission.service");
const { late } = require("zod");
const staffService = require("./staff.service");
const SalaryModel = require("../models/Salary.model");
const StaffModel = require("../models/Staff.model");
// const salaryService = require

const salaryService = {
  statistical: async (dataAccount, filters = {}) => {
    if (dataAccount !== null && dataAccount.role === "staff") {
      const manager = await findStaffById(dataAccount.id);
      filters.branch = manager.branch;
    }
    return filters;
  },
};

module.exports = salaryService;
