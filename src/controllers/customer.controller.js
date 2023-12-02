"use strict";

const { decodeToken } = require("../core/fuction.code");
const customerService = require("../services/customer.service");
const { CreatedResponse, OKResponse } = require("../utils/success.util");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async create(req, res) {
    const body = req.body;
    return new CreatedResponse({
      message: "Create customer success",
      metadata: await customerService.add(body),
    }).send(res);
  },
  async getAll(req, res) {
    const filters = req.body.filters;
    // const dataAccount = req.dataAccount;
    return new OKResponse({
      message: "Get customer success",
      // metadata: await customerService.getAll(dataAccount, filters),
      metadata: await customerService.getAll(filters),
    }).send(res);
  },

  async getById(req, res) {
    const id = req.params.id;
    return new OKResponse({
      message: "Get customer success",
      metadata: await customerService.getById(id),
    }).send(res);
  },

  // async getByToken(req, res) {
  //   const id = req.dataAccount.id
  //   // console.log(dataAccount);
  //   return new OKResponse({
  //     message: "Get customer success",
  //     metadata: await customerService.getByTokenId(id),
  //   }).send(res);
  // },

  async update(req, res) {
    const id = req.params.id;
    const body = req.body;
    return new OKResponse({
      message: "Update customer success",
      metadata: await customerService.update(id, body),
    }).send(res);
  },

  async login(req, res) {
    const body = req.body;
    return new OKResponse({
      message: "Login customer success",
      metadata: await customerService.login(body),
    }).send(res);
  },

  // async logout(req, res) {
  //   res.clearCookie("token");
  //   return new OKResponse({ message: "Logout success" }).send(res);
  // },
};
