const express = require("express");
const router = express.Router();

const {
  createPago,
  getPagos,
  deletePago
} = require("../controllers/pagoController");

router.post("/crear", createPago);
router.get("/", getPagos);
router.delete("/eliminar", deletePago);

module.exports = router;