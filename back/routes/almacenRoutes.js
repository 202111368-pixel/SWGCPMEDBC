const express = require("express");
const router = express.Router();
const almacenController = require("../controllers/almacenController");
const auth = require("../middleware/auth");
router.get("/stock", auth, almacenController.getInventario);
router.get("/alertas", auth, almacenController.getAlertasStock);
router.post("/entrada", auth, almacenController.registrarEntrada);
router.put("/ajuste/:id", auth, almacenController.ajusteInventario);

module.exports = router;