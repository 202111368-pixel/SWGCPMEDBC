const mongoose = require("mongoose");

const ventaSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  productos: [{
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
    cantidad: Number,
    precioUnitario: Number
  }],
  total: { type: Number, required: true },
  metodoPago: { type: String, enum: ['Efectivo', 'Tarjeta', 'Transferencia'], required: true },
  estadoPago: { type: String, enum: ['Pendiente', 'Validado', 'Rechazado'], default: 'Pendiente' },
  comprobante: { type: String, unique: true }, 
  cajero: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model("Venta", ventaSchema);