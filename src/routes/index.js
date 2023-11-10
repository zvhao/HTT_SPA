"use strict";

const { Router } = require("express");

const router = Router();

router.use("/api/v1/permissions", require("./permission.route"));
router.use("/api/v1/roles", require("./role.route"));
router.use("/api/v1/owners", require("./owner.route"));
router.use("/api/v1/branches", require("./branch.route"));
router.use("/api/v1/staffs", require("./staff.route"));
router.use("/api/v1/customers", require("./customer.route"));
router.use("/api/v1/services", require("./service.route"));
router.use("/api/v1/serviceTypes", require("./servicetype.route"));
router.use("/api/v1/combos", require("./combo.route"));
router.use("/api/v1/courses", require("./course.route"));
router.use("/api/v1/uploads", require("./upload.route"));
router.use("/api/v1/staffDayOffs", require("./staffDayOff.route"));
router.use("/api/v1/booking", require("./booking.route"));

module.exports = router;
