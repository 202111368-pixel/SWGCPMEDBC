const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let usuarios = []; 

// Registrar usuario
exports.registerUser = async (req, res) => {
  const { nombres, apellidos, email, password, rol } = req.body;

  const existente = usuarios.find(u => u.email === email);
  if (existente) {
    return res.status(400).json({ msg: "El usuario ya existe" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const nuevoUsuario = { nombres, apellidos, email, password: hashedPassword, rol };
  usuarios.push(nuevoUsuario);

  res.json({ msg: "Usuario registrado correctamente", usuario: nuevoUsuario });
};

// Login usuario
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const usuario = usuarios.find(u => u.email === email);

  if (!usuario) return res.status(400).json({ msg: "Usuario no encontrado" });

  const coincide = await bcrypt.compare(password, usuario.password);
  if (!coincide) return res.status(400).json({ msg: "Contraseña incorrecta" });

  const token = jwt.sign({ email: usuario.email, rol: usuario.rol }, "clave_secreta", {
    expiresIn: "1h",
  });

  res.json({
    msg: "Login exitoso",
    token,
    usuario: {
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      email: usuario.email,
      rol: usuario.rol,
    },
  });
};

exports.getUsers = (req, res) => {
  res.json(usuarios);
};
