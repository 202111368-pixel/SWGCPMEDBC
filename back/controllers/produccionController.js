let producciones = [];

exports.createProduccion = (req, res) => {
  const { ventaId, fechaEntrega } = req.body;

  const nueva = {
    id: producciones.length + 1,
    ventaId,
    fechaEntrega,
    estado: "En fabricación"
  };

  producciones.push(nueva);

  res.json({ msg: "Producción creada", produccion: nueva });
};

exports.getProducciones = (req, res) => {
  res.json(producciones);
};

exports.updateProduccion = (req, res) => {
  const { id, estado } = req.body;
  const produccion = producciones.find(p => p.id == id);

  if (!produccion) {
    return res.status(404).json({ msg: "Producción no encontrada" });
  }

  produccion.estado = estado;
  res.json({ msg: "Producción actualizada", produccion });
};