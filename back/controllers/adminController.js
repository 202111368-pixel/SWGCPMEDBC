const User = require("../models/User");
const Config = require("../models/Config");

// GESTIÓN DE CONFIGURACIÓN
exports.getSystemConfig = async (req, res) => {
    try {
        const settings = await Config.findOne();
        res.status(200).json(settings || { msg: "No hay configuración inicial" });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener configuración" });
    }
};

exports.updateSystemConfig = async (req, res) => {
    try {
        const { id } = req.params;
        const configActualizada = await Config.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ msg: "Configuración actualizada", configActualizada });
    } catch (error) {
        res.status(400).json({ error: "Error al actualizar datos del sistema" });
    }
};

// GESTIÓN DE ROLES Y USUARIOS
exports.getAllUsers = async (req, res) => {
    try {
        const usuarios = await User.find({}, "-password"); 
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error al listar usuarios" });
    }
};

exports.changeUserRole = async (req, res) => {
    try {
        const { userId, nuevoRol } = req.body;
        const usuario = await User.findByIdAndUpdate(
            userId, 
            { rol: nuevoRol }, 
            { new: true }
        ).select("-password");
        
        if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });
        res.status(200).json({ msg: "Rol actualizado con éxito", usuario });
    } catch (error) {
        res.status(500).json({ error: "Error al cambiar el rol" });
    }
};

exports.deleteUserAccount = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ msg: "Usuario eliminado del sistema" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar" });
    }
};