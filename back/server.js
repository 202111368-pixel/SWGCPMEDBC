const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Soporte para ambos (Login y Admin)
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Error de CORS: Origen no permitido'));
        }
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/carpinteria")
    .then(() => console.log("✅ Servidor conectado a MongoDB"))
    .catch(err => console.error("❌ Error de conexión:", err));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/clientes", require("./routes/clienteRoutes"));
app.use("/api/cajero", require("./routes/cajeroRoutes"));
app.use("/api/almacen", require("./routes/almacenRoutes"));
app.use("/api/reportes", require("./routes/reporteRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/configuracion", require("./routes/configRoutes"));
app.use("/api/productos", require("./routes/productoRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 SERVIDOR CORRIENDO EN PUERTO ${PORT}`);
    console.log(`📡 Esperando peticiones de Postman y Frontends...`);
});