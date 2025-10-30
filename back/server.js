const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true })); // para x-www-form-urlencoded
app.use(express.json());

app.use("/api/users", userRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
