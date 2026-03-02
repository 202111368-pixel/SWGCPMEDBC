const express = require("express");
const router = express.Router();

const {
  enviarMensaje,
  getMensajes
} = require("../controllers/chatController");

router.post("/crear", enviarMensaje);
router.get("/", getMensajes);

module.exports = router;