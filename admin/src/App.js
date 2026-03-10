import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./styles/Sidebar.css";
import "./styles/Login.css";

/* INICIO */ 
import Inicio from "./pages/Inicio"; 

/* Administrador */ 
import Administrador from "./pages/Administrador/Administrador"; 

/* Producto */ 
import Producto from "./pages/Producto/Producto";

/* Clientes */
import Cliente from "./pages/Cliente/Cliente"; 

/* JefeAlmacen */
import JefeAlmacen from "./pages/JefeAlmacen/JefeAlmacen"; 

/* Reportes */
import Reportes from "./pages/Reportes/Reportes";

/* Login */
import Login from "./pages/Login";

/* Cajero */
import Cajero from "./pages/Cajero/Cajero";

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
                  {/* INICIO */}
                  <Route path="inicio" element={<Inicio />} />

                  {/* CAJERO */}
                  <Route path="cajero" element={<Cajero />} />

                  {/*ADMINISTRADOR */}
                  <Route path="administrador" element={<Administrador />} />

                  {/* PRODUCTO */}
                  <Route path="producto" element={<Producto />} />

                  {/* CLIENTES */}
                  <Route path="clientes" element={<Cliente />} />

                  {/* JEFEALMACEN */}
                  <Route path="jefeAlmacen" element={<JefeAlmacen />} />

                  {/* REPORTES */}
                  <Route path="reportes" element={<Reportes />} />

                  {/* CONFIGURACIÓN */}
                  <Route path="configuración" element={<Configuración />} />
                  
                  {/* ERROR 404 */}
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