"use strict";

const billService = require("../services/bill.service");
const { CreatedResponse, OKResponse } = require("../utils/success.util");

module.exports = {
  async create(req, res) {
    const body = req.body;
    return new CreatedResponse({
      message: "Create bill success",
      metadata: await billService.add(body),
    }).send(res);
  },
  async getAll(req, res) {
    const filters = req.body.filters;
    const dataAccount = req.dataAccount;
    return new OKResponse({
      message: "Get bill success",
      metadata: await billService.getAll(dataAccount, filters),
    }).send(res);
  },
  async getById(req, res) {
    const id = req.params.id;
    return new OKResponse({
      message: "Get bill success",
      metadata: await billService.getById(id),
    }).send(res);
  },
  async update(req, res) {
    const id = req.params.id;
    const body = req.body;
    return new OKResponse({
      message: "Update bill success",
      metadata: await billService.update(id, body),
    }).send(res);
  },
};
