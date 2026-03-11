const Cliente = require("../models/Cliente");

// Registrar cliente con validación de existencia
exports.registerCliente = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono } = req.body;

    const existente = await Cliente.findOne({ email });
    if (existente) return res.status(400).json({ msg: "El cliente ya existe" });

    const nuevoCliente = new Cliente({ nombre, apellido, email, telefono });
    await nuevoCliente.save();

    res.status(201).json({ msg: "Cliente registrado correctamente", nuevoCliente });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar cliente" });
  }
};

// Listar todos los clientes
exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find().sort({ createdAt: -1 });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener clientes" });
  }
};

// Registrar una Cotización para un cliente
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

// Registrar un Pago 
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