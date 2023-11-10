"use strict";

const { Router } = require("express");
const { asyncHandler } = require("../utils/asyncHandler.util");
const { validateResource } = require("../middleware/request.middleware");
const bookingController = require("../controllers/booking.controller");
const {
  authentication,
  checkPermission,
} = require("../middleware/auth.middleware");

const router = Router();

router
  .route("/")
  .post(
    // asyncHandler(checkPermission("staff.add")),
    // validateResource(StaffSchemaInput),
    asyncHandler(bookingController.create)
  )
  .get(
    // asyncHandler(checkPermission("staff.view")),
    asyncHandler(bookingController.getAll)
  );

router
  .route("/:id")
  .get(asyncHandler(bookingController.getById))
  .patch(asyncHandler(bookingController.update));

module.exports = router;
