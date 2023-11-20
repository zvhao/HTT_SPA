"use strict";

const { Router } = require("express");
const { asyncHandler } = require("../utils/asyncHandler.util");
const { validateResource } = require("../middleware/request.middleware");
const sellingCourseController = require("../controllers/sellingCourse.controller");
const { SellingCourseSchemaInput } = require("../schema/sellingCourse.schema");

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
    // asyncHandler(checkPermission("booking.add")),
    // validateResource(SellingCourseSchemaInput),
    asyncHandler(sellingCourseController.create)
  )
  .get(
    // asyncHandler(checkPermission("booking.view")),
    asyncHandler(sellingCourseController.getAll)
  );

router
  .route("/:id")
  .get(
    // asyncHandler(checkPermission("booking.view")),
    asyncHandler(sellingCourseController.getById)
  )
  .patch(
    // asyncHandler(checkPermission("booking.update")),
    // validateResource(SellingCourseSchemaInput),
    asyncHandler(sellingCourseController.update)
  );

module.exports = router;
