const express = require("express");
const router = express.Router();
const { registerConfig, getConfigs } = require("../controllers/configuracionController");

router.post("/crear", registerConfig);
router.get("/", getConfigs);

module.exports = router;
