const express = require("express");
const router = express.Router();
const { crearInventario, listarInventario } = require("../controllers/inventarioController");

router.post("/crear", crearInventario);
router.get("/", listarInventario);

module.exports = router;
