"use strict";

const { Router } = require("express");

const router = Router();

router.use("/api/v1/permissions", require("./permission.route"));
router.use("/api/v1/roles", require("./role.route"));
router.use("/api/v1/owners", require("./owner.route"));
router.use("/api/v1/branches", require("./branch.route"));
router.use("/api/v1/staffs", require("./staff.route"));

module.exports = router;
