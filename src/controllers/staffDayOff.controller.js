"use strict";

const staffDayOffService = require("../services/staffDayOff.service");
const { CreatedResponse, OKResponse } = require("../utils/success.util");

module.exports = {
  async create(req, res) {
    const body = req.body;
    console.log(body);
    return new CreatedResponse({
      message: "Create day-off success",
      metadata: await staffDayOffService.add(body),
    }).send(res);
  },
  async getAll(req, res) {
    const filters = req.body.filters;
    const dataAccount = req.dataAccount;
    return new OKResponse({
      message: "Get day-offs success",
      metadata: await staffDayOffService.getAll(dataAccount, filters),
    }).send(res);
  },

  async getById(req, res) {
    const id = req.params.id;
    return new OKResponse({
      message: "Get day-off success",
      metadata: await staffDayOffService.getById(id),
    }).send(res);
  },

  async update(req, res) {
    const id = req.params.id;
    const body = req.body;
    console.log(body);
    return new OKResponse({
      message: "Update day-off success",
      metadata: await staffDayOffService.update(id, body),
    }).send(res);
  },
};
