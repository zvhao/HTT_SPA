"use strict";

const { Router } = require("express");
const serviceTypeController = require("../controllers/servicetype.controller");
const { asyncHandler } = require("../utils/asyncHandler.util");
const { ServiceTypeSchemaInput } = require("../schema/servicetype.schema");

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
    asyncHandler(checkPermission("servicetype.add")),
    validateResource(ServiceTypeSchemaInput),
    asyncHandler(serviceTypeController.create)
  )
  .get(
    asyncHandler(checkPermission("servicetype.view")),
    asyncHandler(serviceTypeController.getAll)
  );

router
  .route("/:id")
  .get(asyncHandler(serviceTypeController.getById))
  .patch(
    asyncHandler(checkPermission("servicetype.update")),
    validateResource(ServiceTypeSchemaInput),
    asyncHandler(serviceTypeController.update)
  )
  .delete(asyncHandler(serviceTypeController.delete));

module.exports = router;
