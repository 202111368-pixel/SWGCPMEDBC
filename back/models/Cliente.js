const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  apellido: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  telefono: { type: String },
  cotizaciones: [{
    fecha: { type: Date, default: Date.now },
    monto: Number,
    estado: { type: String, enum: ['Pendiente', 'Aprobada', 'Rechazada'], default: 'Pendiente' }
  }],
  pagos: [{
    fecha: { type: Date, default: Date.now },
    monto: Number,
    metodo: String
  }]
}, { timestamps: true });

module.exports = mongoose.model("Cliente", clienteSchema);