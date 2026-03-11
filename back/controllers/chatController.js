const Chat = require("../models/Chat");

exports.enviarMensaje = async (req, res) => {
  try {
    const nuevoMensaje = new Chat({
      emisor: req.user.id,
      mensaje: req.body.mensaje,
      sala: req.body.sala || "general"
    });
    await nuevoMensaje.save();
    res.status(201).json(nuevoMensaje);
  } catch (error) {
    res.status(500).json({ error: "Error al enviar mensaje" });
  }
};

exports.getMensajes = async (req, res) => {
  try {
    const mensajes = await Chat.find().populate("emisor", "nombres");
    res.json(mensajes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener mensajes" });
  }
};