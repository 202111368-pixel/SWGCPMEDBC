const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const auth = require("../middleware/auth");

router.post("/", auth, chatController.enviarMensaje); 
router.get("/", auth, chatController.getMensajes);

module.exports = router;