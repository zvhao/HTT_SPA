"use strict";

const { Router } = require("express");
const courseController = require("../controllers/course.controller");
const { asyncHandler } = require("../utils/asyncHandler.util");
const { CourseSchemaInput } = require("../schema/course.schema");
const cloudinary = require("cloudinary").v2;
const { validateResource } = require("../middleware/request.middleware");
const env = require("../../config/env");
const uploadCloud = require("../cloud/cloudinary");
const multer = require("multer");
const upload = multer({ dest: "uploads" });

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
