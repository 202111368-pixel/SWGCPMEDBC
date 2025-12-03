// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import "./styles/Sidebar.css";
import "./styles/Login.css";

import Login from "./pages/Login";

// 🏠 Inicio
import Inicio from "./pages/Inicio";

// 🏢 Almacén
import Producto from "./pages/Almacen/Producto";
import Tipos from "./pages/Almacen/Tipos";
import Ubicacion from "./pages/Almacen/Ubicacion";

// 💰 Cotizaciones
import NuevaCotizacion from "./pages/Cotizaciones/NuevaCotizacion";
import HistorialCotizacion from "./pages/Cotizaciones/HistorialCotizacion";

// 🧾 Ventas
import RegistrarVenta from "./pages/Ventas/RegistrarVenta";
import Clientes from "./pages/Ventas/Clientes";

// 🚛 Compras
import Proveedores from "./pages/Compras/Proveedores";
import OrdenesCompra from "./pages/Compras/OrdenesCompra";

// 📦 Inventario
import VerInventario from "./pages/Inventario/VerInventario";
import Movimientos from "./pages/Inventario/Movimientos";

// 🧰 Producción
import PlanificarProduccion from "./pages/Produccion/PlanificarProduccion";
import OrdenesProduccion from "./pages/Produccion/OrdenesProduccion";

// 👷 Personal
import Empleados from "./pages/Personal/Empleados";
import Asistencias from "./pages/Personal/Asistencias";

// ⚙️ Configuración
import Usuarios from "./pages/Configuracion/Usuarios";
import Ajustes from "./pages/Configuracion/Ajustes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin/*"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="content">
                <Routes>
                  {/* 🏠 INICIO */}
                  <Route path="inicio" element={<Inicio />} />

                  {/* 🏢 ALMACÉN */}
                  <Route path="almacen/producto" element={<Producto />} />
                  <Route path="almacen/tipos" element={<Tipos />} />
                  <Route path="almacen/ubicacion" element={<Ubicacion />} />

                  {/* 💰 COTIZACIONES */}
                  <Route
                    path="cotizaciones/nueva"
                    element={<NuevaCotizacion />}
                  />
                  <Route
                    path="cotizaciones/historial"
                    element={<HistorialCotizacion />}
                  />

                  {/* 🧾 VENTAS */}
                  <Route path="ventas/registrar" element={<RegistrarVenta />} />
                  <Route path="ventas/clientes" element={<Clientes />} />

                  {/* 🚛 COMPRAS */}
                  <Route
                    path="compras/proveedores"
                    element={<Proveedores />}
                  />
                  <Route path="compras/ordenes" element={<OrdenesCompra />} />

                  {/* 📦 INVENTARIO */}
                  <Route path="inventario/ver" element={<VerInventario />} />
                  <Route
                    path="inventario/movimientos"
                    element={<Movimientos />}
                  />

                  {/* 🧰 PRODUCCIÓN */}
                  <Route
                    path="produccion/planificar"
                    element={<PlanificarProduccion />}
                  />
                  <Route
                    path="produccion/ordenes"
                    element={<OrdenesProduccion />}
                  />

                  {/* 👷 PERSONAL */}
                  <Route
                    path="personal/empleados"
                    element={<Empleados />}
                  />
                  <Route
                    path="personal/asistencias"
                    element={<Asistencias />}
                  />

                  {/* ⚙️ CONFIGURACIÓN */}
                  <Route
                    path="configuracion/usuarios"
                    element={<Usuarios />}
                  />
                  <Route path="configuracion/ajustes" element={<Ajustes />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
