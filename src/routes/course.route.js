"use strict";

const { Router } = require("express");
const courseController = require("../controllers/course.controller");
const { asyncHandler } = require("../utils/asyncHandler.util");
const { CourseSchemaInput } = require("../schema/course.schema");

const { validateResource } = require("../middleware/request.middleware");
const uploadCloud = require("../cloud/cloudinary");

const {
  authentication,
  checkPermission,
} = require("../middleware/auth.middleware");

const router = Router();
router.use(asyncHandler(authentication));

router
  .route("/")
  .post(
    asyncHandler(checkPermission("course.add")),
    uploadCloud.single("service_package/course"),
    validateResource(CourseSchemaInput),
    asyncHandler(courseController.create)
  )
  .get(
    asyncHandler(checkPermission("course.view")),
    asyncHandler(courseController.getAll)
  );

router
  .route("/:id")
  .get(asyncHandler(courseController.getById))
  .patch(
    asyncHandler(checkPermission("course.update")),
    validateResource(CourseSchemaInput),
    asyncHandler(courseController.update)
  )
  .delete(asyncHandler(courseController.delete));

module.exports = router;
