"use strict";

const comboService = require("../services/combo.service");
const { CreatedResponse, OKResponse } = require("../utils/success.util");

module.exports = {
  async create(req, res) {
    const body = req.body;
    return new CreatedResponse({
      message: "Create combo success",
      metadata: await comboService.add(body),
    }).send(res);
  },
  async getAll(req, res) {
    const filters = req.query;
    return new OKResponse({
      message: "Get combo success",
      metadata: await comboService.getAll(filters),
    }).send(res);
  },
  async getById(req, res) {
    const id = req.params.id;
    return new OKResponse({
      message: "Get combo id success",
      metadata: await comboService.getById(id),
    }).send(res);
  },
  // async delete(req, res) {
  //   const id = req.params.id;
  //   return new OKResponse({
  //     message: "Delete service id success",
  //     metadata: await comboService.delete(id),
  //   }).send(res);
  // },
  async update(req, res) {
    const id = req.params.id;
    const body = req.body;
    return new OKResponse({
      message: "Update combo id success",
      metadata: await comboService.update(id, body),
    }).send(res);
  },
};
