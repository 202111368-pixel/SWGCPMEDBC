import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MONGODB_URI=mongodb://127.0.0.1:27017/dbary_melamina
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dbary_melamina";

app.use(cors());
app.use(express.json());
//  Conexión a MongoDB
mongoose
  .connect(MONGODB_URI, {
    dbName: "dbary_melamina", 
  })
  .then(() => console.log("✅ Conectado a MongoDB (D'Bary Company)"))
  .catch((err) => console.error("❌ Error de conexión a MongoDB:", err.message));

const genericSchema = new mongoose.Schema({}, { strict: false });

const models = {
  almacen:
    mongoose.models.almacen || mongoose.model("almacen", genericSchema),
  cotizaciones:
    mongoose.models.cotizaciones || mongoose.model("cotizaciones", genericSchema),
  ventas:
    mongoose.models.ventas || mongoose.model("ventas", genericSchema),
  compras:
    mongoose.models.compras || mongoose.model("compras", genericSchema),
  inventario:
    mongoose.models.inventario || mongoose.model("inventario", genericSchema),
  produccion:
    mongoose.models.produccion || mongoose.model("produccion", genericSchema),
  personal:
    mongoose.models.personal || mongoose.model("personal", genericSchema),
  configuracion:
    mongoose.models.configuracion || mongoose.model("configuracion", genericSchema),
};

// Rutas genéricas para cada colección (GET y POST)
Object.keys(models).forEach((nombre) => {
  app.get(`/api/${nombre}`, async (req, res) => {
    try {
      const data = await models[nombre].find();
      res.json(data);
    } catch (error) {
      console.error(`❌ Error al obtener datos de ${nombre}:`, error.message);
      res.status(500).json({ error: `Error al obtener datos de ${nombre}` });
    }
  });

  // Crear un nuevo registro
  app.post(`/api/${nombre}`, async (req, res) => {
    try {
      const nuevo = new models[nombre](req.body);
      await nuevo.save();
      res.json({
        mensaje: `✅ Nuevo registro agregado a ${nombre}`,
        data: nuevo,
      });
    } catch (error) {
      console.error(`❌ Error al guardar en ${nombre}:`, error.message);
      res.status(500).json({ error: `Error al guardar en ${nombre}` });
    }
  });
});

// 🚀 Levantar servidor
app.listen(PORT, () =>
  console.log(`Servidor activo en 👉 http://localhost:${PORT}`)
);
