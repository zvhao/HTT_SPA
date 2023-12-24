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

        const totalCommission = staff1.commission.reduce(
          (total, commissionObj) => total + commissionObj.commission,
          0
        );
        mergedArray.push({
          staff: staff1.staff,
          commission: staff1.commission || [],
          totalCommission: totalCommission,
          dayOff: staff2?.dayOff || [],
        });
      }
      dayOff.forEach((item2) => {
        if (!mergedArray.find((item) => item.staff === item2.staff)) {
          mergedArray.push({
            staff: item2.staff,
            commission: [],
            totalCommission: 0,
            dayOff: item2?.dayOff || [],
          });
        }
      });

      const mergedArray1 = [];
      for (const staff1 of mergedArray) {
        const staff2 = staffs.find(
          (staff) => staff._id.toString() === staff1.staff
        );
        const totalCommission = staff1.commission.reduce(
          (total, commissionObj) => total + commissionObj.commission,
          0
        );
        mergedArray1.push({
          staff: staff2,
          commission: staff1.commission || [],
          dayOff: staff1.dayOff || [],
          totalCommission: totalCommission,
          numPaidLeave: staff2?.numPaidLeave || 0,
        });
      }
      staffs.forEach((item2) => {
        if (
          !mergedArray1.find(
            (item) => item.staff._id.toString() === item2._id.toString()
          )
        ) {
          mergedArray1.push({
            staff: item2,
            commission: [],
            dayOff: [],
            totalCommission: 0,
            numPaidLeave: item2?.numPaidLeave || 0,
          });
        }
      });
      const sortedData = mergedArray1
        .slice()
        .sort((a, b) => b.totalCommission - a.totalCommission);

      return sortedData;
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
      status: { $in: [2, 3] },
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
  paidSalary: async (dataAccount, filters = {}) => {
    if (Object.keys(filters).length !== 0) {
      let has = await SalaryModel.find(filters).lean();
      return await Promise.all(
        has.map(
          (u) =>
            new Promise(async (resolve, reject) => {
              try {
                resolve(await salaryService.getSalaryById(u._id));
              } catch (error) {
                reject(error);
              }
            })
        )
      );
    }
    return null;
  },
  getSalaryById: async (id) => {
    let salary = await SalaryModel.findById(id).lean();
    const staff = await StaffModel.findById(salary.staff).lean();
    return { ...salary, staff };
  },

  add: async (data) => {
    const salaryInfo = data.salaryInfo;
    const month = data.month;
    let has = await SalaryModel.find({ month: month }).lean();
    if (has.length !== 0) {
      const res = await SalaryModel.deleteMany({ month: month });
      if (res) {
        const result = await SalaryModel.insertMany(salaryInfo);
        return result;
      }
    }
    const result = await SalaryModel.insertMany(salaryInfo);
    return result;
  },

  statistical: async (dataAccount, filters = {}) => {
    if (dataAccount !== null && dataAccount.role === "staff") {
      const manager = await findStaffById(dataAccount.id);
      filters.branch = manager.branch;
    }
    let salary = await SalaryModel.find(filters).lean();
    return salary;
  },
};

module.exports = salaryService;
