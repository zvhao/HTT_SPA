"use strict";

const { Router } = require("express");

const router = Router();

router.use("/api/v1/permissions", require("./permission.route"));
router.use("/api/v1/roles", require("./role.route"));
router.use("/api/v1/owners", require("./owner.route"));

module.exports = router;
