const express = require("express");
const router = express.Router();

const { getReporteVentas } = require("../controllers/reporteController");

router.get("/", getReporteVentas);

module.exports = router;