"use strict";

const { Router } = require("express");
const { asyncHandler } = require("../utils/asyncHandler.util");
const { validateResource } = require("../middleware/request.middleware");
const bookingController = require("../controllers/booking.controller");
const { BookingSchemaInput } = require("../schema/booking.schema");

const {
  authentication,
  checkPermission,
} = require("../middleware/auth.middleware");

const router = Router();

router
  .route("/")
  .post(
    // asyncHandler(checkPermission("staff.add")),
    validateResource(BookingSchemaInput),
    asyncHandler(bookingController.create)
  )
  .get(
    // asyncHandler(checkPermission("staff.view")),
    asyncHandler(bookingController.getAll)
  );

router
  .route("/:id")
  .get(asyncHandler(bookingController.getById))
  .patch(
    validateResource(BookingSchemaInput),
    asyncHandler(bookingController.update)
  );

module.exports = router;
