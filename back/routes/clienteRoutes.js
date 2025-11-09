const express = require("express");
const router = express.Router();
const { registerCliente, getClientes } = require("../controllers/clienteController");

router.post("/crear", registerCliente);
router.get("/", getClientes);

module.exports = router;
