const express = require("express");
const router = express.Router();
const { crearConfiguracion, listarConfiguraciones } = require("../controllers/configuracionController");

router.post("/crear", crearConfiguracion);
router.get("/", listarConfiguraciones);

module.exports = router;
