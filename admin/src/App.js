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
import Catalogo from "./pages/Producto/Catalogo"; 

/* Clientes */
import Cliente from "./pages/Cliente/Cliente"; 

/* JefeAlmacen */
import JefeAlmacen from "./pages/JefeAlmacen/JefeAlmacen"; 
import Inventario from "./pages/JefeAlmacen/Inventario";

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

// Componente envolvente para rutas protegidas
const AdminLayout = ({ children }) => (
  <div className="app-container">
    <Sidebar />
    <div className="content">
      <Header />
      {children}
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* ADMIN - Inicio */}
        <Route path="/admin/inicio" element={<AdminLayout><Inicio /></AdminLayout>} />
        
        {/* ADMIN - Clientes */}
        <Route path="/admin/clientes" element={<AdminLayout><Cliente /></AdminLayout>} />
        
        {/* ADMIN - Administrador */}
        <Route path="/admin/administrador" element={<AdminLayout><Administrador /></AdminLayout>} />
        
        {/* ADMIN - Productos */}
        <Route path="/admin/producto/gestionar" element={<AdminLayout><Producto /></AdminLayout>} />
        <Route path="/admin/producto/catalogo" element={<AdminLayout><Catalogo /></AdminLayout>} />
        
        {/* ADMIN - Reportes */}
        <Route path="/admin/reportes" element={<AdminLayout><Reportes /></AdminLayout>} />
        
        {/* ADMIN - Cajero */}
        <Route path="/admin/cajero" element={<AdminLayout><Cajero /></AdminLayout>} />
        <Route path="/admin/caja/administrar" element={<AdminLayout><AdministrarCaja /></AdminLayout>} />
        <Route path="/admin/caja/historial" element={<AdminLayout><HistorialCaja /></AdminLayout>} />
        
        {/* ADMIN - JefeAlmacen */}
        <Route path="/admin/jefeAlmacen" element={<AdminLayout><JefeAlmacen /></AdminLayout>} />
        <Route path="/admin/inventario" element={<AdminLayout><Inventario /></AdminLayout>} />
        
        {/* ADMIN - Configuración */}
        <Route path="/admin/configuración" element={<AdminLayout><Configuración /></AdminLayout>} />
        
        {/* Error 404 */}
        <Route path="*" element={<div style={{ padding: '20px' }}>Página no encontrada</div>} />
      </Routes>
    </Router>
  );
};

export default App;