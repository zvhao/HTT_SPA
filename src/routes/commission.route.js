"use strict";

const { Router } = require("express");
const { asyncHandler } = require("../utils/asyncHandler.util");
const { validateResource } = require("../middleware/request.middleware");
const commissionController = require("../controllers/commission.controller");
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
    asyncHandler(commissionController.create)
  )
  .get(
    asyncHandler(checkPermission("booking.view")),
    asyncHandler(commissionController.getAll)
  );

router
  .route("/:id")
  .get(
    asyncHandler(checkPermission("booking.view")),
    asyncHandler(commissionController.getById)
  )
  .patch(
    asyncHandler(checkPermission("booking.update")),
    // validateResource(BookingSchemaInput),
    asyncHandler(commissionController.update)
  );

module.exports = router;
