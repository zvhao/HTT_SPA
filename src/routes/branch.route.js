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
    asyncHandler(checkPermission("branch.add")),
    validateResource(BranchSchemaInput),
    asyncHandler(branchController.create)
  )
  .get(
    asyncHandler(checkPermission("branch.view")),
    asyncHandler(branchController.getAll)
  );

router
  .route("/:id")
  .get(
    asyncHandler(checkPermission("branch.view")),
    asyncHandler(branchController.getById)
  )
  .patch(
    asyncHandler(checkPermission("branch.update")),
    validateResource(BranchSchemaInput),
    asyncHandler(branchController.update)
  );

module.exports = router;
