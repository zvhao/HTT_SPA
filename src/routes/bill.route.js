"use strict";

const { Router } = require("express");
const { asyncHandler } = require("../utils/asyncHandler.util");
const { validateResource } = require("../middleware/request.middleware");
const billController = require("../controllers/bill.controller");
// const { BookingSchemaInput } = require("../schema/booking.schema");

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
    asyncHandler(checkPermission("booking.add")),
    // validateResource(BookingSchemaInput),
    asyncHandler(billController.create)
  )
  .get(
    asyncHandler(checkPermission("booking.view")),
    asyncHandler(billController.getAll)
  );

router
  .route("/:id")
  .get(
    asyncHandler(checkPermission("booking.view")),
    asyncHandler(billController.getById)
  )
  .patch(
    asyncHandler(checkPermission("booking.update")),
    // validateResource(BookingSchemaInput),
    asyncHandler(billController.update)
  );

module.exports = router;
