const Cliente = require("../models/Cliente");

// Registrar cliente con validación de existencia
exports.registerCliente = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, documento, ruc, tipo, giro, direccion, limiteCrediticio, estado } = req.body;

    const existente = await Cliente.findOne({ email });
    if (existente) return res.status(400).json({ msg: "El cliente ya existe" });

    const nuevoCliente = new Cliente({
      nombre, apellido, email, telefono,
      documento, ruc, tipo, giro, direccion,
      limiteCrediticio, estado: estado || "ACTIVO"
    });
    await nuevoCliente.save();

    res.status(201).json({ msg: "Cliente registrado correctamente", nuevoCliente });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar cliente" });
  }
};

// Listar todos los clientes (con filtro opcional por estado)
exports.getClientes = async (req, res) => {
  try {
    const { estado } = req.query;
    const filtro = estado ? { estado } : {};
    const clientes = await Cliente.find(filtro).sort({ createdAt: -1 });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener clientes" });
  }
};

// Actualizar cliente
exports.updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await Cliente.findByIdAndUpdate(id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ msg: "Cliente no encontrado" });
    res.json({ msg: "Cliente actualizado correctamente", actualizado });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar cliente" });
  }
};

// Registrar Cotización para un cliente
exports.addCotizacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { monto } = req.body;

    const cliente = await Cliente.findById(id);
    if (!cliente) return res.status(404).json({ msg: "Cliente no encontrado" });

    cliente.cotizaciones.push({ monto });
    await cliente.save();

    res.json({ msg: "Cotización registrada", cotizaciones: cliente.cotizaciones });
  } catch (error) {
    res.status(500).json({ error: "Error al procesar cotización" });
  }
};

// Registrar Pago
exports.addPago = async (req, res) => {
  try {
    const { id } = req.params;
    const { monto, metodo } = req.body;

    const cliente = await Cliente.findByIdAndUpdate(
      id,
      { $push: { pagos: { monto, metodo } } },
      { new: true }
    );

    res.json({ msg: "Pago registrado con éxito", historialPagos: cliente.pagos });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar pago" });
  }
};

// Eliminar
exports.deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    await Cliente.findByIdAndDelete(id);
    res.json({ msg: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar" });
  }
};