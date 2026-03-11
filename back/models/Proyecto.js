const mongoose = require("mongoose");

const proyectoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cliente: { type: String, required: true },
  mermaPorcentaje: { type: Number, default: 0 },
  estado: { type: String, enum: ['Producción', 'Entregado', 'Cancelado'], default: 'Producción' },
  total: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Proyecto", proyectoSchema);