let admins = [];

exports.registerAdmin = (req, res) => {
  const { nombre, email, rol } = req.body;

  const existente = admins.find(a => a.email === email);
  if (existente) return res.status(400).json({ msg: "El admin ya existe" });

  const nuevo = { id: admins.length + 1, nombre, email, rol };
  admins.push(nuevo);

  res.json({ msg: "Admin registrado correctamente", admin: nuevo });
};

exports.getAdmins = (req, res) => {
  res.json(admins);
};

exports.updateAdmin = (req, res) => {
  const { id, nombre, email, rol } = req.body;
  const admin = admins.find(a => a.id == id);
  if (!admin) return res.status(404).json({ msg: "Admin no encontrado" });

  if (nombre) admin.nombre = nombre;
  if (email) admin.email = email;
  if (rol) admin.rol = rol;

  res.json({ msg: "Admin actualizado", admin });
};

exports.deleteAdmin = (req, res) => {
  const { id } = req.body;
  const index = admins.findIndex(a => a.id == id);
  if (index === -1) return res.status(404).json({ msg: "Admin no encontrado" });

  admins.splice(index, 1);
  res.json({ msg: "Admin eliminado correctamente" });
};
