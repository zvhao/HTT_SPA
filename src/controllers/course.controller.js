"use strict";

const courseService = require("../services/course.service");
const { CreatedResponse, OKResponse } = require("../utils/success.util");
const cloudinary = require("cloudinary").v2;

module.exports = {
  async create(req, res) {
    const body = req.body;
    return new CreatedResponse({
      message: "Create course success",
      metadata: await courseService.add(body),
    }).send(res);
  },
  async getAll(req, res) {
    const filters = req.query;
    return new OKResponse({
      message: "Get course success",
      metadata: await courseService.getAll(filters),
    }).send(res);
  },
  async getById(req, res) {
    const id = req.params.id;
    return new OKResponse({
      message: "Get course id success",
      metadata: await courseService.getById(id),
    }).send(res);
  },
  // async delete(req, res) {
  //   const id = req.params.id;
  //   return new OKResponse({
  //     message: "Delete service id success",
  //     metadata: await courseService.delete(id),
  //   }).send(res);
  // },
  async update(req, res) {
    const id = req.params.id;
    const body = req.body;
    return new OKResponse({
      message: "Update course id success",
      metadata: await courseService.update(id, body),
    }).send(res);
  },
};
