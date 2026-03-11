const Producto = require("../models/Producto");

exports.registrarProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json({ msg: "Producto añadido al catálogo", nuevoProducto });
  } catch (error) {
    res.status(400).json({ error: "Error al registrar especificaciones técnicas" });
  }
};

exports.getCatalogo = async (req, res) => {
  try {
    const { categoria } = req.query;
    const filtro = categoria ? { categoria } : {};
    const productos = await Producto.find(filtro).sort({ nombre: 1 });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener catálogo" });
  }
};

exports.updateStockFisico = async (req, res) => {
  try {
    const { id } = req.params;
    const { nuevaCantidad, operacion } = req.body; 

    const producto = await Producto.findById(id);
    if (!producto) return res.status(404).json({ msg: "Producto no existe" });

    if (operacion === 'sumar') {
      producto.stockFisico += nuevaCantidad;
    } else if (operacion === 'restar') {
      if (producto.stockFisico < nuevaCantidad) {
        return res.status(400).json({ msg: "Stock insuficiente para la operación" });
      }
      producto.stockFisico -= nuevaCantidad;
    }

    await producto.save();
    res.json({ msg: "Stock físico actualizado", stockActual: producto.stockFisico });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar existencias" });
  }
};

// Eliminar del catálogo
exports.eliminarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ msg: "Producto eliminado del catálogo" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar" });
  }
};