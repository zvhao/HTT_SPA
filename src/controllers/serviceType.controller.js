"use strict";

const serviceTypeService = require("../services/serviceType.service");
const { CreatedResponse, OKResponse } = require("../utils/success.util");

module.exports = {
  async create(req, res) {
    const body = req.body;
    return new CreatedResponse({
      message: "Create service type success",
      metadata: await serviceTypeService.add(body),
    }).send(res);
  },
  async getAll(req, res) {
    const filters = req.query;
    return new OKResponse({
      message: "Get service type success",
      metadata: await serviceTypeService.getAll(filters),
    }).send(res);
  },
  async getById(req, res) {
    const id = req.params.id;
    return new OKResponse({
      message: "Get service type id success",
      metadata: await serviceTypeService.getById(id),
    }).send(res);
  },
  // async delete(req, res) {
  //   const id = req.params.id;
  //   return new OKResponse({
  //     message: "Delete service id success",
  //     metadata: await serviceTypeService.delete(id),
  //   }).send(res);
  // },
  async update(req, res) {
    const id = req.params.id;
    const body = req.body;
    return new OKResponse({
      message: "Update service type id success",
      metadata: await serviceTypeService.update(id, body),
    }).send(res);
  },
};
