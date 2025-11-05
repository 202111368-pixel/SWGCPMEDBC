const express = require("express");
const router = express.Router();
const { crearProducto, listarProductos } = require("../controllers/productoController");

router.post("/crear", crearProducto);
router.get("/", listarProductos);

module.exports = router;
