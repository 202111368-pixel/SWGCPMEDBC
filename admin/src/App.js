import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./styles/Sidebar.css";
import "./styles/Login.css";

/* INICIO */ 
import Inicio from "./pages/Inicio"; 

/* Pagos */ 
import Pagos from "./pages/Pagos/Pagos"; 

/* Producto */ 
import Producto from "./pages/Producto/Producto";

/* Clientes  */
import Cliente from "./pages/Cliente/Cliente"; 

/* Inventario  */
import Inventario from "./pages/Inventario/Inventario"; 

/* Reportes */
import Reportes from "./pages/Reportes/Reportes";

/* Login */
import Login from "./pages/Login";

/* Ventas */
import RegistrarVenta from "./pages/Ventas/RegistrarVenta";

/* Configuración */
import Configuración from "./pages/Configuración/Configuración";

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
                  {/* VENTAS */}
                  <Route path="ventas/registrar" element={<RegistrarVenta />} />

                  {/* Pagos */}
                  <Route path="Pagos" element={<Pagos />} />
                  <Route path="producto" element={<Producto />} />

                  {/* CLIENTES */}
                  <Route path="clientes" element={<Cliente />} />

                  {/* Inventario */}
                  <Route path="inventario" element={<Inventario />} />

                  {/* Reportes  */}
                  <Route path="reportes" element={<Reportes />} />

                  {/* Configuración  */}
                  <Route path="configuración" element={<Configuración />} />
                  
                  {/* Inicio */}
                  <Route path="inicio" element={<Inicio />} />

                  <Route path="*" element={<div>Página no encontrada en Admin</div>} />
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