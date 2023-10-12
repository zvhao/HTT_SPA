"use strict";

const { Router } = require("express");
const comboController = require("../controllers/combo.controller");
const { asyncHandler } = require("../utils/asyncHandler.util");
const { ComboSchemaInput } = require("../schema/combo.schema");

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
    asyncHandler(checkPermission("combo.add")),
    validateResource(ComboSchemaInput),
    asyncHandler(comboController.create)
  )
  .get(
    asyncHandler(checkPermission("combo.view")),
    asyncHandler(comboController.getAll)
  );

router
  .route("/:id")
  .get(asyncHandler(comboController.getById))
  .patch(
    validateResource(ComboSchemaInput),
    asyncHandler(checkPermission("combo.update")),
    asyncHandler(comboController.update)
  )
  .delete(asyncHandler(comboController.delete));

module.exports = router;
