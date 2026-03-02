let pagos = [];

exports.createPago = (req, res) => {
  const { ventaId, monto, metodo } = req.body;

  const nuevoPago = {
    id: pagos.length + 1,
    ventaId,
    monto,
    metodo
  };

  pagos.push(nuevoPago);

  res.json({ msg: "Pago registrado", pago: nuevoPago });
};

exports.getPagos = (req, res) => {
  res.json(pagos);
};

exports.deletePago = (req, res) => {
  const { id } = req.body;
  const index = pagos.findIndex(p => p.id == id);

  if (index === -1) {
    return res.status(404).json({ msg: "Pago no encontrado" });
  }

  pagos.splice(index, 1);
  res.json({ msg: "Pago eliminado" });
};