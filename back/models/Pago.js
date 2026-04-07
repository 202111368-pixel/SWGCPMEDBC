const mongoose = require('mongoose');

const PagoSchema = new mongoose.Schema({

    id_pago: {
        type: Number,
        required: true
    },
    cliente: {
        type: String,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        default: "PENDIENTE"
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Pago', PagoSchema);