const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productoRoutes = require("./routes/productoRoutes");
const inventarioRoutes = require("./routes/inventarioRoutes");
const configuracionRoutes = require("./routes/configuracionRoutes");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/inventario", inventarioRoutes);
app.use("/api/configuracion", configuracionRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
