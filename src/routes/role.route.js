"use strict";

const { Router } = require("express");
const roleController = require("../controllers/role.controller");
const { asyncHandler } = require("../utils/asyncHandler.util");
const { RoleSchemaInput } = require("../schema/role.schema");
const { validateResource } = require("../middleware/request.middleware");

const router = Router();

router
  .route("/")
  .post(validateResource(RoleSchemaInput), asyncHandler(roleController.create))
  .get(asyncHandler(roleController.getAll));

router
  .route("/:id")
  .get(asyncHandler(roleController.getById))
  .patch(asyncHandler(roleController.update))
  .delete(asyncHandler(roleController.delete));

module.exports = router;
