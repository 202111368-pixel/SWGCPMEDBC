const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const ventaRoutes = require("./routes/ventaRoutes");
const pagoRoutes = require("./routes/pagoRoutes");
const produccionRoutes = require("./routes/produccionRoutes");
const entregaRoutes = require("./routes/entregaRoutes");
const reporteRoutes = require("./routes/reporteRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



/*RUTAS */
app.use("/api/users", userRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/pagos", pagoRoutes);
app.use("/api/produccion", produccionRoutes);
app.use("/api/entregas", entregaRoutes);
app.use("/api/reportes", reporteRoutes);
app.use("/api/chat", chatRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));

//para postman  
//http://localhost:5000/api/users/register 
