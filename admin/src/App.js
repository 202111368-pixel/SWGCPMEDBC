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
import Catalogo from "./pages/Producto/Catalogo"; 
import Insumos from "./pages/Producto/Insumos";
import Precios from "./pages/Producto/Precios";


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
import AdministrarCaja from "./pages/Cajero/AdministrarCaja"; 
import HistorialCaja from "./pages/Cajero/HistorialCaja";

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
                  {/* CLIENTES */}
                  <Route path="clientes" element={<Cliente />} />
                  {/*ADMINISTRADOR */}
                  <Route path="administrador" element={<Administrador />} />
                  {/* PRODUCTO */}
                  <Route path="producto/gestionar" element={<Producto />} />
                  <Route path="producto/catalogo" element={<Catalogo />} />
                  <Route path="producto/insumos" element={<Insumos />} />
                  <Route path="producto/precios" element={<Precios />} />

                  {/* REPORTES */}
                  <Route path="reportes" element={<Reportes />} />
                  {/* CAJERO */}
                  <Route path="cajero" element={<Cajero />} />
                  <Route path="caja/administrar" element={<AdministrarCaja />} /> 
                  <Route path="caja/historial" element={<HistorialCaja />} />

                  {/* JEFEALMACEN */}
                  <Route path="jefeAlmacen" element={<JefeAlmacen />} />



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