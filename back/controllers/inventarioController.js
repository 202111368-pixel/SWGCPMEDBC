let inventarios = [];

exports.registerInventario = (req, res) => {
  const { producto, cantidad, fechaIngreso } = req.body;

  const nuevo = { id: inventarios.length + 1, producto, cantidad, fechaIngreso };
  inventarios.push(nuevo);

  res.json({ msg: "Inventario agregado correctamente", inventario: nuevo });
};

exports.getInventarios = (req, res) => {
  res.json(inventarios);
};

exports.updateInventario = (req, res) => {
  const { id, producto, cantidad, fechaIngreso } = req.body;
  const inv = inventarios.find(i => i.id == id);
  if (!inv) return res.status(404).json({ msg: "Inventario no encontrado" });

  if (producto) inv.producto = producto;
  if (cantidad) inv.cantidad = cantidad;
  if (fechaIngreso) inv.fechaIngreso = fechaIngreso;

  res.json({ msg: "Inventario actualizado", inventario: inv });
};

exports.deleteInventario = (req, res) => {
  const { id } = req.body;
  const index = inventarios.findIndex(i => i.id == id);
  if (index === -1) return res.status(404).json({ msg: "Inventario no encontrado" });

  inventarios.splice(index, 1);
  res.json({ msg: "Inventario eliminado correctamente" });
};
