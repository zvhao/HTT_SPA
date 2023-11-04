"use strict";

const { Router } = require("express");
const customerController = require("../controllers/customer.controller");
const { asyncHandler } = require("../utils/asyncHandler.util");

const { validateResource } = require("../middleware/request.middleware");
// const { StaffSchemaInput } = require("../schema/staff.schema");

// const {
//   authentication,
//   checkPermission,
// } = require("../middleware/auth.middleware");

const router = Router();

router.route("/login").post(asyncHandler(customerController.login));

router.route("/logout").get(asyncHandler(customerController.logout));

// auth
// router.use(asyncHandler(authentication));
router.route("/getaccount").get(asyncHandler(customerController.getByToken));

router
  .route("/")
  .post(
    // asyncHandler(checkPermission("staff.add")),
    // validateResource(StaffSchemaInput),
    asyncHandler(customerController.create)
  )
  .get(
    // asyncHandler(checkPermission("staff.view")),
    asyncHandler(customerController.getAll)
  );

router
  .route("/:id")
  // .get(asyncHandler(customerController.getById))
  .patch(asyncHandler(customerController.update));

module.exports = router;
