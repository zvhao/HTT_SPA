"use strict";

const sellingCourseService = require("../services/sellingCourse.service");
const { CreatedResponse, OKResponse } = require("../utils/success.util");

module.exports = {
  async create(req, res) {
    const body = req.body;
    return new CreatedResponse({
      message: "Create selling course success",
      metadata: await sellingCourseService.add(body),
    }).send(res);
  },
  async getAll(req, res) {
    const filters = req.body.filters;
    const dataAccount = req.dataAccount;
    return new OKResponse({
      message: "Get selling course success",
      metadata: await sellingCourseService.getAll(dataAccount, filters),
    }).send(res);
  },
  async getById(req, res) {
    const id = req.params.id;
    return new OKResponse({
      message: "Get selling course success",
      metadata: await sellingCourseService.getById(id),
    }).send(res);
  },
  async update(req, res) {
    const id = req.params.id;
    const body = req.body;
    return new OKResponse({
      message: "Update selling course success",
      metadata: await sellingCourseService.update(id, body),
    }).send(res);
  },
};
