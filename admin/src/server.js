import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/admin_db";

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Conexión exitosa a MongoDB (admin_db)"))
  .catch((err) => console.error("❌ Error al conectar a Mongo:", err.message));

const genericSchema = new mongoose.Schema({}, { 
    strict: false, 
    timestamps: true 
});

const models = {
  administradores: mongoose.model("administradores", genericSchema),
  cajeros:         mongoose.model("cajeros", genericSchema),
  clientes:        mongoose.model("clientes", genericSchema),
  productos:       mongoose.model("productos", genericSchema),
  inventarios:     mongoose.model("inventarios", genericSchema),
  configuraciones: mongoose.model("configuraciones", genericSchema),
  reportes:        mongoose.model("reportes", genericSchema),
};

Object.keys(models).forEach((nombre) => {
  
  app.post(`/api/${nombre}`, async (req, res) => {
    try {
      const nuevoRegistro = new models[nombre](req.body);
      await nuevoRegistro.save();
      res.status(201).json({
        mensaje: `✅ Datos guardados con éxito en la colección ${nombre}`,
        data: nuevoRegistro
      });
    } catch (error) {
      res.status(500).json({ error: `Error al guardar en ${nombre}` });
    }
  });

  app.get(`/api/${nombre}`, async (req, res) => {
    try {
      const lista = await models[nombre].find().sort({ createdAt: -1 });
      res.json(lista);
    } catch (error) {
      res.status(500).json({ error: `Error al obtener datos de ${nombre}` });
    }
  });

  app.delete(`/api/${nombre}/:id`, async (req, res) => {
    try {
      await models[nombre].findByIdAndDelete(req.params.id);
      res.json({ mensaje: "✅ Registro eliminado" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar" });
    }
  });
});

app.listen(PORT, () =>
  console.log(`🚀 Servidor MongoDB listo en: http://localhost:${PORT}`)
);