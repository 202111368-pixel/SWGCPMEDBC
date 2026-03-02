let entregas = [];

exports.createEntrega = (req, res) => {
  const { ventaId, direccion } = req.body;

  const nueva = {
    id: entregas.length + 1,
    ventaId,
    direccion,
    estado: "Pendiente"
  };

  entregas.push(nueva);

  res.json({ msg: "Entrega registrada", entrega: nueva });
};

exports.getEntregas = (req, res) => {
  res.json(entregas);
};

exports.updateEntrega = (req, res) => {
  const { id, estado } = req.body;
  const entrega = entregas.find(e => e.id == id);

  if (!entrega) {
    return res.status(404).json({ msg: "Entrega no encontrada" });
  }

  entrega.estado = estado;
  res.json({ msg: "Entrega actualizada", entrega });
};