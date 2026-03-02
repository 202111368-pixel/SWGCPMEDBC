const express = require("express");
const router = express.Router();

const {
  createProduccion,
  getProducciones,
  updateProduccion
} = require("../controllers/produccionController");

router.post("/crear", createProduccion);
router.get("/", getProducciones);
router.put("/actualizar", updateProduccion);

module.exports = router;