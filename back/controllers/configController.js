const Configuracion = require("../models/Configuracion");
const Material = require("../models/Material");

// 1. Obtener toda la configuración inicial
exports.getConfig = async (req, res) => {
  try {
    let config = await Configuracion.findOne();
    if (!config) {
      config = new Configuracion({ alertas: [], proveedores: [] });
      await config.save();
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: "Error al cargar configuración" });
  }
};

// 2. Guardar cambios en Alertas de Stock
exports.updateAlertas = async (req, res) => {
  try {
    const { alertas } = req.body;
    const config = await Configuracion.findOneAndUpdate({}, { alertas }, { new: true });
    
    for (const alerta of alertas) {
      await Material.updateMany({ nombre: alerta.material }, { stockMinimo: alerta.minimo });
    }

    res.json({ msg: "Alertas actualizadas correctamente", config });
  } catch (error) {
    res.status(400).json({ error: "Error al guardar alertas" });
  }
};

// 3. Gestión de Proveedores 
exports.addProveedor = async (req, res) => {
  try {
    const { empresa, contacto } = req.body;
    const config = await Configuracion.findOne();
    config.proveedores.push({ empresa, contacto });
    await config.save();
    res.json({ msg: "Proveedor añadido", proveedores: config.proveedores });
  } catch (error) {
    res.status(500).json({ error: "Error al añadir proveedor" });
  }
};

exports.deleteProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const config = await Configuracion.findOne();
    config.proveedores = config.proveedores.filter(p => p._id.toString() !== id);
    await config.save();
    res.json({ msg: "Proveedor eliminado", proveedores: config.proveedores });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar proveedor" });
  }
};

// 4. Generar Orden de Compra 
exports.generarOrdenCompra = async (req, res) => {
  try {
    const materialesBajos = await Material.find({
      $expr: { $lte: ["$stockActual", "$stockMinimo"] }
    });

    if (materialesBajos.length === 0) {
      return res.status(400).json({ msg: "No hay materiales bajo el stock mínimo" });
    }

    res.json({
      msg: "Orden de Compra Generada",
      detalles: materialesBajos.map(m => ({
        material: m.nombre,
        cantidadSugerida: m.stockMinimo * 2, 
        unidad: m.unidadMedida
      }))
    });
  } catch (error) {
    res.status(500).json({ error: "Error al generar requerimiento" });
  }
};