const Material = require("../models/Material");

// 1. Registrar entrada de material 
exports.registrarEntrada = async (req, res) => {
  try {
    const { nombre, tipo, cantidad, stockMinimo, unidadMedida } = req.body;
    
    let material = await Material.findOne({ nombre, tipo });

    if (material) {
      material.stockActual += cantidad;
      await material.save();
    } else {
      material = new Material(req.body);
      material.stockActual = cantidad;
      await material.save();
    }

    res.status(200).json({ msg: "Inventario actualizado", material });
  } catch (error) {
    res.status(500).json({ error: "Error al procesar entrada de almacén" });
  }
};

// 2. Obtener Alertas de Stock Bajo 
exports.getAlertasStock = async (req, res) => {
  try {
    const alertas = await Material.find({
      $expr: { $lte: ["$stockActual", "$stockMinimo"] }
    });

    res.json({
      count: alertas.length,
      necesitanReposicion: alertas
    });
  } catch (error) {
    res.status(500).json({ error: "Error al consultar alertas" });
  }
};

// 3. Ajuste de Inventario 
exports.ajusteInventario = async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidadARestar, motivo } = req.body;

    const material = await Material.findById(id);
    if (!material) return res.status(404).json({ msg: "Material no encontrado" });

    material.stockActual -= cantidadARestar;
    if (material.stockActual < 0) material.stockActual = 0;

    await material.save();
    res.json({ msg: `Ajuste por ${motivo} realizado`, stockRestante: material.stockActual });
  } catch (error) {
    res.status(500).json({ error: "Error al realizar ajuste" });
  }
};

// 4. Listar Inventario Completo
exports.getInventario = async (req, res) => {
  try {
    const inventario = await Material.find().sort({ tipo: 1 });
    res.json(inventario);
  } catch (error) {
    res.status(500).json({ error: "Error al listar materiales" });
  }
};