const express = require("express");
const router = express.Router();
const configController = require("../controllers/configController");
const auth = require("../middleware/auth");

router.get("/", auth, configController.getConfig);
router.put("/alertas", auth, configController.updateAlertas);
router.post("/proveedores", auth, configController.addProveedor);
router.delete("/proveedores/:id", auth, configController.deleteProveedor);
router.post("/generar-orden", auth, configController.generarOrdenCompra);

module.exports = router;