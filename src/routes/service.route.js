"use strict";

const { Router } = require("express");
const serviceController = require("../controllers/service.controller");
const { asyncHandler } = require("../utils/asyncHandler.util");
const { ServiceSchemaInput } = require("../schema/service.schema");

const { validateResource } = require("../middleware/request.middleware");

const {
  authentication,
  checkPermission,
} = require("../middleware/auth.middleware");

const router = Router();
router.use(asyncHandler(authentication));

router
  .route("/")
  .post(
    asyncHandler(checkPermission("service.add")),
    validateResource(ServiceSchemaInput),
    asyncHandler(serviceController.create)
  )
  .get(
    asyncHandler(checkPermission("service.view")),
    asyncHandler(serviceController.getAll)
  );

router
  .route("/:id")
  .get(asyncHandler(serviceController.getById))
  .patch(
    asyncHandler(checkPermission("service.update")),
    asyncHandler(serviceController.update)
  )
  .delete(asyncHandler(serviceController.delete));

module.exports = router;
