const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    try {
        const { email, password, apellidos, dni, telefono, rol, nombres } = req.body;

        let user = await User.findOne({ $or: [{ email }, { dni }] });
        if (user) return res.status(400).json({ msg: "El usuario (Email o DNI) ya existe" });

        user = new User({
            nombres: nombres || "Usuario",
            apellidos,
            email,
            password,
            dni,
            telefono,
            rol
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = { user: { id: user.id, rol: user.rol } };
        jwt.sign(payload, process.env.JWT_SECRET || "palabra_secreta", { expiresIn: "24h" }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ token, msg: "Usuario registrado con éxito" });
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Error en el servidor", error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Credenciales inválidas" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Credenciales inválidas" });

        const payload = { user: { id: user.id, rol: user.rol } };
        const token = jwt.sign(payload, process.env.JWT_SECRET || "palabra_secreta", { expiresIn: "24h" });

        res.json({ token, user: { rol: user.rol, nombres: user.nombres } });
    } catch (error) {
        res.status(500).json({ msg: "Error en login" });
    }
};