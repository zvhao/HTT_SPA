"use strict";

const { default: mongoose } = require("mongoose");
const StaffDayOffModel = require("../models/StaffDayOff.model");
const { findStaffById } = require("../repositories/staff.resp");
const commissionService = require("./commission.service");
const { late } = require("zod");
const staffService = require("./staff.service");
// const salaryService = require

const salaryService = {
  getAll: async (dataAccount, filters = {}) => {
    if (dataAccount !== null && dataAccount.role === "staff") {
      const manager = await findStaffById(dataAccount.id);
      filters.branch = manager.branch;
    }

    if (Object.keys(filters).length !== 0) {
      const dayOff = await salaryService.getDayOffByStaff(filters);
      const commissions = await salaryService.getCommissionByStaff(
        dataAccount,
        filters
      );
      const staffs = await staffService.getAll(dataAccount);

      const mergedArray = [];

      for (const staff1 of commissions) {
        const staff2 = dayOff.find((staff) => staff.staff === staff1.staff);

        mergedArray.push({
          staff: staff1.staff,
          commission: staff1.commission || [],
          dayOff: staff2?.dayOff || [],
        });
      }
      dayOff.forEach((item2) => {
        if (!mergedArray.find((item) => item.staff === item2.staff)) {
          mergedArray.push({
            staff: item2.staff,
            commission: [],
            dayOff: item2?.dayOff || [],
          });
        }
      });

      return mergedArray;
    } else {
      return await StaffDayOffModel.find().lean();
    }
  },
  getCommissionByStaff: async (dataAccount, filters) => {
    let data = await commissionService.getAll(
      dataAccount,
      (filters = {
        executionTime: {
          $gte: filters.startOfMonth,
          $lte: filters.endOfMonth,
        },
      })
    );
    const staffCommissionMap = {};
    data.forEach((entry) => {
      const staffId = entry.technician._id;

      if (staffCommissionMap[staffId]) {
        staffCommissionMap[staffId].push(entry);
      } else {
        staffCommissionMap[staffId] = [entry];
      }
    });
    const result = Object.entries(staffCommissionMap).map(
      ([staffId, commissionArray]) => ({
        staff: staffId,
        commission: commissionArray,
      })
    );
    return result;
  },

  getDayOffByStaff: async (filters) => {
    let data = await StaffDayOffModel.find({
      branch: filters.branch,
      dayOff: { $gte: filters.startOfMonth, $lte: filters.endOfMonth },
      status: 2,
    });
    const staffDayOffMap = {};
    data.forEach((entry) => {
      const staffId = entry.staff;

      if (staffDayOffMap[staffId]) {
        staffDayOffMap[staffId].push(entry);
      } else {
        staffDayOffMap[staffId] = [entry];
      }
    });
    const result = Object.entries(staffDayOffMap).map(
      ([staffId, dayOffArray]) => ({
        staff: staffId,
        dayOff: dayOffArray,
      })
    );
    return result;
  },
};

module.exports = salaryService;
