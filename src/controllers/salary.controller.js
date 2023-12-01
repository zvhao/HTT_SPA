"use strict";

const salaryService = require("../services/salary.service");
const { CreatedResponse, OKResponse } = require("../utils/success.util");

module.exports = {
  async getAll(req, res) {
    const body = req.query.filter;
    const dataAccount = req.dataAccount;
    return new OKResponse({
      message: "Get salary success",
      metadata: await salaryService.getAll(dataAccount, body),
    }).send(res);
  },
  async paidSalary(req, res) {
    const body = req.query.filter;
    const dataAccount = req.dataAccount;
    return new OKResponse({
      message: "Get salary success",
      metadata: await salaryService.paidSalary(dataAccount, body),
    }).send(res);
  },
  async create(req, res) {
    const body = req.body;
    return new CreatedResponse({
      message: "Create salary success",
      metadata: await salaryService.add(body),
    }).send(res);
  },
};
