import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "./styles/Sidebar.css";
import "./styles/Login.css";
import "./styles/Header.css";

/* INICIO */ 
import Inicio from "./pages/Inicio"; 

/* Administrador */ 
import Administrador from "./pages/Administrador/Administrador"; 

/* Producto */ 
import Producto from "./pages/Producto/Producto";
import ProveedorProducto from "./pages/Producto/Proveedor"; 

/* Clientes */
import Cliente from "./pages/Cliente/Cliente"; 

/* JefeAlmacen */
import JefeAlmacen from "./pages/JefeAlmacen/JefeAlmacen"; 
import Inventario from "./pages/JefeAlmacen/Inventario";

/* Taller (Nuevas importaciones usando tus nombres reales de archivo) */
import TallerArqui from "./pages/Taller/arqui.jsx"; 
import TallerCarpinteria from "./pages/Taller/carpinteria.jsx";

/* Diseñador */
import Arquitecto from "./pages/Diseñador/Aquirtecto.jsx"; 
import Carpintero from "./pages/Diseñador/Carpintero.jsx";  

/* Login */
import Login from "./pages/Login";

/* Cajero */
import Cajero from "./pages/Cajero/Cajero";
import AdministrarCaja from "./pages/Cajero/AdministrarCaja"; 
import HistorialCaja from "./pages/Cajero/HistorialCaja";
import MovimientoCaja from "./pages/Cajero/MovimientoCaja";


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
                <Header />
                <Routes>
                  {/* INICIO */}
                  <Route path="inicio" element={<Inicio />} />
                  
                  {/* CLIENTES */}
                  <Route path="clientes" element={<Cliente />} />
                  
                  {/* ADMINISTRADOR */}
                  <Route path="administrador" element={<Administrador />} />
                  
                  {/* PRODUCTO */}
                  <Route path="producto/gestionar" element={<Producto />} />
                  <Route path="producto/proveedor" element={<ProveedorProducto />} /> 
                
                  {/* DISEÑADOR */}
                  <Route path="disenador/arquitecto" element={<Arquitecto />} /> 
                  <Route path="disenador/carpintero" element={<Carpintero />} />

                  {/* CAJERO */}
                  <Route path="cajero" element={<Cajero />} />
                  <Route path="caja/administrar" element={<AdministrarCaja />} /> 
                  <Route path="caja/historial" element={<HistorialCaja />} />
                  <Route path="caja/movimiento" element={<MovimientoCaja />} />

                  {/* JEFE ALMACEN & INVENTARIO */}
                  <Route path="jefeAlmacen" element={<JefeAlmacen />} />
                  <Route path="inventario" element={<Inventario />} /> 
                  
                  {/* CORREGIDO: Sub-rutas específicas para el taller desplegable */}
                  <Route path="taller/arquitecto" element={<TallerArqui />} /> 
                  <Route path="taller/carpinteria" element={<TallerCarpinteria />} /> 
                  
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