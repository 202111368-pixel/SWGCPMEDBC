const express = require("express");
const router = express.Router();
const cajeroController = require("../controllers/cajeroController");
const auth = require("../middleware/auth");

router.post("/nueva-venta", auth, cajeroController.crearVenta);

module.exports = router;