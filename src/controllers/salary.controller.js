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
};
