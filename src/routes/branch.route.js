"use strict";

const { Router } = require("express");
const branchController = require("../controllers/branch.controller");
const { asyncHandler } = require("../utils/asyncHandler.util");

const { validateResource } = require("../middleware/request.middleware");
const { BranchSchemaInput } = require("../schema/branch.schema");
const {
  authentication,
  checkPermission,
} = require("../middleware/auth.middleware");
const router = Router();

// auth
router.use(asyncHandler(authentication));

router
  .route("/")
  .post(
    checkPermission('branch.add'),
    validateResource(BranchSchemaInput),
    asyncHandler(branchController.create)
  )
  .get(checkPermission('branch.view'),asyncHandler(branchController.getAll));

router
  .route("/:id")
  .get(checkPermission('branch.edit'), asyncHandler(branchController.getById))
  .patch(asyncHandler(branchController.update));

module.exports = router;
