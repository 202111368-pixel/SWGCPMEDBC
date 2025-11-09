const express = require("express");
const router = express.Router();
const { registerInventario, getInventarios } = require("../controllers/inventarioController");

router.post("/crear", registerInventario);
router.get("/", getInventarios);

module.exports = router;
