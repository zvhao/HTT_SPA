"use strict";

const { Router } = require("express");
const { asyncHandler } = require("../utils/asyncHandler.util");
const { validateResource } = require("../middleware/request.middleware");
const statisticalController = require("../controllers/statistical.controller");

const {
  authentication,
  checkPermission,
} = require("../middleware/auth.middleware");

const router = Router();

// auth
router.use(asyncHandler(authentication));

router.route("/owner").get(asyncHandler(statisticalController.ownerStatistical));
router.route("/").get(asyncHandler(statisticalController.statistical));

module.exports = router;
