"use strict";

const serviceService = require("../services/service.service");
const { CreatedResponse, OKResponse } = require("../utils/success.util");

module.exports = {
  async create(req, res) {
    const body = req.body;
    return new CreatedResponse({
      message: "Create service success",
      metadata: await serviceService.add(body),
    }).send(res);
  },
  async getAll(req, res) {
    const filters = req.query;
    return new OKResponse({
      message: "Get service success",
      metadata: await serviceService.getAll(filters),
    }).send(res);
  },
  // async getById(req, res) {
  //   const id = req.params.id;
  //   return new OKResponse({
  //     message: "Get service id success",
  //     metadata: await serviceService.getById(id),
  //   }).send(res);
  // },
  // async delete(req, res) {
  //   const id = req.params.id;
  //   return new OKResponse({
  //     message: "Delete service id success",
  //     metadata: await serviceService.delete(id),
  //   }).send(res);
  // },
  // async update(req, res) {
  //   const id = req.params.id;
  //   const body = req.body;
  //   return new OKResponse({
  //     message: "Update service id success",
  //     metadata: await serviceService.update(id, body),
  //   }).send(res);
  // },
};
