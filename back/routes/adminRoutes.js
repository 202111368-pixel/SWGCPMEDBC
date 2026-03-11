const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Endpoints de Configuración
router.get("/config", adminController.getSystemConfig);
router.put("/config/:id", adminController.updateSystemConfig);

// Endpoints de Gestión de Usuarios
router.get("/usuarios", adminController.getAllUsers);
router.put("/usuarios/rol", adminController.changeUserRole);
router.delete("/usuarios/:id", adminController.deleteUserAccount);

module.exports = router;