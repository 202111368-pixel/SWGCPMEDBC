import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/admin_db", { dbName: "admin_db" })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error de conexión a MongoDB:", err));

const models = {
  almacen: mongoose.model("almacen", new mongoose.Schema({}, { strict: false })),
  caja: mongoose.model("caja", new mongoose.Schema({}, { strict: false })),
  compras: mongoose.model("compras", new mongoose.Schema({}, { strict: false })),
  configuracion: mongoose.model("configuracion", new mongoose.Schema({}, { strict: false })),
  cotizaciones: mongoose.model("cotizaciones", new mongoose.Schema({}, { strict: false })),
  inventario: mongoose.model("inventario", new mongoose.Schema({}, { strict: false })),
  productos: mongoose.model("productos", new mongoose.Schema({}, { strict: false })),
  ventas: mongoose.model("ventas", new mongoose.Schema({}, { strict: false })),
};

Object.keys(models).forEach((nombre) => {
  app.get(`/api/${nombre}`, async (req, res) => {
    const data = await models[nombre].find();
    res.json(data);
  });

  app.post(`/api/${nombre}`, async (req, res) => {
    const nuevo = new models[nombre](req.body);
    await nuevo.save();
    res.json({ mensaje: `Nuevo registro agregado a ${nombre}` });
  });
});

app.listen(PORT, () => console.log(`Servidor activo en http://localhost:${PORT}`));
