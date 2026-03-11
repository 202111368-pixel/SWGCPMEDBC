const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  tipo: { type: String, enum: ['Tablero', 'Tapacanto', 'Accesorio'], required: true },
  medida: { type: String }, 
  color: { type: String },
  stockActual: { type: Number, default: 0 },
  stockMinimo: { type: Number, default: 5 }, 
  unidadMedida: { type: String, enum: ['Unidad', 'Metros', 'Paquete'], default: 'Unidad' },
  proveedor: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Material", materialSchema);