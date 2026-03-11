const Proyecto = require("../models/Proyecto");
const Venta = require("../models/Venta");

exports.getDashboardStats = async (req, res) => {
  try {
    // 1. Cálculo de Ventas Totales 
    const ventasTotales = await Proyecto.aggregate([
      { $group: { _id: null, totalSum: { $sum: "$total" } } }
    ]);

    // 2. Cálculo de Merma Promedio
    const mermaPromedio = await Proyecto.aggregate([
      { $group: { _id: null, avgMerma: { $avg: "$mermaPorcentaje" } } }
    ]);

    // 3. Proyectos Activos 
    const proyectosActivos = await Proyecto.countDocuments({ estado: "Producción" });

    // 4. Lista para la tabla
    const listaProyectos = await Proyecto.find().sort({ createdAt: -1 });

    res.status(200).json({
      stats: {
        ventasTotales: ventasTotales[0]?.totalSum || 0,
        mermaPromedio: Math.round(mermaPromedio[0]?.avgMerma || 0),
        proyectosActivos
      },
      proyectos: listaProyectos
    });
  } catch (error) {
    res.status(500).json({ error: "Error al generar métricas del panel" });
  }
};

// Crear nuevo proyecto 
exports.createProyecto = async (req, res) => {
  try {
    const nuevoProyecto = new Proyecto(req.body);
    await nuevoProyecto.save();
    res.status(201).json({ msg: "Proyecto añadido al reporte", nuevoProyecto });
  } catch (error) {
    res.status(400).json({ error: "Error al crear registro de proyecto" });
  }
};