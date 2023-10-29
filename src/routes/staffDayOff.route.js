"use strict";

const { Router } = require("express");
const staffDayOffController = require("../controllers/staffDayOff.controller");
const { asyncHandler } = require("../utils/asyncHandler.util");

const { validateResource } = require("../middleware/request.middleware");
// const { StaffDayOffSchemaInput } = require("../schema/staffDayOff.schema");

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
    asyncHandler(checkPermission("dayoff.add")),
    // validateResource(StaffDayOffSchemaInput),
    asyncHandler(staffDayOffController.create)
  )
  .get(
    asyncHandler(checkPermission("dayoff.view")),
    asyncHandler(staffDayOffController.getAll)
  );
// router.route("/get/:token").get(asyncHandler(staffDayOffController.))
router
  .route("/:id")
  .get(
    asyncHandler(checkPermission("dayoff.view")),
    asyncHandler(staffDayOffController.getById)
  )
  .patch(
    asyncHandler(checkPermission("dayoff.update")),
    // validateResource(StaffDayOffSchemaInput),
    asyncHandler(staffDayOffController.update)
  );

module.exports = router;
