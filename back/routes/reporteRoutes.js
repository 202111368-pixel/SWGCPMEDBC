const express = require("express");
const router = express.Router();
const reporteController = require("../controllers/reporteController");
const auth = require("../middleware/auth");

// Endpoint principal para el Dashboard
router.get("/dashboard", auth, reporteController.getDashboardStats);

// Gestión de registros del panel
router.post("/nuevo", auth, reporteController.createProyecto);

module.exports = router;