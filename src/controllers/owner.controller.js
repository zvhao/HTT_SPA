"use strict";

const ownerService = require("../services/owner.service")
const { CreatedResponse, OKResponse } = require("../utils/success.util");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')

module.exports = {
	async create(req, res) {
		const body = req.body;
		return new CreatedResponse({
			message: "Create owner success",
			metadata: await ownerService.add(body),
		}).send(res);
	},
	async getAll(req, res) {
		const filters = req.query;
		return new OKResponse({
			message: "Get owner success",
			metadata: await ownerService.getAll(filters),
		}).send(res);
	},

	async getById(req, res) {
		const id = req.params.id;
		return new OKResponse({
			message: "Get owner id success",
			metadata: await ownerService.getById(id),
		}).send(res);
	},

	async update(req, res) {
		const id = req.params.id;
		const body = req.body;
		return new OKResponse({
			message: "Update owner id success",
			metadata: await ownerService.update(id, body),
		}).send(res);
	},

	async login(req, res) {
		const body = req.body
		return new OKResponse({
			message: 'login owner success',
			metadata: await ownerService.login(body),
		}).send(res);
	},

	async logout(req, res) {
		res.clearCookie('token');
		return new OKResponse({ message: "Logout success" }).send(res);
	}
}