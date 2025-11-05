const express = require("express");
const router = express.Router();
const { crearAdmin, listarAdmins } = require("../controllers/adminController");

router.post("/crear", crearAdmin);
router.get("/", listarAdmins);

module.exports = router;
