const express = require("express");
const router = express.Router();
const { registerAdmin, getAdmins } = require("../controllers/adminController");

router.post("/crear", registerAdmin);
router.get("/", getAdmins);

module.exports = router;
