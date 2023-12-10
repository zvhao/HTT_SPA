"use strict";

const statisticalService = require("../services/statistical.service");
const { CreatedResponse, OKResponse } = require("../utils/success.util");

module.exports = {
  async statistical(req, res) {
    const body = req.query.filter;
    const dataAccount = req.dataAccount;
    return new OKResponse({
      message: "Get statistical success",
      metadata: await statisticalService.statistical(dataAccount, body),
    }).send(res);
  },
  async ownerStatistical(req, res) {
    const filters = req.query.filter;
    const dataAccount = req.dataAccount;
    return new OKResponse({
      message: "Get statistical success",
      metadata: await statisticalService.ownerStatistical(dataAccount, filters),
    }).send(res);
  },

};
