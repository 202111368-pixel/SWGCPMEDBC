const express = require("express");
const router = express.Router();

const {
  createEntrega,
  getEntregas,
  updateEntrega
} = require("../controllers/entregaController");

router.post("/crear", createEntrega);
router.get("/", getEntregas);
router.put("/actualizar", updateEntrega);

module.exports = router;