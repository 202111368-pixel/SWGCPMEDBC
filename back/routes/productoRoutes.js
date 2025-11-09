const express = require("express");
const router = express.Router();
const { registerProducto, getProductos } = require("../controllers/productoController");

router.post("/crear", registerProducto);
router.get("/", getProductos);

module.exports = router;
