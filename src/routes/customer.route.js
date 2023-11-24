"use strict";

const { Router } = require("express");
const customerController = require("../controllers/customer.controller");
const { asyncHandler } = require("../utils/asyncHandler.util");

const { validateResource } = require("../middleware/request.middleware");
const { CustomerSchemaInput } = require("../schema/customer.schema");

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
    validateResource(CustomerSchemaInput),
    asyncHandler(customerController.create)
  )
  .get(
    // asyncHandler(checkPermission("staff.view")),
    asyncHandler(customerController.getAll)
  );

router
  .route("/:id")
  .get(asyncHandler(customerController.getById))
  .patch(
    // validateResource(CustomerSchemaInput),
    asyncHandler(customerController.update)
  );

module.exports = router;
