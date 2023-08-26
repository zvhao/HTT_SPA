"use trict";

const { findBranchByCode, saveBranch, findAllBranch, findBranchById, findOneAndUpdateBranch } = require("../repositories/branch.resp")
const { ConflictRequestError, NotFoundRequestError } = require("../utils/error.util");
const roleService = require("./role.service");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const branchService = {
	add: async ({ name, code, address, desc, capacity, manager, owners, startTime, endTime }) => {
		if (await findBranchByCode(code)) {
			throw new ConflictRequestError("Code exists")
		}
		const response = await saveBranch({ name, code, address, desc, capacity, manager, owners, startTime, endTime })

		return response
	},

	getAll: async (filters = {}) => {
		const branches = await findAllBranch();

		return await Promise.all(
			branches.map(
				(u) =>
					new Promise(async (resolve, reject) => {
						try {
							resolve(await branchService.getById(u._id));
						} catch (error) {
							reject(error);
						}
					})
			)
		);
	},

	getById: async (id) => {
		let branch = await findBranchById(id);

		return branch;
	},

	update: async (id, data) => {
		// console.log(data.code);
		if (data.code) {
			let isBranch = await findBranchByCode(data.code);

			if (isBranch && id !== isBranch._id.toString()) {
				throw new ConflictRequestError("Code exists");
			}
		}

		return await findOneAndUpdateBranch(id, data);
	},
}

module.exports = branchService