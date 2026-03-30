const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// --- CONFIGURACIÓN DE CORS ---
// Agregamos lógica para permitir Postman (que no envía origen) y tus dos Frontends
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Error de CORS: Origen no permitido por seguridad'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// --- CONEXIÓN A MONGODB ---
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/carpinteria")
    .then(() => console.log("✅ Servidor conectado a MongoDB"))
    .catch(err => console.error("❌ Error de conexión:", err));

// --- DEFINICIÓN DE RUTAS ---

// Ruta para el registro de tus compañeros (Apunta a tu archivo de rutas)
app.use("/api/users", require("./routes/userRoutes"));

// Resto de rutas del sistema
app.use("/api/clientes", require("./routes/clienteRoutes"));
app.use("/api/cajero", require("./routes/cajeroRoutes"));
app.use("/api/almacen", require("./routes/almacenRoutes"));
app.use("/api/reportes", require("./routes/reporteRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/configuracion", require("./routes/configRoutes"));
app.use("/api/productos", require("./routes/productoRoutes"));

// --- MANEJO DE ERRORES GLOBAL ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ msg: 'Algo salió mal en el servidor' });
});

// --- INICIO DEL SERVIDOR ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 ==========================================`);
    console.log(`🚀 SERVIDOR D'BARY COMPANY CORRIENDO EN: ${PORT}`);
    console.log(`📡 Endpoint Registro: http://localhost:5000/api/users/register`);
    console.log(`============================================\n`);
});