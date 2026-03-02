const express = require("express");
const router = express.Router();

const {
  createVenta,
  getVentas,
  updateEstadoVenta,
  deleteVenta
} = require("../controllers/ventaController");

router.post("/crear", createVenta);
router.get("/", getVentas);
router.put("/actualizar", updateEstadoVenta);
router.delete("/eliminar", deleteVenta);

module.exports = router;