let productos = [];

exports.registerProducto = (req, res) => {
  const { nombre, precio, stock } = req.body;

  const nuevo = { id: productos.length + 1, nombre, precio, stock };
  productos.push(nuevo);

  res.json({ msg: "Producto registrado correctamente", producto: nuevo });
};

exports.getProductos = (req, res) => {
  res.json(productos);
};

exports.updateProducto = (req, res) => {
  const { id, nombre, precio, stock } = req.body;
  const producto = productos.find(p => p.id == id);
  if (!producto) return res.status(404).json({ msg: "Producto no encontrado" });

  if (nombre) producto.nombre = nombre;
  if (precio) producto.precio = precio;
  if (stock) producto.stock = stock;

  res.json({ msg: "Producto actualizado", producto });
};

exports.deleteProducto = (req, res) => {
  const { id } = req.body;
  const index = productos.findIndex(p => p.id == id);
  if (index === -1) return res.status(404).json({ msg: "Producto no encontrado" });

  productos.splice(index, 1);
  res.json({ msg: "Producto eliminado correctamente" });
};
