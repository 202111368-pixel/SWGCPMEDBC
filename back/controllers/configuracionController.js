let configuraciones = [];

exports.registerConfig = (req, res) => {
  const { parametro, valor } = req.body;

  const nuevo = { id: configuraciones.length + 1, parametro, valor };
  configuraciones.push(nuevo);

  res.json({ msg: "Configuración guardada correctamente", configuracion: nuevo });
};

exports.getConfigs = (req, res) => {
  res.json(configuraciones);
};

exports.updateConfig = (req, res) => {
  const { id, parametro, valor } = req.body;
  const conf = configuraciones.find(c => c.id == id);
  if (!conf) return res.status(404).json({ msg: "Configuración no encontrada" });

  if (parametro) conf.parametro = parametro;
  if (valor) conf.valor = valor;

  res.json({ msg: "Configuración actualizada", configuracion: conf });
};

exports.deleteConfig = (req, res) => {
  const { id } = req.body;
  const index = configuraciones.findIndex(c => c.id == id);
  if (index === -1) return res.status(404).json({ msg: "Configuración no encontrada" });

  configuraciones.splice(index, 1);
  res.json({ msg: "Configuración eliminada correctamente" });
};
