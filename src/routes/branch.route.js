"use strict";

const { Router } = require("express");
const branchController = require("../controllers/branch.controller")
const { asyncHandler } = require("../utils/asyncHandler.util");

const { validateResource } = require("../middleware/request.middleware");
const { BranchSchemaInput } = require("../schema/branch.schema");

const router = Router();

router
	.route("/")
	.post(validateResource(BranchSchemaInput), asyncHandler(branchController.create))
	.get(asyncHandler(branchController.getAll));


	
router
	.route("/:id")
	.get(asyncHandler(branchController.getById))
	.patch(asyncHandler(branchController.update))


module.exports = router;
