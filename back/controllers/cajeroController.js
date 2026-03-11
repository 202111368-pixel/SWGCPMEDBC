const Venta = require("../models/Venta");
const Producto = require("../models/Producto");

// 1. Crear Venta 
exports.crearVenta = async (req, res) => {
  try {
    const { cliente, productos, total, metodoPago, comprobante } = req.body;

    const nuevaVenta = new Venta({
      cliente,
      productos,
      total,
      metodoPago,
      comprobante,
      cajero: req.user.id 
    });

    await nuevaVenta.save();
    res.status(201).json({ msg: "Venta registrada, pendiente de validación", nuevaVenta });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar la venta" });
  }
};

// 2. Confirmación de Pago 
exports.confirmarPago = async (req, res) => {
  try {
    const { id } = req.params;
    const venta = await Venta.findById(id);

    if (!venta) return res.status(404).json({ msg: "Venta no encontrada" });
    if (venta.estadoPago === 'Validado') return res.status(400).json({ msg: "Esta venta ya fue pagada" });

    venta.estadoPago = 'Validado';
    await venta.save();

    for (const item of venta.productos) {
      await Producto.findByIdAndUpdate(item.producto, { $inc: { stock: -item.cantidad } });
    }

    res.json({ msg: "Pago confirmado y stock actualizado", venta });
  } catch (error) {
    res.status(500).json({ error: "Error en la validación" });
  }
};

// 3. Consulta de Caja 
exports.getReporteCaja = async (req, res) => {
  try {
    const inicioDia = new Date();
    inicioDia.setHours(0, 0, 0, 0);

    const ventasDia = await Venta.find({
      createdAt: { $gte: inicioDia },
      estadoPago: 'Validado'
    }).populate('cliente', 'nombre apellido');

    const totalCaja = ventasDia.reduce((acc, v) => acc + v.total, 0);

    res.json({ count: ventasDia.length, total: totalCaja, ventas: ventasDia });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener reporte de caja" });
  }
};