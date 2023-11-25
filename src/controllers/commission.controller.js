"use strict";

const billService = require("../services/bill.service");
const commissionService = require("../services/commission.service");
const { CreatedResponse, OKResponse } = require("../utils/success.util");

module.exports = {
  async create(req, res) {
    const body = req.body;
    return new CreatedResponse({
      message: "Create commission success",
      metadata: await commissionService.add(body),
    }).send(res);
  },
  async getAll(req, res) {
    const filters = req.body.filters;
    const dataAccount = req.dataAccount;
    return new OKResponse({
      message: "Get commission success",
      metadata: await commissionService.getAll(dataAccount, filters),
    }).send(res);
  },
  async getById(req, res) {
    const id = req.params.id;
    return new OKResponse({
      message: "Get commission success",
      metadata: await commissionService.getById(id),
    }).send(res);
  },
  async update(req, res) {
    const id = req.params.id;
    const body = req.body;
    return new OKResponse({
      message: "Update commission success",
      metadata: await commissionService.update(id, body),
    }).send(res);
  },
};
