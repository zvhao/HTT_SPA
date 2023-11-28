"use strict";

const { Router } = require("express");
const { asyncHandler } = require("../utils/asyncHandler.util");
const { validateResource } = require("../middleware/request.middleware");
const salaryController = require("../controllers/salary.controller");

const {
  authentication,
  checkPermission,
} = require("../middleware/auth.middleware");

const router = Router();

// auth
router.use(asyncHandler(authentication));

router
  .route("/")
  .get(
    asyncHandler(checkPermission("booking.view")),
    asyncHandler(salaryController.getAll)
  );

module.exports = router;
