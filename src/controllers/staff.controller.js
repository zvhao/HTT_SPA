"use strict";

const { decodeToken } = require("../core/fuction.code");
const staffService = require("../services/staff.service");
const { CreatedResponse, OKResponse } = require("../utils/success.util");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async create(req, res) {
    const body = req.body;
    return new CreatedResponse({
      message: "Create staff success",
      metadata: await staffService.add(body),
    }).send(res);
  },
  async getAll(req, res) {
    const filters = req.body.filters;
    const dataAccount = req.dataAccount;
    return new OKResponse({
      message: "Get staff success",
      metadata: await staffService.getAll(dataAccount, filters),
    }).send(res);
  },

  async getById(req, res) {
    const id = req.params.id;
    return new OKResponse({
      message: "Get staff success",
      metadata: await staffService.getById(id),
    }).send(res);
  },

  async getByToken(req, res) {
    const id = req.dataAccount.id
    // console.log(dataAccount);
    return new OKResponse({
      message: "Get staff success",
      metadata: await staffService.getById(id),
    }).send(res);
  },

  async update(req, res) {
    const id = req.params.id;
    const body = req.body;
    return new OKResponse({
      message: "Update staff success",
      metadata: await staffService.update(id, body),
    }).send(res);
  },

  async login(req, res) {
    const body = req.body;
    return new OKResponse({
      message: "Login staff success",
      metadata: await staffService.login(body),
    }).send(res);
  },

  async logout(req, res) {
    res.clearCookie("token");
    return new OKResponse({ message: "Logout success" }).send(res);
  },
};
