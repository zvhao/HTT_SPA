"use strict";

const roleService = require("../services/role.service");
const { CreatedResponse, OKResponse } = require("../utils/success.util");

module.exports = {
  async create(req, res) {
    const body = req.body;
    return new CreatedResponse({
      message: "Create role success",
      metadata: await roleService.add(body),
    }).send(res);
  },
  async getAll(req, res) {
    const filters = req.query;
    return new OKResponse({
      message: "Get role success",
      metadata: await roleService.getAll(filters),
    }).send(res);
  },
  async getById(req, res) {
    const id = req.params.id;
    return new OKResponse({
      message: "Get role id success",
      metadata: await roleService.getById(id),
    }).send(res);
  },
  async delete(req, res) {
    const id = req.params.id;
    return new OKResponse({
      message: "Delete role id success",
      metadata: await roleService.delete(id),
    }).send(res);
  },
  async update(req, res) {
    const id = req.params.id;
    const body = req.body;
    return new OKResponse({
      message: "Update role id success",
      metadata: await roleService.update(id, body),
    }).send(res);
  },
};
