let clientes = [];

// Registrar cliente
exports.registerCliente = (req, res) => {
  const { nombre, email, telefono } = req.body;

  const existente = clientes.find(c => c.email === email);
  if (existente) return res.status(400).json({ msg: "El cliente ya existe" });

  const nuevo = { id: clientes.length + 1, nombre, email, telefono };
  clientes.push(nuevo);

  res.json({ msg: "Cliente registrado correctamente", cliente: nuevo });
};

// Listar todos
exports.getClientes = (req, res) => {
  res.json(clientes);
};

// Actualizar
exports.updateCliente = (req, res) => {
  const { id, nombre, email, telefono } = req.body;
  const cliente = clientes.find(c => c.id == id);
  if (!cliente) return res.status(404).json({ msg: "Cliente no encontrado" });

  if (nombre) cliente.nombre = nombre;
  if (email) cliente.email = email;
  if (telefono) cliente.telefono = telefono;

  res.json({ msg: "Cliente actualizado", cliente });
};

// Eliminar
exports.deleteCliente = (req, res) => {
  const { id } = req.body;
  const index = clientes.findIndex(c => c.id == id);
  if (index === -1) return res.status(404).json({ msg: "Cliente no encontrado" });

  clientes.splice(index, 1);
  res.json({ msg: "Cliente eliminado correctamente" });
};
