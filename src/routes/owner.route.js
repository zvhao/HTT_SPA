"use strict";

const { Router } = require("express");
const ownerController = require("../controllers/owner.controller")
const { asyncHandler } = require("../utils/asyncHandler.util");

const { validateResource } = require("../middleware/request.middleware");
const { OwnerSchemaInput } = require("../schema/owner.schema");

const router = Router();

router
	.route("/")
	.post(validateResource(OwnerSchemaInput), asyncHandler(ownerController.create))
	.get(asyncHandler(ownerController.getAll));

router
	.route("/login")
	.post(asyncHandler(ownerController.login))

router
	.route("/logout")
	.get(asyncHandler(ownerController.logout))
	
router
	.route("/:id")
	.get(asyncHandler(ownerController.getById))
	.patch(asyncHandler(ownerController.update))


module.exports = router;
