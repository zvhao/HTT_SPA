"use strict";

const { Router } = require("express");
const permissionController = require("../controllers/permission.controller");
const { asyncHandler } = require("../utils/asyncHandler.util");
const { PermissionCreateSchema } = require("../schema/permission.schema");
const { validateResource } = require("../middleware/request.middleware");

const router = Router();

router
  .route("/")
  .post(
    validateResource(PermissionCreateSchema),
    asyncHandler(permissionController.create)
  )
  .get(asyncHandler(permissionController.getAll));

router
  .route("/:id")
  .get(asyncHandler(permissionController.getById))
  .patch(
    validateResource(PermissionCreateSchema),
    asyncHandler(permissionController.update)
  )
  .delete(asyncHandler(permissionController.delete));

module.exports = router;
