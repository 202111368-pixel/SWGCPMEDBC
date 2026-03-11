const mongoose = require("mongoose");

const proveedorSchema = new mongoose.Schema({
  empresa: { type: String, required: true },
  contacto: { type: String, required: true }
});

const configuracionSchema = new mongoose.Schema({
  // Alertas de Stock 
  alertas: [{
    material: String,
    minimo: Number
  }],
  // Proveedores de Melamina
  proveedores: [proveedorSchema],
  // Datos para Orden de Compra
  proximaOrdenCorrelativo: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model("Configuracion", configuracionSchema);