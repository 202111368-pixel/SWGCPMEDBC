const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const auth = require("../middleware/auth");

router.post("/", auth, productoController.registrarProducto);
router.get("/catalogo", auth, productoController.getCatalogo);

router.put("/stock/:id", auth, productoController.updateStockFisico);

router.delete("/:id", auth, productoController.eliminarProducto);

module.exports = router;