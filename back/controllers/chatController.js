let mensajes = [];

exports.enviarMensaje = (req, res) => {
  const { clienteId, mensaje, emisor } = req.body;

  const nuevo = {
    id: mensajes.length + 1,
    clienteId,
    mensaje,
    emisor
  };

  mensajes.push(nuevo);

  res.json({ msg: "Mensaje enviado", mensaje: nuevo });
};

exports.getMensajes = (req, res) => {
  res.json(mensajes);
};