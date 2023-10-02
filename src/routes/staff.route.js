"use strict";

const { Router } = require("express");
const staffController = require("../controllers/staff.controller");
const { asyncHandler } = require("../utils/asyncHandler.util");

const { validateResource } = require("../middleware/request.middleware");
const { StaffSchemaInput } = require("../schema/staff.schema");

const {
  authentication,
  checkPermission,
} = require("../middleware/auth.middleware");

const router = Router();

router.route("/login").post(asyncHandler(staffController.login));

router.route("/logout").get(asyncHandler(staffController.logout));

// auth
router.use(asyncHandler(authentication));
router.route("/getaccount").get(asyncHandler(staffController.getByToken));

router
  .route("/")
  .post(
    asyncHandler(checkPermission("staff.update")),
    validateResource(StaffSchemaInput),
    asyncHandler(staffController.create)
  )
  .get(
    asyncHandler(checkPermission("staff.view")),
    asyncHandler(staffController.getAll)
  );

router
  .route("/:id")
  .get(asyncHandler(staffController.getById))
  .patch(asyncHandler(staffController.update));

module.exports = router;
