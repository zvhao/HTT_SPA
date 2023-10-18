"use strict";

const { Router } = require("express");
const uploadController = require("../controllers/upload.controller");
const { asyncHandler } = require("../utils/asyncHandler.util");
const uploadCloud = require("../cloud/cloudinary");

const {
  authentication,
} = require("../middleware/auth.middleware");

const router = Router();
router.use(asyncHandler(authentication));
router.route("/").post(
    uploadCloud.array("image"),
  // validateResource(CourseSchemaInput),
  asyncHandler(uploadController.upload)
);

module.exports = router;
