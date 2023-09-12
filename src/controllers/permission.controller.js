"use strict";

const permissionService = require("../services/permission.service");
const { CreatedResponse, OKResponse } = require("../utils/success.util");

module.exports = {
  async create(req, res) {
    const body = req.body;
    return new CreatedResponse({
      message: "Create permission success",
      metadata: await permissionService.add(body),
    }).send(res);
  },
  async getAll(req, res) {
    const filters = req.query;
    return new OKResponse({
      message: "Get permissions success",
      metadata: await permissionService.getAll(filters),
    }).send(res);
  },
  async getById(req, res) {
    const id = req.params.id;
    return new OKResponse({
      message: "Get permission success",
      metadata: await permissionService.getById(id),
    }).send(res);
  },
  async delete(req, res) {
    const id = req.params.id;
    return new OKResponse({
      message: "Delete permission success",
      metadata: await permissionService.delete(id),
    }).send(res);
  },
  async update(req, res) {
    const id = req.params.id;
    const body = req.body;
    return new OKResponse({
      message: "Update permission success",
      metadata: await permissionService.update(id, body),
    }).send(res);
  },
};
