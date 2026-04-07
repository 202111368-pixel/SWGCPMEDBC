const Pago = require('../models/Pago');

exports.getPagos = async (req, res) => {
    try {
        const pagos = await Pago.find();
        res.json(pagos);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

exports.createPago = async (req, res) => {
    try {
        const nuevoPago = new Pago(req.body);
        await nuevoPago.save();
        res.json(nuevoPago);
    } catch (error) {
        res.status(400).json({ msg: "Error al crear" });
    }
};

exports.deletePago = async (req, res) => {
    try {
        await Pago.findByIdAndDelete(req.params.id);
        res.json({ msg: "Eliminado" });
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar" });
    }
};

exports.updatePago = async (req, res) => {
    try {
        const { id_pago, cliente, monto } = req.body;
        const pagoActualizado = await Pago.findByIdAndUpdate(
            req.params.id,
            { id_pago, cliente, monto },
            { new: true } // Esto devuelve el dato ya modificado
        );
        res.json(pagoActualizado);
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar en la base de datos" });
    }
};