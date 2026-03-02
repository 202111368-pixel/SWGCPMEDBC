let ventas = [];

exports.createVenta = (req, res) => {
  const { clienteId, productoId, cantidad, total } = req.body;

  const nuevaVenta = {
    id: ventas.length + 1,
    clienteId,
    productoId,
    cantidad,
    total,
    estado: "Pendiente"
  };

  ventas.push(nuevaVenta);

  res.json({ msg: "Venta creada correctamente", venta: nuevaVenta });
};

exports.getVentas = (req, res) => {
  res.json(ventas);
};

exports.updateEstadoVenta = (req, res) => {
  const { id, estado } = req.body;
  const venta = ventas.find(v => v.id == id);

  if (!venta) {
    return res.status(404).json({ msg: "Venta no encontrada" });
  }

  venta.estado = estado;
  res.json({ msg: "Venta actualizada", venta });
};

exports.deleteVenta = (req, res) => {
  const { id } = req.body;
  const index = ventas.findIndex(v => v.id == id);

  if (index === -1) {
    return res.status(404).json({ msg: "Venta no encontrada" });
  }

  ventas.splice(index, 1);
  res.json({ msg: "Venta eliminada correctamente" });
};