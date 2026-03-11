const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
    nombreEmpresa: { type: String, required: true, trim: true },
    ruc: { type: String, required: true, unique: true },
    direccion: { type: String },
    telefono: { type: String },
    moneda: { type: String, default: "PEN" },
    impuesto: { type: Number, default: 0.18 }
}, { 
    timestamps: true,
    versionKey: false 
});

module.exports = mongoose.model("Config", configSchema);