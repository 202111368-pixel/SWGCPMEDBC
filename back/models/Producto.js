const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true }, 
  categoria: { 
    type: String, 
    enum: ['Tablero', 'Tapacanto', 'Herraje', 'Accesorio'], 
    required: true 
  },
  texturaColor: { type: String, required: true }, 
  medidas: { type: String }, 
  stockFisico: { type: Number, default: 0 },
  precioVenta: { type: Number, required: true },
  imagenUrl: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Producto", productoSchema);