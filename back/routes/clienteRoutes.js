const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");

// Rutas básicas
router.post("/crear", clienteController.registerCliente);
router.get("/", clienteController.getClientes);
router.delete("/:id", clienteController.deleteCliente);

// Rutas de Negocio 
router.post("/cotizar/:id", clienteController.addCotizacion);
router.post("/pagar/:id", clienteController.addPago);

module.exports = router;