import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import "./styles/Sidebar.css";
import "./styles/Login.css";
import Login from "./pages/Login";
import GerenteGeneral from "./pages/GerenteGeneral/GerenteGeneral";
import RegistrarVenta from "./pages/Ventas/RegistrarVenta";
import OrdenesCompra from "./pages/Compras/OrdenesCompra";
import Asistencias from "./pages/Personal/Asistencias";
import Empleados from "./pages/Personal/Empleados";
import Configuracion from "./pages/Configuracion/Configuracion";
import Cajero from "./pages/Cajero/Cajero";
import Cliente from "./pages/Cliente/Cliente"; 

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
                  {/* INICIO */}
                  <Route path="inicio" element={<GerenteGeneral />} />
                  <Route path="gerente-general" element={<GerenteGeneral />} />

                  {/* VENTAS */}
                  <Route path="ventas/registrar" element={<RegistrarVenta />} />
                  
                  {/* CLIENTES */}
                  <Route path="cliente" element={<Cliente />} />

                  {/* COMPRAS */}
                  <Route path="compras/ordenes" element={<OrdenesCompra />} />

                  {/* PERSONAL */}
                  <Route path="personal/empleados" element={<Empleados />} />
                  <Route path="personal/asistencias" element={<Asistencias />} />

                  {/* CAJERO */}
                  <Route path="cajero" element={<Cajero />} />

                  {/* CONFIGURACIÓN */}
                  <Route path="configuracion" element={<Configuracion />} />
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