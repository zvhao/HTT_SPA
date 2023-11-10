"use strict";

const bookingService = require("../services/booking.service");
const { CreatedResponse, OKResponse } = require("../utils/success.util");

module.exports = {
  async create(req, res) {
    const body = req.body;
    return new CreatedResponse({
      message: "Create booking success",
      metadata: await bookingService.add(body),
    }).send(res);
  },
  async getAll(req, res) {
    const filters = req.body.filters;
    const dataAccount = req.dataAccount;
    return new OKResponse({
      message: "Get booking success",
      metadata: await bookingService.getAll(dataAccount, filters),
    }).send(res);
  },
  async getById(req, res) {
    const id = req.params.id;
    return new OKResponse({
      message: "Get booking success",
      metadata: await bookingService.getById(id),
    }).send(res);
  },
  async update(req, res) {
    const id = req.params.id;
    const body = req.body;
    return new OKResponse({
      message: "Update booking success",
      metadata: await bookingService.update(id, body),
    }).send(res);
  },
};
