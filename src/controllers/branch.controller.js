"use strict";

const branchService = require("../services/branch.service")
const { CreatedResponse, OKResponse } = require("../utils/success.util");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

module.exports = {
	async create(req, res) {
		const body = req.body;
		return new CreatedResponse({
			message: "Create owner success",
			metadata: await branchService.add(body),
		}).send(res);
	},
	async getAll(req, res) {
		const filters = req.query;
		return new OKResponse({
			message: "Get branch success",
			metadata: await branchService.getAll(filters),
		}).send(res);
	},

	async getById(req, res) {
		const id = req.params.id;
		return new OKResponse({
			message: "Get branch id success",
			metadata: await branchService.getById(id),
		}).send(res);
	},

	async update(req, res) {
		const id = req.params.id;
		const body = req.body;
		return new OKResponse({
			message: "Update owner id success",
			metadata: await branchService.update(id, body),
		}).send(res);
	},
}