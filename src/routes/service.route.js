"use strict";

const { Router } = require("express");
const serviceController = require("../controllers/service.controller");
const { asyncHandler } = require("../utils/asyncHandler.util");

const { validateResource } = require("../middleware/request.middleware");

const {
  authentication,
  checkPermission,
} = require("../middleware/auth.middleware");

const router = Router();
router.use(asyncHandler(authentication));

router
  .route("/")
  .post(
    asyncHandler(checkPermission("service.create")),
    // validateResource(StaffSchemaInput),
    asyncHandler(serviceController.create)
  )
  .get(
    asyncHandler(checkPermission("service.view")),
    asyncHandler(serviceController.getAll)
  );

module.exports = router;
